
// components/Formulario.tsx
import React from 'react';
import { Box, Button, TextField } from '@mui/material';


const Formulario: React.FC = () => {
  return (
    <Box>
      <TextField className='text'
        label="Seu e-mail"
        variant="outlined"
        fullWidth
        sx={{ borderRadius: '8px',marginBottom: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)',  input: { color: 'white' } }}
      />
      <TextField className='text'
        label="Sua senha"
        type="password"
        variant="outlined"
        fullWidth
        sx={{  borderRadius: '8px', marginBottom: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', input: { color: 'white' } }}
      />
      <Button id='btnLogin'
        variant="contained"
        fullWidth
        sx={{ backgroundColor: '#9C27B0', '&:hover': { backgroundColor: '#7B1FA2' } }}
      >
        Inscreva-se gratuitamente
      </Button>

      
    </Box>
  );
};

export default Formulario;