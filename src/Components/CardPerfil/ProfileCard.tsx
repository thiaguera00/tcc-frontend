import { Box, Typography, Avatar, Button, Card, CardContent } from '@mui/material';
import pointIcon from '../../assets/points.png';
import editarIcon from '../../assets/lapis.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../../utils/interfaces';
import { usuarioLogado } from '../../services/userService';

const ProfileCard = () => {
  
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
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Garanta que o box ocupe toda a largura
        padding: 2,    // Adicione padding
      }}
    >
       
      <Card 
        sx={{ 
          width: 400, 
          padding: 3, 
          borderRadius: '16px', 
          backgroundColor: '#3F4273',
          position: 'relative', // Ajuste o posicionamento relativo para o botão "Editar"
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        <img src={editarIcon} alt="Points" style={{ width: 24, height: 20, marginLeft: 375 }} /> 
        <Button 
          sx={{
            position: 'absolute',
            top: 40,
            right: 10,
            color: '#FFFFFF',
          }}
          onClick={()=> navigate('/perfileditar')} 
        >
         
          <Typography variant="caption"   sx={{ marginLeft: '4px' }}>Editar</Typography>
        </Button>

        {/* Avatar e nome */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="Carlos Silva Souza"
            src="/static/images/avatar.png" // Substitua com o caminho do avatar
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>{usuario?.name}</Typography>
        </Box>

        {/* Linha divisória */}
        <Box sx={{ marginTop: 2, marginBottom: 1, borderBottom: '1px solid #343661' }}>
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
            DETALHES:
          </Typography>
        </Box>

        {/* Detalhes do perfil */}
        <CardContent>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>FASE:</Typography>
            <Box sx={{ backgroundColor: '#343661', borderRadius: 2, padding: 1, marginTop: 1 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>FASE 1</Typography>
              <Typography variant="caption" sx={{ color: '#D9C1E3' }}>
                Introdução à Lógica de Programação
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>NÍVEL:</Typography>
            <Box sx={{ backgroundColor: '#343661', borderRadius: 2, padding: 1, marginTop: 1 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>{usuario?.level}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>PONTOS:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#343661', borderRadius: 2, padding: 1, marginTop: 1 }}>
              <Avatar src={pointIcon} sx={{ width: 24, height: 24, marginRight: 1 }} /> {/* Ícone de pontos */}
              <Typography variant="h6" sx={{ color: 'white' }}>{usuario?.points}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileCard;
