import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import pointIcon from '../../assets/points.png'; // Importa seu ícone personalizado

// Componente para o badge dinâmico
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function NavBarPerfil() {
  const navigate = useNavigate();
  
  // Estado para controlar o valor dinâmico do badge
  //const [pointsCount, setPointsCount] = React.useState(10); // Exemplo: começando com 10 pontos

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          {/* Título no lado esquerdo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NIX
          </Typography>

          {/* Ícones à direita */}
          <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
            {/* Ícone com número dinâmico */}
            <IconButton aria-label="points">
              <StyledBadge  color="secondary">
                {/* Substituí o ícone por uma imagem */}
                <img src={pointIcon} alt="Points" style={{ width: 24, height: 24 }} />
              </StyledBadge>
            </IconButton>

            {/* Avatar de Perfil */}
            <Avatar
              alt="Perfil"
              src="/static/images/avatar/1.jpg"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/perfil')} // Redireciona para a página de perfil ao clicar
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
