import { useState, useEffect } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { gerarQuestaoForm, corrigirQuestaoForm } from '../../services/iaService';
import { registrarQuestao, registrarRespostasUsuario, usuarioLogado } from '../../services/userService';

interface QuestionarioProps {
  onFinish: (isCorrect: boolean) => void; // Modificar para receber um boolean indicando se está correto
  conteudo: string; // Conteúdo da fase
}

export const QuestionarioComponent = ({ onFinish, conteudo }: QuestionarioProps) => {
  const [questao, setQuestao] = useState<string>('Carregando a questão...');
  const [alternativas, setAlternativas] = useState<string[]>([]);
  const [resposta, setResposta] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<string>('normal');
  const [questionId, setQuestionId] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userResponses, setUserResponses] = useState<{ questionId: string; response: string; isCorrect: boolean }[]>([]);

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
        if (conteudo) {
          const questaoGerada = await gerarQuestaoForm(conteudo);
          if (questaoGerada) {
            await atualizarQuestao(questaoGerada);
          } else {
            setQuestao('Erro ao carregar a questão. Resposta inesperada do servidor.');
          }
        }
      } catch (error) {
        setQuestao('Erro ao carregar a questão. Tente novamente mais tarde.');
        console.error('Erro ao gerar questões:', error);
      }
    };

    fetchUserDetails();
    fetchQuestao();
  }, [level, conteudo]);

  const atualizarQuestao = async (questaoGerada: string) => {
    const questaoDividida = questaoGerada.split('\n').map(line => line.trim()).filter(line => line !== '');

    let enunciado = "Questão não encontrada.";
    const alternativasGeradas: string[] = [];

    // Extrair o enunciado da questão
    const questaoInicioIndex = questaoDividida.findIndex(line => line.startsWith("**Questão:**"));
    if (questaoInicioIndex !== -1) {
      enunciado = questaoDividida[questaoInicioIndex + 1]; // Pega a linha seguinte ao "Questão:" para o enunciado
    }

    // Extrair alternativas
    for (let i = questaoInicioIndex + 1; i < questaoDividida.length; i++) {
      const line = questaoDividida[i];
      if (line.match(/^[a-d]\)/)) {
        alternativasGeradas.push(line);
      } else if (line.startsWith("**Resposta correta:**")) {
        break; // Para ao encontrar a resposta correta
      }
    }

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
          onFinish(true); // Passando "true" para indicar que a resposta está correta
        }, 3000);
      } else {
        setFeedback(respostaCorrecao.mensagem);
        setTimeout(() => {
          onFinish(false); // Passando "false" para indicar que a resposta está incorreta
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
