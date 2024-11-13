import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/nav-lateral';
import Conquistas from '../../Components/card-conquista';
import '../conquistas/conquistas.css';
import { Typography } from '@mui/material';

export const TelaConquista = () => {
  return (
    <div className="tela-conquista-container">
      <NixNavBarPerfil />
      
      <NavLateral />
      
      <Typography 
        sx={{
          marginTop: '80px',  
          fontSize: '32px',   
          fontWeight: 'bold', 
          color: 'white',               
          textTransform: 'uppercase',
          marginLeft:'-180px',
          textAlign: 'center',
          width: '100%' 
        }}
      >
        Conquistas
      </Typography>

      <Conquistas />
    </div>
  );
};
