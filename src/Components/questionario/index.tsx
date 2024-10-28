import { useState, useEffect } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { gerarQuestaoForm } from '../../services/iaService';

interface QuestionarioProps {
  onFinish: () => void;
}

export const QuestionarioComponent = ({ onFinish }: QuestionarioProps) => {
  const [questao, setQuestao] = useState<string>('Carregando a questão...');
  const [alternativas, setAlternativas] = useState<string[]>([]);
  const [respostaCorreta, setRespostaCorreta] = useState<string>('');
  const [resposta, setResposta] = useState<string>('');

  useEffect(() => {
    const fetchQuestao = async () => {
      try {

        const questaoGerada = await gerarQuestaoForm();

        if (questaoGerada && questaoGerada.questionario) {
          const questaoDividida = questaoGerada.questionario.split('\n');

          const enunciado = questaoDividida[2];
          const alternativasGeradas = questaoDividida
            .filter((line: string )=> line.match(/^[a-e]\)/))
            .map((line: string) => line.trim()); 

          setQuestao(enunciado);
          setAlternativas(alternativasGeradas);
          setRespostaCorreta(questaoGerada.resposta);
        } else {
          setQuestao('Erro ao carregar a questão. Resposta inesperada do servidor.');
        }
      } catch (error) {
        setQuestao('Erro ao carregar a questão. Tente novamente mais tarde.');
        console.error('Erro ao gerar questões:', error);
      }
    };

    fetchQuestao();
  }, []);

  const handleResponder = () => {
    if (resposta === respostaCorreta) {
      alert('Resposta correta!');
      onFinish();
    } else {
      alert('Resposta incorreta. Tente novamente!');
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
              control={<Radio style={{color: '#ffffff' }} />}
              label={<Typography sx={{ color: '#ffffff' }}>{alt}</Typography>}
            />
          ))}
        </RadioGroup>
      )}

      {/* Botão de Resposta */}
      <Button variant="contained" onClick={handleResponder} sx={{ marginTop: '20px' }}>
        Responder
      </Button>
    </Box>
  );
};
