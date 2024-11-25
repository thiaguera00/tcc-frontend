import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SuccessSnackbarProps {
  open: boolean; 
  message: string; 
  onClose: () => void; 
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%', marginBottom:'140px'}}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
