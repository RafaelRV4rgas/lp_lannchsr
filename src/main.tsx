import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RegistrationPage } from './components/inscricao/RegistrationPage'

const registrationRoute = window.location.pathname === '/inscricao'
const accessToken = registrationRoute
  ? new URLSearchParams(window.location.hash.slice(1)).get('token')
  : null
if (registrationRoute)
  window.history.replaceState(null, '', window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {registrationRoute ? (
      <RegistrationPage accessToken={accessToken} />
    ) : (
      <App />
    )}
  </StrictMode>,
)
