import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface TermosDeUsoProps {
  open: boolean;
  onClose: (accepted: boolean) => void;  
}

const TermosDeUso: React.FC<TermosDeUsoProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={() => {}} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#252746',
          overflowY: 'auto',
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'white' }}>
          Termos de Uso
        </Typography>

        <Typography sx={{ mt: 2, fontSize: '14px', color: '#9fa0b9' }}>
          Leia atentamente antes de continuar.
        </Typography>

        {/* Seções dos Termos de Uso */}
        <Typography sx={{ mt: 2, fontSize: '12px', color: 'white' }}>
          <strong>1. Aceitação dos Termos</strong>
          <br />
          Ao acessar ou usar este serviço, você concorda em cumprir e estar vinculado aos presentes Termos de Uso. Caso não concorde com algum dos termos, não utilize o nosso serviço.
        </Typography>

        <Typography sx={{ mt: 2, fontSize: '12px', color: 'white' }}>
          <strong>2. Descrição do Serviço</strong>
          <br />
          Esta plataforma visa ensinar lógica de programação com o uso de Inteligência Artificial. A plataforma foi criada para ajudar no aprendizado e desenvolvimento de habilidades em programação.
        </Typography>

        <Typography sx={{ mt: 2, fontSize: '12px', color: 'white' }}>
          <strong>3. Coleta de Dados</strong>
          <br />
          Coletamos informações mínimas necessárias para o seu cadastro, como nome, e-mail e senha, para proporcionar a melhor experiência de aprendizagem personalizada.
        </Typography>

        <Typography sx={{ mt: 2, fontSize: '12px', color: 'white' }}>
          <strong>4. Responsabilidades do Usuário</strong>
          <br />
          O usuário se compromete a fornecer informações verdadeiras, manter a confidencialidade de suas credenciais de acesso e utilizar o serviço de forma ética.
        </Typography>

        <Typography sx={{ mt: 2, fontSize: '12px', color: 'white' }}>
          <strong>5. Modificação dos Termos</strong>
          <br />
          Reservamo-nos o direito de alterar ou modificar estes Termos de Uso a qualquer momento. O uso continuado após as alterações significará a aceitação dos novos termos.
        </Typography>

        <Button 
          sx={{ mt: 3, backgroundColor: '#A66FD9', color: 'white' }} 
          onClick={() => onClose(true)} // Passa `true` quando os termos são aceitos
        >
          Aceito
        </Button>
      </Box>
    </Modal>
  );
};

export default TermosDeUso;
