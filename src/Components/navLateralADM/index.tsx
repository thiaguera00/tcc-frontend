import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import perfil from '../../assets/perfil.png';
import user from '../../assets/addUser.png';
import curso from '../../assets/curso.png'

export default function NavAdm() {
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
            <IconButton>
              <img
                src={perfil}
                alt="Perfil"
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="PERFIL" />
        </ListItem>

        <ListItem
          onClick={() => navigate('/gerenciar-usuario')}
          className="list-item"
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
          className="list-item"
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
