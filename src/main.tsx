import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SettingsProvider } from '@/context/SettingsContext'
import { CompareProvider } from '@/context/CompareContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
