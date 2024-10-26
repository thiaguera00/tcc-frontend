import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/NavLateral';
import Conquistas from '../../Components/cardConquistas/cardConquistas';
import '../conquistas/conquistas.css';

export const TelaConquista = () => {
  return (
    <div className="tela-conquista-container">
      <NixNavBarPerfil />
      {/* Navegação lateral à esquerda */}
      <NavLateral />
      <Conquistas />
    </div>
  );
};
