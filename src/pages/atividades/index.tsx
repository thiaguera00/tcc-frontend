import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarConteudoDaFase } from '../../services/phaseService';
import { atualizarUsuario, usuarioLogado } from '../../services/userService'; 
import { atualizarFaseProgresso, buscarProgresso } from '../../services/progressPhaseService';
import { AxiosError } from 'axios';
import ErroModal from '../../Components/componenteErro';
import FaseProgresso from '../../Components/faseProgresso';
import cerebro from "../../assets/cerebro.svg";
import variavel from "../../assets/variavel.svg";
import decisao from "../../assets/decisao.svg";
import estrutura from "../../assets/estrutura.svg";
import projetofinal from "../../assets/projetofinal.svg";

export const AtividadesPage = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  const [etapa, setEtapa] = useState<number>(0); 
  const [conteudo, setConteudo] = useState<string>('');
  const [numErros, setNumErros] = useState<number>(0);
  const [numAcertos, setNumAcertos] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [faseConcluida, setFaseConcluida] = useState<boolean>(false);
  const navigate = useNavigate();

  const totalEtapas = 3; 

  // Conquistas associadas às fases
  const conquistas = [
    { icon: <img src={cerebro} alt="Cérebro" style={{ width: '60px', height: '70px' }} />, texto: 'VOCÊ JÁ PENSA COMO UM PROGRAMADOR!' },
    { icon: <img src={variavel} alt="Variável" style={{ width: '60px', height: '70px' }} />, texto: 'VARIÁVEIS E TIPOS DE DADOS? FÁCIL PARA VOCÊ!' },
    { icon: <img src={decisao} alt="Decisão" style={{ width: '60px', height: '70px' }} />, texto: 'DECISÕES INTELIGENTES NO CÓDIGO, ÓTIMO TRABALHO!' },
    { icon: <img src={estrutura} alt="Estrutura" style={{ width: '60px', height: '70px' }} />, texto: 'ESTRUTURAS LÓGICAS? FEITAS COM SUCESSO!' },
    { icon: <img src={projetofinal} alt="Projeto Final" style={{ width: '60px', height: '70px' }} />, texto: 'VOCÊ CHEGOU AO GRANDE DESAFIO FINAL!' },
  ];

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
            setModalOpen(true);
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

    if (etapa + 1 >= totalEtapas) {
      const pontosGanhos = 50;
      atualizarPontuacaoUsuario(pontosGanhos);
      atualizarProgressoFase('concluida');
      setFaseConcluida(true);
    } else {
      setEtapa((prev) => prev + 1);
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

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/playground');
  };

  return (
    <>
      <NavBarPerfil />
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
        <CardFase id={id} title={title} description={description} corFundo="#9ade5b" caminho="#" />
      </Box>

      {/* Barra de progresso acima do questionário */}
      <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <LinearProgress
          variant="determinate"
          value={(etapa / totalEtapas) * 100}
          sx={{
            height: '10px',
            borderRadius: '5px',
            backgroundColor: '#555',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#4caf50',
            }
          }}
        />
      </Box>

      <Box sx={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', marginTop: '20px' }}>
        {conteudo && (
          <>
            {title === 'Fase Lógica de programação' ? (
              <QuestionarioComponent
                onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                conteudo={conteudo}
                setLoading={setLoading} 
              />
            ) : (
              <>
                {etapa === 0 && (
                  <QuestionarioComponent
                    onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)}
                    conteudo={conteudo}
                    setLoading={setLoading}
                  />
                )}
                {etapa === 1 && <IDEComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
                {etapa === 2 && (
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

      {faseConcluida && (
        <FaseProgresso
          fase={{ fase: etapa, acertos: numAcertos, erros: numErros, pontos: 50, mensagem: "Você completou a fase com sucesso!" }}
          conquista={conquistas[etapa - 1]} 
          onNextFase={() => navigate('/playground')}
        />
      )}

      <ErroModal
        titulo="Acesso Negado"
        open={modalOpen}
        onClose={handleCloseModal}
        descricao="Você não tem permissão para acessar esta fase. Complete a fase anterior primeiro."
      />
    </>
  );
};
