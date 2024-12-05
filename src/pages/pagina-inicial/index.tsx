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
  order: number; 
}

export const Playground = () => {
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
        const fasesOrdenadas = ordenarFases(fasesData); 
        setFases(fasesOrdenadas);
      } catch (err) {
        console.error("Erro ao buscar fases:", err);
        setError('Erro ao buscar fases');
      }
    };

    fetchFases();
  }, []);

  const ordenarFases = (fases: Fase[]) => {
    const ordemCorreta = [
      "Introdução à Lógica de Programação", 
      "Estrutura Básica da Linguagem", 
      "Estruturas Lógicas", 
      "Funções", 
      "Desafio"
    ];

    return fases.sort((a, b) => {
      return ordemCorreta.indexOf(a.title) - ordemCorreta.indexOf(b.title);
    });
  };

  const getCardColor = (index: number) => {
    const colors = [
      "#9ade5b",
      "#f6b93b", 
      "#4b7bec", 
      "#e84118", 
      "#7f8c8d", 
    ];
    return colors[index % colors.length]; 
  };

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
          position: 'absolute', 
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '100px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Olá, {usuario?.name}
        </Typography>

        <Box sx={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '36px', alignItems: 'center' }}>
          {fases.map((fase, index) => (
            <CardFase
              key={fase.id}
              id={fase.id}
              title={`${fase.title}`}
              description={fase.description}
              corFundo={getCardColor(index)} 
              caminho='/atividades'
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
