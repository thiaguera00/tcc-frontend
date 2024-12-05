import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useNavigate,useLocation } from 'react-router-dom';
import user from '../../assets/addUser.png';
import curso from '../../assets/curso.png'
import './style.css';

export default function NavAdm() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path:string) => location.pathname === path;

  return (
    <div className="sidebar-container">
      <List>
        <ListItem
          onClick={() => navigate('/gerenciar-usuario')}
          className={`list-item ${isSelected('/gerenciar-usuario') ? 'selected' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <IconButton>
              <img
                src={user}
                alt="Gerenciar Usuário"
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Gerenciar usuário" />
        </ListItem>

        <ListItem
          onClick={() => navigate('/Gerenciar-fases')}
          className={`list-item ${isSelected('/Gerenciar-fases') ? 'selected' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <IconButton>
              <img
                src={curso}
                alt="Gerenciar Usuário"
                style={{
                  width: '35px',
                  height: '35px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Gerenciar-fases" />
        </ListItem>

      </List>
    </div>
  );
}
