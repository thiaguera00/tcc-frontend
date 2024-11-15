import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarConteudoDaFase } from '../../services/phaseService';
import { atualizarUsuario, usuarioLogado } from '../../services/userService'; 

export const AtividadesPage = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  const [etapa, setEtapa] = useState<number>(1);
  const [conteudo, setConteudo] = useState<string>('');
  const [numErros, setNumErros] = useState<number>(0);
  const [numAcertos, setNumAcertos] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
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
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserId();
  }, []);

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
                {/* Primeira fase: somente questionário em todas as etapas */}
                <QuestionarioComponent
                  onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                  conteudo={conteudo}
                  setLoading={setLoading} // Adicionando estado de loading
                />
              </>
            ) : (
              <>
                {etapa === 1 && (
                  <QuestionarioComponent
                    onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                    conteudo={conteudo}
                    setLoading={setLoading} // Adicionando estado de loading
                  />
                )}
                {etapa === 2 && <IDEComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
                {etapa === 3 && (
                  <QuestionarioComponent
                    onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                    conteudo={conteudo}
                    setLoading={setLoading} // Adicionando estado de loading
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
