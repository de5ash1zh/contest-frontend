import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const ContestsContext = createContext();

const initialState = {
  contests: [],
  loading: false,
  error: null,
  filter: 'all'
};

function contestsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, contests: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function ContestsProvider({ children }) {
  const [state, dispatch] = useReducer(contestsReducer, initialState);

  const fetchContests = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/contests`);
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const setFilter = (platform) => {
    dispatch({ type: 'SET_FILTER', payload: platform });
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <ContestsContext.Provider value={{ ...state, setFilter, fetchContests }}>
      {children}
    </ContestsContext.Provider>
  );
}

export function useContests() {
  const context = useContext(ContestsContext);
  if (!context) {
    throw new Error('useContests must be used within a ContestsProvider');
  }
  return context;
}
