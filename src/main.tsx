import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Cadastro } from './pages/cadastro';
import { Login } from './pages/login';
import PrivateRoute from './routes/privateRoute';
import { PaginaInicial } from './pages/pagina-inicial';
import { Perfil } from './pages/perfil';
import { Pesquisa } from './pages/pesquisa';
import { PerfilEditar } from './pages/perfil-editar';
import { AtividadesPage } from './pages/atividades';
import { TelaConquista } from './pages/conquistas/conquistas';
import {GerenciarUsuario} from './pages/gerenciar-usuario'
import { GerenciarFases } from './pages/gerenciar-fases';
import { Home } from './pages/Home';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar-perfil" element={<PerfilEditar />} />
        <Route path="/atividades" element={<AtividadesPage />} />
        <Route path="/conquistas" element={<TelaConquista />} />
        <Route path="/gerenciar-usuario" element={<GerenciarUsuario />} />
        <Route path="/gerenciar-fases" element={<GerenciarFases />} />
        <Route
          path="/playground"
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
