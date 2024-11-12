import { useEffect, useState } from 'react';
import { usuarioLogado } from "../../services/userService";
import { buscarFases } from "../../services/phaseService";
import { Usuario } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import NavLateral from '../../Components/nav-lateral';
import { Box, Typography } from '@mui/material';
import { CardFase } from '../../Components/card-fase';

interface Fase {
  id: string;
  title: string;
  description: string;
  content: { description: string };
}

export const PaginaInicial = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fases, setFases] = useState<Fase[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        const usuarioData = await usuarioLogado();

        if (usuarioData.is_first_access === true) {
          navigate('/pesquisa');
        }

        setUsuario(usuarioData);
      } catch (err) {
        console.error("Erro ao buscar dados do estudante:", err);
        setError('Erro ao buscar dados do estudante');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarioLogado();
  }, [navigate]);

  useEffect(() => {
    const fetchFases = async () => {
      try {
        const fasesData = await buscarFases();
        setFases(fasesData);
      } catch (err) {
        console.error("Erro ao buscar fases:", err);
        setError('Erro ao buscar fases');
      }
    };

    fetchFases();
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

        <Box sx={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '36px', alignItems: 'center' }}>
          {fases.map((fase) => (
            <CardFase
              key={fase.id}
              id={fase.id}
              title={`Fase ${fase.title}`}
              description={fase.description}
              corFundo="#9ade5b"
              caminho='/atividades'
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
