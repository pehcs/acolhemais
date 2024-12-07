import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegisterONG from './pages/RegisterONG'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RegisterONG />
  </StrictMode>,
)
