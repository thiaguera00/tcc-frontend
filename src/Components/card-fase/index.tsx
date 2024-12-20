import React from 'react';
import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CardFaseProps {
  id?: string;
  title: string;
  description: string;
  corFundo?: string;
  caminho?: string;
}

export const CardFase: React.FC<CardFaseProps> = ({ id, title, description, corFundo = '#ccc', caminho = '/atividades' }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(caminho, { state: { id, title, description } });
  };

  return (
    <Card
      onClick={handleNavigate}
      sx={{
        backgroundColor: corFundo,
        color: '#000',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        width: '100%',
        maxWidth: '500px',
        cursor: 'pointer',
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1" marginTop="8px">
        {description}
      </Typography>
    </Card>
  );
};
