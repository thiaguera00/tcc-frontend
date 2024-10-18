import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NIX
          </Typography>

          <Button 
            className='customButton2' 
            color="inherit" 
            onClick={() => navigate('/login')}
          >
            Entrar
          </Button>

          <Button 
            className='customButton' 
            color="inherit" 
            onClick={() => navigate('/cadastro')}
          >
            cadastra-se
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
