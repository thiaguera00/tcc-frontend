import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/NavLateral/navLateral';
import ProfileCardEditar from '../../Components/PerfilEditar/editarPerfil';

export const PerfilEditar = () => {
  return (
    <div><NixNavBarPerfil />
    
    <div style={{ display: 'flex', height: '100vh' }}>
        
        {/* Navegação lateral à esquerda */}
        <NavLateral />

        {/* Conteúdo principal (ProfileCard) */}
        <ProfileCardEditar />
       
      </div>
    
    
    </div>

    
  );
}; 