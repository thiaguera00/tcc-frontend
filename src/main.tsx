import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Cadastro } from './pages/cadastro';
import { Login } from './pages/login';
import {LoginAdm} from './pages/login-Adm';
import PrivateRoute from './routes/privateRoute';
import { Playground } from './pages/pagina-inicial';
import { Perfil } from './pages/perfil';
import { Pesquisa } from './pages/pesquisa';
import { PerfilEditar } from './pages/perfil-editar';
import { AtividadesPage } from './pages/atividades';
import { TelaConquista } from './pages/conquistas/conquistas';
import {GerenciarUsuario} from './pages/gerenciar-usuario'
import { GerenciarFases } from './pages/gerenciar-fases';
import { Home } from './pages/Home';
import { ResetPassword } from './pages/trocar-senha';
import { DashboardAdmin } from './pages/dashboard-admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login-admin" element={<LoginAdm />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar-perfil" element={<PerfilEditar />} />
        <Route path="/atividades" element={<AtividadesPage />} />
        <Route path="/conquistas" element={<TelaConquista />} />
        <Route path="/gerenciar-usuario" element={<GerenciarUsuario />} />
        <Route path="/gerenciar-fases" element={<GerenciarFases />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route
          path="/playground"
          element={
            <PrivateRoute>
              <Playground />
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
