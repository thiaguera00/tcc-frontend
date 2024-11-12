import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cadastro } from './pages/cadastro';
import { Login } from './pages/login';
import PrivateRoute from './routes/privateRoute';
import { PaginaInicial } from './pages/pagina-inicial';
import { Perfil } from './pages/perfil';
import { Pesquisa } from './pages/pesquisa';
import { PerfilEditar } from './pages/PerfilEditar/editarPerfil';
import { AtividadesPage } from './pages/atividades';
import { TelaConquista } from './pages/conquistas/conquistas';
import {GerenciarUsuario} from './pages/gerenciarUsuario/gerenciarUser'
import { GerenciarFases } from './pages/gerenciarFases';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfilEditar" element={<PerfilEditar />} />
        <Route path="/atividades" element={<AtividadesPage />} />
        <Route path="/conquista" element={<TelaConquista />} />
        <Route path="/gerenciarUsuario" element={<GerenciarUsuario />} />
        <Route path="/gerenciarFases" element={<GerenciarFases />} />
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
