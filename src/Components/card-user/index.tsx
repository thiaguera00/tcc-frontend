import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

interface UserCardProps {
  user: User;
  onEditClick: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEditClick }) => {
  const defaultPhoto = 'https://via.placeholder.com/80'; // URL da imagem padrão

  return (
    <Box
      sx={{
        position: 'relative',
        width: '250px',
        height: '300px',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: '#262B40',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Botão de Editar no canto superior direito */}
      <IconButton
        onClick={() => onEditClick(user.id)}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          color: '#ffffff',
        }}
      >
        <EditIcon />
      </IconButton>

      {/* Imagem do usuário centralizada, com fallback para a imagem padrão */}
      <Box
        component="img"
        src={user.photo || defaultPhoto}
        alt={`${user.name} photo`}
        sx={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          marginBottom: '16px',
        }}
      />

      {/* Nome e Email */}
      <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
        {user.name}
      </Typography>
      <Typography variant="body2" align="center" sx={{ marginBottom: '16px' }}>
        {user.email}
      </Typography>

      {/* Botão de Inativar Usuário */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 'auto', backgroundColor: '#8B2E8D' }}
      >
        INATIVAR USUÁRIO
      </Button>
    </Box>
  );
};

export default UserCard;
