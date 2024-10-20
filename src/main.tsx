import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cadastro } from './pages/cadastro';
import { Login } from './pages/login';
import PrivateRoute from './routes/privateRoute';
import { PaginaInicial } from './pages/pagina-inicial';
import { Perfil } from './pages/perfil/PerfilInicio';
import { Pesquisa } from './pages/pesquisa';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route
          path="/paginaInicial"
          element={
            <PrivateRoute>
              <PaginaInicial />
            </PrivateRoute>
          }
        />
        <Route
          path="/pesquisa"
          element={
            <PrivateRoute>
              <Pesquisa />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
