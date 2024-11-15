import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { registrarQuestao, registrarRespostasUsuario, usuarioLogado } from '../../services/userService';
import { gerarQuestaoForm, corrigirQuestaoForm } from '../../services/iaService';

interface QuestionarioProps {
  onFinish: (isCorrect: boolean) => void;
  conteudo: string;
  setLoading: (loading: boolean) => void;
}

export const QuestionarioComponent = ({ onFinish, conteudo, setLoading }: QuestionarioProps) => {
  const [questaoData, setQuestaoData] = useState<any>(null);
  const [resposta, setResposta] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [level, setLevel] = useState<string>('normal');
  const [questionId, setQuestionId] = useState<string>('');
  const isMounted = useRef<boolean>(false);

  const fetchQuestao = async () => {
    try {
      setLoading(true);
      if (conteudo) {
        const questaoGerada = await gerarQuestaoForm(conteudo);
        console.log("Questão gerada:", questaoGerada);

        if (questaoGerada && questaoGerada.options && Array.isArray(questaoGerada.options)) {
          setQuestaoData(questaoGerada);

          const id = await registrarQuestao({
            question: questaoGerada.question,
            difficulty_level: level,
          });
          setQuestionId(id);
        } else {
          console.error('Estrutura de dados inválida para questaoGerada:', questaoGerada);
          setQuestaoData('Erro ao carregar a questão. Tente novamente mais tarde.');
        }
      }
    } catch (error) {
      setQuestaoData('Erro ao carregar a questão. Tente novamente mais tarde.');
      console.error('Erro ao gerar questões:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const fetchUserDetails = async () => {
        try {
          const userDetails = await usuarioLogado();
          setLevel(userDetails.points > 50 ? 'normal' : 'iniciante');
        } catch (error) {
          console.error("Erro ao buscar dados do estudante:", error);
        }
      };

      fetchUserDetails();
      fetchQuestao();
    }
  }, [conteudo, setLoading]);

  const handleResponder = async () => {
    if (!resposta) {
      alert('Por favor, selecione uma alternativa.');
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const alternativasConcatenadas = questaoData.options.join('\n');
      const respostaCorrecao = await corrigirQuestaoForm(questaoData.question, alternativasConcatenadas, resposta);

      let isCorrect = false;

      if (respostaCorrecao?.correto) {
        isCorrect = true;
        setFeedback('Resposta correta! Muito bem! 🎉');
        setTimeout(() => {
          onFinish(true);
          resetQuestao();
        }, 2000);
      } else {
        setFeedback(respostaCorrecao?.mensagem || 'Resposta incorreta. Tente novamente.');
        setTimeout(() => {
          onFinish(false);
          resetQuestao();
        }, 2000);
      }

      if (questionId) {
        const respostaAtual = {
          questionId: questionId,
          response: resposta,
          isCorrect: isCorrect,
        };

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

  const resetQuestao = () => {
    setQuestaoData(null);
    setResposta('');
    setFeedback(null);
    fetchQuestao();
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
      {questaoData && questaoData.question && questaoData.options ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            {questaoData.question}
          </Typography>

          {questaoData.expression && (
            <Typography variant="body1" sx={{ marginBottom: '16px', fontStyle: 'italic' }}>
              Expressão: {questaoData.expression}
            </Typography>
          )}

          <FormControl component="fieldset">
            <RadioGroup
              name="alternativas"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
            >
              {questaoData.options.map((option: string, index: number) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{ color: '#ffffff' }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Button variant="contained" onClick={handleResponder} sx={{ marginTop: '20px' }}>
            Responder
          </Button>

          {feedback && (
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: '20px',
                color: feedback.includes('correta') ? '#4caf50' : '#f44336',
              }}
            >
              {feedback}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6">Carregando a questão...</Typography>
      )}
    </Box>
  );
};
