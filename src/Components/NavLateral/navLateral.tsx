import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import perfilIcon from '../../assets/home.png';
import praticarIcon from '../../assets/Praticar.png';
import conquistasIcon from '../../assets/conquista.png';
import comunidadeIcon from '../../assets/comuni.png';
import './NavLateral.css'; // Importando o arquivo CSS

export default function NavLateral() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container"> {/* Aplicando a classe CSS */}
      <List>
        {/* Item "Perfil" */}
        <ListItem onClick={() => navigate('/perfil')} style={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <Avatar src={perfilIcon} alt="Perfil" />
          </ListItemIcon>
          <ListItemText primary="PERFIL" />
        </ListItem>

        {/* Item "Praticar" */}
        <ListItem onClick={() => navigate('/praticar')} style={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <Avatar src={praticarIcon} alt="Praticar" />
          </ListItemIcon>
          <ListItemText primary="PRATICAR" />
        </ListItem>

        {/* Item "Conquistas" */}
        <ListItem onClick={() => navigate('/conquistas')} style={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <Avatar src={conquistasIcon} alt="Conquistas" />
          </ListItemIcon>
          <ListItemText primary="CONQUISTAS" />
        </ListItem>

        {/* Item "Comunidade" */}
        <ListItem onClick={() => navigate('/comunidade')} style={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <Avatar src={comunidadeIcon} alt="Comunidade" />
          </ListItemIcon>
          <ListItemText primary="COMUNIDADE" />
        </ListItem>
      </List>
    </div>
  );
}
