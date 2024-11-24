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
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const fetchQuestao = async () => {
    try {
      setLoading(true);
      if (conteudo) {
        const questaoGerada = await gerarQuestaoForm(conteudo);
        console.log("Questão gerada:", questaoGerada);
  
        if (questaoGerada && typeof questaoGerada === 'object') {
          const { question, options } = questaoGerada;

          if (
            typeof question === 'string' &&
            Array.isArray(options) &&
            options.length > 0 &&
            options.every(opt => typeof opt === 'string')
          ) {
            setQuestaoData(questaoGerada);
  
            const id = await registrarQuestao({
              question: questaoGerada.question,
              difficulty_level: level,
            });
            setQuestionId(id);
          } else {
            console.error('Estrutura de dados inválida para questaoGerada: ', questaoGerada);
            setQuestaoData(null);
          }
        } else {
          console.error('Estrutura de dados inválida para questaoGerada (não é um objeto válido):', questaoGerada);
          setQuestaoData(null);
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
      setFeedback('Por favor, selecione uma alternativa.');
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
      } else {
        setFeedback(respostaCorrecao?.mensagem || 'Resposta incorreta. Tente novamente.');
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

      setShowNextButton(true); // Exibe o botão "Próxima Questão"
      onFinish(isCorrect); // Informa o resultado da questão
    } catch (error) {
      setFeedback('Erro ao verificar a resposta. Tente novamente mais tarde.');
      console.error('Erro ao verificar resposta da questão:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setShowNextButton(false); // Oculta o botão Próxima Questão
    resetQuestao(); // Reseta a questão atual e carrega a próxima
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
              {questaoData.options.length > 0 ? (
                questaoData.options.map((option: string, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={`${String.fromCharCode(65 + index)}. ${option}`}
                    sx={{ color: '#ffffff' }}
                  />
                ))
              ) : (
                <Typography variant="subtitle1" color="error">
                  Erro ao carregar as opções. Tente novamente mais tarde.
                </Typography>
              )}
            </RadioGroup>
          </FormControl>

          {!showNextButton && (
            <Button variant="contained" onClick={handleResponder} sx={{ marginTop: '20px' }}>
              Responder
            </Button>
          )}

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

          {showNextButton && (
            <Button variant="contained" onClick={handleNextQuestion} sx={{ marginTop: '20px' }}>
              Próxima Questão
            </Button>
          )}
        </>
      ) : (
        <Typography variant="h6">Carregando a questão...</Typography>
      )}
    </Box>
  );
};
