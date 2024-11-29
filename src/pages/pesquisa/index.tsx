import { useState } from 'react';
import { Box, Card, Typography, LinearProgress, Button, IconButton, Modal } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { classificarEstudante } from '../../services/iaService';
import { getUserIdFromToken } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';

export const Pesquisa = () => {
  const navigate = useNavigate();
  const questions = [
    {
      question: 'Bem-vindo! Eu sou a Nix. Serei sua companheira em toda a sua jornada de aprendizado!',
      options: [],
    },
    {
      question: 'Para começar, é necessário que você responda algumas perguntinhas rápidas!',
      options: [],
    },
    {
      question: 'Qual é o seu nível de conhecimento em programação?',
      options: [
        'Iniciante (Nunca programei antes)',
        'Intermediário (Já escrevi códigos simples)',
        'Avançado (Tenho experiência considerável)',
      ],
    },
    {
      question: 'Com qual linguagem de programação você já teve contato?',
      options: [
        'Nenhuma',
        'Python',
        'Java',
        'JavaScript',
        'Outras',
      ],
    },
    {
      question: 'Qual é o seu objetivo ao aprender programação?',
      options: [
        'Aprender o básico',
        'Desenvolver projetos pessoais',
        'Melhorar minhas habilidades para o trabalho',
        'Mudar de carreira',
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [classificationResult, setClassificationResult] = useState<string>('');

  const handleNextQuestion = async (selectedOption?: string) => {
    const updatedAnswers = [...answers];
    if (selectedOption) {
        updatedAnswers[currentQuestionIndex] = selectedOption;
        setAnswers(updatedAnswers);
    }

    if (currentQuestionIndex === questions.length - 1) {
        try {
            const userId = getUserIdFromToken();

            if (!userId) {
                throw new Error('Usuário não autenticado.');
            }

            const response = await classificarEstudante(updatedAnswers.slice(2), userId);
            setClassificationResult(response);
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao classificar estudante:', error);
        }
    } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
};


  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/playground');
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#191B33',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '50px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '50%',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            sx={{
              color: '#FFFFFF',
              '&:disabled': {
                color: '#666',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, marginLeft: '16px' }}>
            <LinearProgress
              variant="determinate"
              value={((currentQuestionIndex + 1) / questions.length) * 100}
              sx={{
                backgroundColor: '#2E2E54',
                '& .MuiLinearProgress-bar': { //copiar aqui e colocar na atividade 
                  backgroundColor: '#A66FD9',
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 0.5,
          }}
        >
          <Card
            sx={{
              backgroundColor: '#2E2E54',
              color: '#FFFFFF',
              padding: '26px',
              borderRadius: '12px',
              marginBottom: '16px',
              width: 'fit-content',
              maxWidth: '600px',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" fontSize={'20px'}>
              {questions[currentQuestionIndex].question}
            </Typography>
          </Card>

          {questions[currentQuestionIndex].options.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: '400px',
                marginTop: '20px',
                gap: '16px',
              }}
            >
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  onClick={() => handleNextQuestion(option)}
                  sx={{
                    backgroundColor: '#2E2E54',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '20px',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: '#2E2E54',
                      color: '#A66FD9',
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>
          )}

          {questions[currentQuestionIndex].options.length === 0 && (
            <Button
              variant="contained"
              onClick={() => handleNextQuestion()}
              sx={{
                backgroundColor: '#A66FD9',
                color: '#FFFFFF',
                borderRadius: '8px',
                marginTop: '20px',
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                  color: '#A66FD9',
                },
              }}
            >
              Próximo
            </Button>
          )}
        </Box>

        <Box
          component="img"
          src="/assets/NixGrande.svg"
          alt="Nix Mascote"
          sx={{
            position: 'sticky',
            marginLeft: 'auto',
            marginRight: '300px',
            width: '150px',
            height: 'auto',
          }}
        />
      </Box>

      <Modal
        open={showModal}
        onClose={handleModalClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            padding: '32px',
            backgroundColor: '#2E2E54',
            color: '#FFFFFF',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '500px',
          }}
        >
          <Typography variant="h6" fontSize={'24px'}>
            Resultado da Classificação
          </Typography>
          <Typography variant="body1" fontSize={'20px'} marginTop={'16px'}>
            {classificationResult}
          </Typography>
          <Button
            onClick={handleModalClose}
            sx={{
              marginTop: '24px',
              backgroundColor: '#A66FD9',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#A66FD9',
              },
            }}
          >
            Fechar
          </Button>
        </Card>
      </Modal>
    </>
  );
};
