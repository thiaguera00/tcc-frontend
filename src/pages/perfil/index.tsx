import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/nav-lateral';
import ProfileCard from '../../Components/card-perfil';

export const Perfil = () => {
  return (
    <div style={{backgroundColor:'#252746'}}>
      <NixNavBarPerfil />

      <div style={{ display: 'flex', height: '100vh' }}>
        
        <NavLateral />

        <ProfileCard />
      </div>
    </div>
  );
};
