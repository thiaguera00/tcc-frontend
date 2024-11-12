import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import perfilIcon from '../../assets/perfil.svg';
import praticarIcon from '../../assets/praticar.svg';
import conquistasIcon from '../../assets/conquista.svg';
import comunidadeIcon from '../../assets/comunidade.svg';
import './index.css';

export default function NavLateral() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <List>
        <ListItem
          onClick={() => navigate('/perfil')}
          className="list-item"
          style={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Avatar src={perfilIcon} alt="Perfil" />
          </ListItemIcon>
          <ListItemText primary="PERFIL" />
        </ListItem>

        <ListItem
          onClick={() => navigate('/playground')}
          className="list-item"
          style={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Avatar src={praticarIcon} alt="Praticar" />
          </ListItemIcon>
          <ListItemText primary="PRATICAR" />
        </ListItem>

        <ListItem
          onClick={() => navigate('/conquistas')}
          className="list-item"
          style={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Avatar src={conquistasIcon} alt="Conquistas" />
          </ListItemIcon>
          <ListItemText primary="CONQUISTAS" />
        </ListItem>

        <ListItem
          onClick={() => navigate('/comunidade')}
          className="list-item"
          style={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Avatar src={comunidadeIcon} alt="Comunidade" />
          </ListItemIcon>
          <ListItemText primary="COMUNIDADE" />
        </ListItem>
      </List>
    </div>
  );
}
