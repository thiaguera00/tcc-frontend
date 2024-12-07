import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetarSenha } from '../../services/userService';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      if (!token) {
        setError('Token inválido.');
        return;
      }
      const response = await resetarSenha({ token, newPassword });

      setMessage(response.message || 'Senha redefinida com sucesso.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh', 
        padding: 2,
      }}
      className="reset-password"
    >
      <div>
        <img src="/assets/nixPurple.svg" alt="cabeça nix" style={{margin:'30px'}} />
      </div>

      <Box
        sx={{
          backgroundColor: '#4A3F7D',  
          padding: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: '400px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: 'white', marginBottom: 3, textAlign: 'center' }}>
          Redefinir Senha
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Nova Senha"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={{ marginBottom: 2 ,color: '#FFF' ,backgroundColor:'#343661'}}
          />

          <TextField
            label="Confirmar Nova Senha"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ marginBottom: 2,backgroundColor:'#343661',color: '#FFF' }}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary" 
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#FFF' }} /> : 'Redefinir Senha'}
          </Button>

          {message && <Typography color="success.main" sx={{ marginBottom: 2, textAlign: 'center' }} style={{backgroundColor: '#2ecc71', color: 'white', marginTop: '16px', 
            padding: '10px',borderRadius: '5px'}}>{message}</Typography>}
          {error && <Typography color="error.main" sx={{ marginBottom: 2, textAlign: 'center' }} style={{ backgroundColor: '#e74c3c', color: 'white', marginTop: '16px', 
            padding: '10px',borderRadius: '5px'}}>{error}</Typography>}
        </form>
      </Box>
    </Box>
  );
};
