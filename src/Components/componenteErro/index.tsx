import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import iconaviso from '../../assets/aviso.png';

interface ErroModalProps {
  titulo: string;
  open: boolean; 
  onClose: () => void; 
  iconPath?: string; 
  descricao?: string;
}

const ErroModal: React.FC<ErroModalProps> = ({ titulo, open, onClose, iconPath, descricao }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate('/playground');
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={iconPath || iconaviso} 
          alt="Aviso" 
          style={{ marginRight: 10, width: 24, height: 24 }} 
        />
        <Typography variant="h6">{titulo}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          {descricao}
        </Typography>
      </DialogContent>
      <DialogActions>
        <IconButton style={{ fontSize: '15px', fontFamily: 'arial' }} onClick={handleConfirm} color="primary">
          Confirmar
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ErroModal;
