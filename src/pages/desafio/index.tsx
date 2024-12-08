import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/nav-lateral';

export const DesafioPage: React.FC = () => {
  const location = useLocation();
  const { id, title } = location.state || {};
  const [desafio, setDesafio] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
     const fetchDesafio = async () => {
        try {
          const response = await axios.post('https://ia-assistente-python.onrender.com/desafio/',);
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar o desafio:', error);
          throw error;
        }
      };

    const carregarDesafio = async () => {
      try {
        const data = await fetchDesafio();
        setDesafio(data.desafio);
      } catch (error) {
        console.error('Erro ao carregar o desafio:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarDesafio();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!desafio) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Não foi possível carregar o desafio. Tente novamente mais tarde.
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <div className="main">
    <NavBarPerfil />
    <NavLateral />
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" marginTop="16px">
        {desafio.descricao}
      </Typography>
      <Typography variant="h6" fontWeight="bold" marginTop="24px">
        Requisitos:
      </Typography>
      <ul>
        {desafio.requisitos.map((requisito: string, index: number) => (
          <li key={index}>
            <Typography variant="body1">{requisito}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="h6" fontWeight="bold" marginTop="24px">
        Explicação:
      </Typography>
      <Typography variant="body1" marginTop="16px">
        {desafio.explicacao}
      </Typography>
    </Box>
    </div>
    </>
  );
};
