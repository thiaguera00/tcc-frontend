import { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { gerarQuestaoForm } from '../../services/iaService';

interface QuestionarioProps {
  onFinish: (isCorrect: boolean) => void;
  conteudo: string;
  setLoading: (loading: boolean) => void;
}

export const QuestionarioComponent = ({ onFinish, conteudo, setLoading }: QuestionarioProps) => {
  const [questaoData, setQuestaoData] = useState<any>(null);
  const [resposta, setResposta] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  const fetchQuestao = async () => {
    try {
      setLoading(true);

      if (!conteudo) {
        console.error('Erro: Conteúdo não fornecido para gerar a questão.');
        setQuestaoData(null);
        return;
      }

      console.log('Enviando conteúdo para API:', conteudo);

      const questaoGerada = await gerarQuestaoForm(conteudo);

      if (questaoGerada && questaoGerada.question && questaoGerada.alternatives) {
        setQuestaoData(questaoGerada);
      } else {
        console.error('Erro: Estrutura de dados inválida recebida da API.');
        setQuestaoData(null);
      }
    } catch (error) {
      console.error('Erro ao gerar questão:', error);
      setQuestaoData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestao();
  }, [conteudo]);

  const handleResponder = () => {
    if (!resposta) {
      setFeedback('Por favor, selecione uma alternativa.');
      return;
    }

    const isCorrect = resposta === questaoData.correctAnswer;

    if (isCorrect) {
      setFeedback('Resposta correta! 🎉');
    } else {
      setFeedback(`Resposta incorreta. Correto: ${questaoData.correctAnswer}`);
    }

    // Mostrar o botão de próxima questão após responder
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    // Acionar a função onFinish ao avançar para a próxima questão
    const isCorrect = resposta === questaoData.correctAnswer;
    onFinish(isCorrect);

    // Resetar o estado para uma nova questão
    setShowNextButton(false);
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
      {questaoData ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            {questaoData.question}
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              name="alternativas"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
            >
              {questaoData.alternatives.map((option: { id: string, text: string }, index: number) => (
                <FormControlLabel
                  key={index}
                  value={option.id}
                  control={<Radio />}
                  label={`${option.id}. ${option.text}`}
                  sx={{ color: '#ffffff' }}
                />
              ))}
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
