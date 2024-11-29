import { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { gerarQuestaoForm } from '../../services/iaService';
import { registrarQuestao, registrarRespostasUsuario } from '../../services/userService';

interface QuestionarioProps {
  onFinish: (isCorrect: boolean) => void;
  conteudo: string[];
  setLoading: (loading: boolean) => void;
}

export const QuestionarioComponent = ({ onFinish, conteudo, setLoading }: QuestionarioProps) => {
  const [questaoData, setQuestaoData] = useState<any>(null);
  const [resposta, setResposta] = useState<string>('');
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [questaoId, setQuestaoId] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  const fetchQuestao = async () => {
    try {
      setLoading(true);

      if (!conteudo) {
        console.error('Erro: Conteúdo não fornecido para gerar a questão.');
        setQuestaoData(null);
        return;
      }

      const questaoGerada = await gerarQuestaoForm(conteudo);

      if (questaoGerada && questaoGerada.question && questaoGerada.alternatives) {
        setQuestaoData(questaoGerada);

        const registeredId = await registrarQuestao({
          question: questaoGerada.question,
          difficulty_level: questaoGerada.difficulty || 'medium',
        });
        setQuestaoId(registeredId);
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

  const handleOptionChange = (value: string, description: string) => {
    setResposta(value);
    setSelectedDescription(description);
  };

  const handleResponder = async () => {
    if (!resposta) {
      setSelectedDescription('Por favor, selecione uma alternativa.');
      return;
    }

    const isCorrect = resposta === questaoData.correctAnswer;

    setCorrectAnswer(questaoData.correctAnswer);

    if (questaoId) {
      try {
        await registrarRespostasUsuario([
          {
            questionId: questaoId,
            response: resposta,
            isCorrect,
          },
        ]);
      } catch (error) {
        console.error('Erro ao registrar a resposta do usuário:', error);
      }
    }

    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    const isCorrect = resposta === questaoData.correctAnswer;
    onFinish(isCorrect);

    setShowNextButton(false);
    setQuestaoData(null);
    setResposta('');
    setSelectedDescription(null);
    setQuestaoId(null);
    setCorrectAnswer(null);
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
              onChange={(e) => {
                const selectedOption = questaoData.alternatives.find(
                  (option: { id: string }) => option.id === e.target.value
                );
                handleOptionChange(e.target.value, selectedOption.description);
              }}
            >
              {questaoData.alternatives.map(
                (
                  option: { id: string; text: string; description: string },
                  index: number
                ) => (
                  <FormControlLabel
                    key={index}
                    value={option.id}
                    control={<Radio />}
                    label={`${option.id}. ${option.text}`}
                    sx={{
                      color:
                        showNextButton && option.id === questaoData.correctAnswer
                          ? '#4caf50'
                          : showNextButton && option.id === resposta
                          ? '#f44336'
                          : '#ffffff',
                    }}
                  />
                )
              )}
            </RadioGroup>
          </FormControl>

          {showNextButton && selectedDescription && (
            <Typography
              variant="body1"
              sx={{
                marginTop: '10px',
                color:
                  showNextButton && resposta === correctAnswer
                    ? '#4caf50'
                    : showNextButton && resposta !== correctAnswer
                    ? '#f44336'
                    : '#9e9e9e',
              }}
            >
              {selectedDescription}
            </Typography>
          )}

          {!showNextButton && (
            <Button variant="contained" onClick={handleResponder} sx={{ marginTop: '20px' }}>
              Responder
            </Button>
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
