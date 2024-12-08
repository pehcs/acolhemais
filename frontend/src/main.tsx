import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroONG from './pages/CadastroONG';
import NomeONG from './pages/NomeONG';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastroONG />} />
        <Route path="/NomeONG" element={<NomeONG />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
