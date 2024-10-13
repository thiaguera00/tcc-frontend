import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
 

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nix
          </Typography>
          <Button className='customButton2' color="inherit">Conecte-se</Button>
          <Button  className='customButton' color="inherit">Inscrever-se </Button >
        </Toolbar>
      </AppBar>
    </Box>
  );
}
