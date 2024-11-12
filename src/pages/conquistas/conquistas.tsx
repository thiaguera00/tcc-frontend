import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/nav-lateral';
import Conquistas from '../../Components/card-conquista';
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
