import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ContestsProvider } from './context/ContestsContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { NotesProvider } from './context/NotesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ContestsProvider>
        <NotificationProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </NotificationProvider>
      </ContestsProvider>
    </ThemeProvider>
  </StrictMode>,
)
