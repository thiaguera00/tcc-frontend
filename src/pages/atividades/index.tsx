import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarConteudoDaFase } from '../../services/phaseService';

export const AtividadesPage = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  const [etapa, setEtapa] = useState<number>(1);
  const [conteudo, setConteudo] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        if (id) {
          const conteudoData = await buscarConteudoDaFase(id);
          setConteudo(conteudoData.content.description);
        }
      } catch (error) {
        console.error('Erro ao buscar conteúdo da fase:', error);
      }
    };

    fetchConteudo();
  }, [id]);

  const handleNextStep = () => {
    if (etapa < 3) {
      setEtapa((prev) => prev + 1);
    } else {
      alert('Você completou a fase! Parabéns!');
      navigate('/paginaInicial');
    }
  };

  return (
    <>
      <NavBarPerfil />
      {/* Card da Fase */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '80px',
        }}
      >
        <CardFase
          id={id}
          title={title || 'FASE'}
          description={description || 'Descrição da Fase'}
          corFundo="#9ade5b"
          caminho="#"
        />
      </Box>

      {/* Conteúdo da Atividade */}
      <Box
        sx={{
          padding: '40px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        {conteudo && (
          <>
            {title === 'Fase Logica de programação' ? (
              <>
                {/* Primeira fase: somente questionário em todas as etapas */}
                {etapa === 1 && <QuestionarioComponent onFinish={handleNextStep} conteudo={conteudo} />}
                {etapa === 2 && <QuestionarioComponent onFinish={handleNextStep} conteudo={conteudo} />}
                {etapa === 3 && <QuestionarioComponent onFinish={handleNextStep} conteudo={conteudo} />}
              </>
            ) : (
              <>
                {/* Outras fases: Questionário -> IDE -> Questionário */}
                {etapa === 1 && <QuestionarioComponent onFinish={handleNextStep} conteudo={conteudo} />}
                {etapa === 2 && <IDEComponent onFinish={handleNextStep} conteudo={conteudo}/>}
                {etapa === 3 && <QuestionarioComponent onFinish={handleNextStep} conteudo={conteudo} />}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};
