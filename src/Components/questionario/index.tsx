import { useState, useEffect } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { gerarQuestaoForm, corrigirQuestaoForm } from '../../services/iaService';
import { registrarQuestao, registrarRespostasUsuario, usuarioLogado } from '../../services/userService';

interface QuestionarioProps {
  onFinish: () => void;
}

export const QuestionarioComponent = ({ onFinish }: QuestionarioProps) => {
  const [questao, setQuestao] = useState<string>('Carregando a questão...');
  const [alternativas, setAlternativas] = useState<string[]>([]);
  const [resposta, setResposta] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<string>('normal');
  const [questionId, setQuestionId] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userResponses, setUserResponses] = useState<{ questionId: string; response: string; isCorrect: boolean }[]>([]); // Adicionado estado para userResponses

  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        const userDetails = await usuarioLogado();
        
        setLevel(userDetails.points > 50 ? 'normal' : 'iniciante');
      } catch (error) {
        console.error("Erro ao buscar dados do estudante:", error);
      }
    };
    
    const fetchQuestao = async () => {
      try {
        const questaoGerada = await gerarQuestaoForm("algoritmo, variaveis operadores lógicos");

        if (questaoGerada) {
          await atualizarQuestao(questaoGerada);
        } else {
          setQuestao('Erro ao carregar a questão. Resposta inesperada do servidor.');
        }
      } catch (error) {
        setQuestao('Erro ao carregar a questão. Tente novamente mais tarde.');
        console.error('Erro ao gerar questões:', error);
      }
    };

    fetchUserDetails();
    fetchQuestao();
  }, [level]);

  const atualizarQuestao = async (questaoGerada: string) => {
    const questaoDividida = questaoGerada.split('\n').map(line => line.trim()).filter(line => line !== '');
    
    const enunciadoIndex = questaoDividida.findIndex(line => line.startsWith("##"));
    
    let enunciado = "Questão não encontrada.";
    
    if (enunciadoIndex !== -1) {
      enunciado = questaoDividida.slice(enunciadoIndex + 1).find(line => !line.match(/^[a-d]\)/)) || enunciado;
    }
    const alternativasGeradas = questaoDividida.filter((line: string) => line.match(/^[a-d]\)/));
  
    setQuestao(enunciado);
    setAlternativas(alternativasGeradas);
    setResposta('');
    setFeedback(null);
 
    try {
      const id = await registrarQuestao({ question: enunciado, difficulty_level: level });
      setQuestionId(id);
    } catch (error) {
      console.error('Erro ao registrar questão ou relação no backend:', error);
    }
  };

  const handleResponder = async () => {
    if (!resposta) {
      alert('Por favor, selecione uma alternativa.');
      return;
    }
  
    setLoading(true);
    setFeedback(null);
  
    try {
      const alternativasConcatenadas = alternativas.join('\n');
  
      const respostaCorrecao = await corrigirQuestaoForm(questao, alternativasConcatenadas, resposta);
  
      let isCorrect = false;
  
      if (respostaCorrecao?.correto) {
        isCorrect = true;
        setFeedback('Resposta correta! Muito bem! 🎉');
        setTimeout(() => {
          onFinish();
        }, 3000);
      } else {
        setFeedback(respostaCorrecao.mensagem);
        setTimeout(async () => {
          try {
            const novaQuestao = await gerarQuestaoForm("algoritmo");
            await atualizarQuestao(novaQuestao);
          } catch (error) {
            setQuestao('Erro ao gerar uma nova questão. Tente novamente mais tarde.');
            console.error('Erro ao gerar nova questão:', error);
          }
        }, 3000);
      }
  
      if (questionId) {
        const respostaAtual = {
          questionId: questionId,
          response: resposta,
          isCorrect: isCorrect,
        };
  
        setUserResponses((prevResponses) => [...prevResponses, respostaAtual]);
  
        await registrarRespostasUsuario([respostaAtual]);
      } else {
        console.error('Erro: questionId não definido.');
      }
    } catch (error) {
      setFeedback('Erro ao verificar a resposta. Tente novamente mais tarde.');
      console.error('Erro ao verificar resposta da questão:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1d1e2d',
        color: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Exibindo a questão sem as alternativas */}
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>
        <ReactMarkdown>{questao}</ReactMarkdown>
      </Typography>

      {/* Exibindo as alternativas como opções de resposta */}
      {alternativas.length > 0 && (
        <RadioGroup value={resposta} onChange={(e) => setResposta(e.target.value)}>
          {alternativas.map((alt, index) => (
            <FormControlLabel
              key={index}
              value={alt}
              control={<Radio style={{ color: '#ffffff' }} />}
              label={<Typography sx={{ color: '#ffffff' }}>{alt}</Typography>}
            />
          ))}
        </RadioGroup>
      )}

      {/* Botão de Resposta */}
      <Button variant="contained" onClick={handleResponder} sx={{ marginTop: '20px' }} disabled={loading}>
        {loading ? 'Verificando...' : 'Responder'}
      </Button>

      {/* Exibindo o feedback da resposta */}
      {feedback && (
        <Typography variant="subtitle1" sx={{ marginTop: '20px', color: feedback.includes('correta') ? '#4caf50' : '#f44336' }}>
          {feedback}
        </Typography>
      )}
    </Box>
  );
};
