import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/nav-lateral';
import ProfileCardEditar from '../../Components/editar-perfil';


export const PerfilEditar = () => {
  return (
    <div><NixNavBarPerfil />
    <div style={{ display: 'flex', height: '100vh', backgroundColor:'#252746' }}>
        
        {/* Navegação lateral à esquerda */}
        <NavLateral />

        {/* Conteúdo principal (ProfileCard) */}
        <ProfileCardEditar />
      </div>
    </div>
  );
}; 