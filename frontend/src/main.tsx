import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroONG from './pages/CadastroONG'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CadastroONG />
  </StrictMode>,
)
