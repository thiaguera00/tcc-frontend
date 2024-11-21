import { useEffect, useState } from 'react';
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
import pointIcon from '../../assets/points.png';
import { usuarioLogado } from '../../services/userService';
import perfilPadrao from '../../assets/usuario-de-perfil.png'; 

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
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await usuarioLogado();
        setPoints(userDetails.points);
        console.log(userDetails.points)
      } catch (error) {
        console.error("Erro ao buscar dados do estudante:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="appBar" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NIX
          </Typography>
          <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
            <IconButton aria-label="points">
              <StyledBadge badgeContent={points} color="secondary">
                <img src={pointIcon} alt="Points" style={{ width: 24, height: 24 }} />
              </StyledBadge>
            </IconButton>
            <Avatar
              alt="Perfil"
              src={perfilPadrao}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/perfil')}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
