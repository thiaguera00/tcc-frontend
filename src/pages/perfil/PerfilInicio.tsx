import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/NavLateral/navLateral';
import ProfileCard from '../../Components/CardPerfil/ProfileCard';

export const Perfil = () => {
  return (
    <div>
      {/* Navbar no topo */}
      <NixNavBarPerfil />

      {/* Layout principal com navegação lateral e conteúdo */}
      <div style={{ display: 'flex', height: '100vh' }}>
        
        {/* Navegação lateral à esquerda */}
        <NavLateral />

        {/* Conteúdo principal (ProfileCard) */}
        <ProfileCard />
      </div>
    </div>
  );
};
