import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';
import { useLocation, useNavigate } from 'react-router-dom';
import { buscarConteudoDaFase } from '../../services/phaseService';
import { atualizarUsuario, usuarioLogado } from '../../services/userService'; // Importa a função para atualizar o usuário e obter usuário logado

export const AtividadesPage = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  const [etapa, setEtapa] = useState<number>(1);
  const [conteudo, setConteudo] = useState<string>('');
  const [numErros, setNumErros] = useState<number>(0); // Estado para rastrear o número de erros
  const [userId, setUserId] = useState<string | null>(null); // Estado para armazenar o userId
  const navigate = useNavigate();

  // Buscar conteúdo da fase ao carregar a página
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

  // Buscar userId do usuário logado ao carregar a página
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const usuarioData = await usuarioLogado();
        setUserId(usuarioData.id); // Armazenar o userId do usuário logado
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleNextStep = (isCorrect: boolean) => {
    // Atualizar o número de erros se a resposta estiver incorreta
    if (!isCorrect) {
      setNumErros((prev) => prev + 1);
    }
  
    // Se todas as etapas estiverem completas, verifique se o usuário passou
    if (etapa === 3) {
      // Calcular se o usuário passou na fase
      if (numErros < 3) {
        // Calcular e atualizar a pontuação do usuário ao final da fase
        const pontosGanhos = 50; // Pontuação maior para quem erra menos de 3 vezes
        atualizarPontuacaoUsuario(pontosGanhos);
  
        alert('Você completou a fase! Parabéns!');
        navigate('/playground');
      } else {
        alert('Você não atingiu a pontuação necessária. Tente novamente!');
        // Aqui você pode redefinir a fase para o início ou fazer qualquer outra lógica de retentativa
        setEtapa(1);
        setNumErros(0);
      }
    } else {
      // Caso contrário, continue para a próxima etapa
      setEtapa((prev) => prev + 1);
    }
  };

  const atualizarPontuacaoUsuario = async (pontos: number) => {
    try {
      if (userId) {
        // Primeiro, obtenha os dados atuais do usuário para pegar os pontos atuais
        const usuarioData = await usuarioLogado();
        const pontosAtuais = usuarioData.points || 0;
  
        // Some os pontos ganhos
        const novosPontos = pontosAtuais + pontos;
  
        // Atualize o usuário com a nova pontuação
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
                {etapa === 1 && <QuestionarioComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
                {etapa === 2 && <QuestionarioComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
                {etapa === 3 && <QuestionarioComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
              </>
            ) : (
              <>
                {/* Outras fases: Questionário -> IDE -> Questionário */}
                {etapa === 1 && <QuestionarioComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
                {etapa === 2 && <IDEComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo}/>}
                {etapa === 3 && <QuestionarioComponent onFinish={(isCorrect: boolean) => handleNextStep(isCorrect)} conteudo={conteudo} />}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};
