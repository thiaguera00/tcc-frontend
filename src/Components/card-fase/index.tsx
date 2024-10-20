import React from 'react';
import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CardFaseProps {
  fase: string;
  descricao: string;
  corFundo?: string;
  caminho?: string;
}

export const CardFase: React.FC<CardFaseProps> = ({ fase, descricao, corFundo = '#ccc', caminho }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (caminho) {
      navigate(caminho);
    }
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
        '&:hover': {
          backgroundColor: '#b5b5b5',
        },
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {fase}
      </Typography>
      <Typography variant="body1" marginTop={'8px'}>
        {descricao}
      </Typography>
    </Card>
  );
};
