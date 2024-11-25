import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';

interface Fase {
  fase: number;
  acertos: number;
  erros: number;
  pontos: number;
  mensagem: string;
}

interface Conquista {
  icon: React.ReactNode;
  texto: string;
}

interface FaseProgressoProps {
  fase: Fase;           
  conquista: Conquista; 
  onNextFase: () => void; 
}

const FaseProgresso: React.FC<FaseProgressoProps> = ({ fase, conquista, onNextFase }) => {
  return (
    <Modal
      open={true}  
      onClose={onNextFase}  
      aria-labelledby="fase-progresso-modal"
      aria-describedby="fase-progresso-conclusion"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#fff', 
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          color: '#000', 
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Fase {fase.fase} Concluída!
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          PARABÉNS!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Você acertou: {fase.acertos}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Você errou: {fase.erros}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Pontos: {fase.pontos}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>
          {fase.mensagem}
        </Typography>

        {/* Conquista */}
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          {conquista.icon}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {conquista.texto}
          </Typography>
        </Box>

        <Button variant="contained" onClick={onNextFase}>
          Avançar para a próxima fase
        </Button>
      </Box>
    </Modal>
  );
};

export default FaseProgresso;
