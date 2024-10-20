import { useEffect, useState } from 'react';
import { usuarioLogado } from "../../services/userService";
import { Usuario } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/NavLateral';
import { Box, Typography } from '@mui/material';
import { CardFase } from '../../Components/card-fase';

export const PaginaInicial = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        const usuarioData = await usuarioLogado();
        if (usuarioData.is_first_access === true) {
          navigate('/pesquisa');
        }
        setUsuario(usuarioData);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados do estudante:", err);
        setError('Erro ao buscar dados do estudante');
        setLoading(false);
      }
    };

    fetchUsuarioLogado();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <NavBarPerfil />
      <NavLateral />
      
      <Box
        sx={{
          marginLeft: '250px',
          paddingTop: '100px',
          paddingX: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Olá, {usuario?.name}
        </Typography>

        <Box sx={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '36px', alignItems: 'center'}}>
          <CardFase
            fase="FASE 1"
            descricao="Introdução à Lógica de Programação"
            corFundo="#9ade5b"
            caminho="/fase1"
          />
          <CardFase
            fase="FASE 2"
            descricao="Introdução à Linguagem de Programação Python"
            corFundo="#afafaf"
            caminho="/fase2"
          />
          <CardFase
            fase="FASE 3"
            descricao="Estrutura básica da linguagem, declaração de variáveis e tipos de dados"
            corFundo="#afafaf"
            caminho="/fase3"
          />
          <CardFase
            fase="FASE 4"
            descricao="Estruturas lógicas"
            corFundo="#afafaf"
            caminho="/fase4"
          />
          <CardFase
            fase="FASE 5"
            descricao="Funções"
            corFundo="#afafaf"
            caminho="/fase5"
          />
        </Box>
      </Box>
    </>
  );
};
