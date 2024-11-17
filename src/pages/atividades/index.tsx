import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarConteudoDaFase } from '../../services/phaseService';
import { atualizarUsuario, usuarioLogado } from '../../services/userService'; 
import { atualizarFaseProgresso, buscarProgresso } from '../../services/progressPhaseService';
import { AxiosError } from 'axios';

export const AtividadesPage = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  const [etapa, setEtapa] = useState<number>(1);
  const [conteudo, setConteudo] = useState<string>('');
  const [numErros, setNumErros] = useState<number>(0);
  const [numAcertos, setNumAcertos] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const usuarioData = await usuarioLogado();
        setUserId(usuarioData.id);
        if (usuarioData.id && id) {
          const acessoPermitido = await findProgress(usuarioData.id, id);
          if (!acessoPermitido) {
            alert('Você não tem permissão para acessar esta fase. Complete a fase anterior primeiro.');
            navigate('/playground');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  
    fetchUserId();
  }, [id]);
  
  const findProgress = async (userId: string, phaseId: string) => {
    try {
      const progressData = await buscarProgresso(userId, phaseId);
      setProgressId(progressData.id);
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 500) {
        console.error('Usuário não completou a fase anterior:', error);
        return false;
      } else {
        console.error('Erro ao buscar ou criar progresso da fase:', error);
        return false;
      }
    }
  };

  const handleNextStep = (isCorrect: boolean) => {
    if (loading) return; 

    if (isCorrect) {
      setNumAcertos((prev) => prev + 1);
    } else {
      setNumErros((prev) => prev + 1);
    }

    if (numAcertos + (isCorrect ? 1 : 0) >= 3) {
      const pontosGanhos = 50;
      atualizarPontuacaoUsuario(pontosGanhos);
      atualizarProgressoFase('concluida');

      alert('Você completou a fase! Parabéns!');
      navigate('/playground');
    } else {
      if (title !== 'Fase Lógica de programação') {
        if (etapa === 1 && isCorrect) {
          setEtapa(2);
        } else if (etapa === 2) {
          setEtapa(3);
        } else if (etapa === 3 && isCorrect) {
          setEtapa(1);
        } else {
          setEtapa(1);
        }
      } else {
        if (isCorrect) {
          setEtapa((prev) => prev + 1);
        }
      }
    }
  };

  const atualizarProgressoFase = async (status: string) => {
    try {
      const dataAtual = new Date();
      if (progressId) {
        await atualizarFaseProgresso(progressId, {
          status,
          score: numAcertos,
          finished_at: dataAtual,
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso da fase:', error);
    }
  };
  const atualizarPontuacaoUsuario = async (pontos: number) => {
    try {
      if (userId) {
        const usuarioData = await usuarioLogado();
        const pontosAtuais = usuarioData.points || 0;
        const novosPontos = pontosAtuais + pontos;
        await atualizarUsuario(userId, { points: novosPontos });
      } else {
        console.error('Erro: userId não fornecido para atualizar a pontuação');
      }
    } catch (error) {
      console.error('Erro ao atualizar a pontuação do usuário:', error);
    }
  };

  return (
    <>
      <NavBarPerfil />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '80px',
        }}
      >
        <CardFase
          id={id}
          title={title}
          description={description}
          corFundo="#9ade5b"
          caminho="#"
        />
      </Box>

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
            {title === 'Fase Lógica de programação' ? (
              <>
                <QuestionarioComponent
                  onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                  conteudo={conteudo}
                  setLoading={setLoading} 
                />
              </>
            ) : (
              <>
                {etapa === 1 && (
                  <QuestionarioComponent
                    onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                    conteudo={conteudo}
                    setLoading={setLoading}
                  />
                )}
                {etapa === 2 && <IDEComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
                {etapa === 3 && (
                  <QuestionarioComponent
                    onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                    conteudo={conteudo}
                    setLoading={setLoading} 
                  />
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};
