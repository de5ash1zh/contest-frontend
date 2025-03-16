import { ContestsProvider } from './context/ContestsContext';
import ContestList from './components/ContestList';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <ContestsProvider>
      <div className="container">
        <Header />
        <FilterBar />
        <ContestList />
      </div>
    </ContestsProvider>
  );
}

export default App;
