import { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { CodeiumEditor } from '@codeium/react-code-editor';
import ReactMarkdown from 'react-markdown';
import { AvatarFeedback } from '../../Components/avatar';
import { gerarQuestaoIa } from '../../services/iaService';

interface IDEProps {
  onFinish: () => void;
}

export const IDEComponent = ({ onFinish }: IDEProps) => {
  const [codigo, setCodigo] = useState<string>('');
  const [questao, setQuestao] = useState<string>('Carregando a questão...');

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const questaoGerada = await gerarQuestaoIa('iniciante', 'variáveis');
        console.log('Questão gerada:', questaoGerada);
        setQuestao(questaoGerada.questao);
      } catch (error) {
        setQuestao('Erro ao carregar a questão. Tente novamente mais tarde.');
        console.error('Erro ao gerar a questão:', error);
      }
    };
    fetchQuestao();
  }, []);

  const handleCodigoChange = (newCodigo?: string) => {
    if (newCodigo !== undefined) {
      setCodigo(newCodigo);
    }
  };

  const handleEnviarResposta = () => {
    console.log('Código enviado:', codigo);
    alert('Código submetido. Bom trabalho!');
    onFinish();
  };

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '18px' }}>
      <Grid container spacing={3}>
        {/* Enunciado da Atividade */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              backgroundColor: '#1d1e2d',
              color: '#ffffff',
              padding: '16px',
              borderRadius: '8px',
              minHeight: '400px',
              maxHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left',
              overflowY: 'auto',
              wordBreak: 'break-word',
            }}
          >
            <ReactMarkdown>{questao}</ReactMarkdown>
          </Box>
        </Grid>

        {/* IDE de Código */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            {/* Avatar do Feedback no canto superior direito */}
            <Box
              sx={{
                position: 'absolute',
                top: '-70px',
                right: '-20px',
                cursor: 'pointer',
              }}
            >
              <AvatarFeedback />
            </Box>
            <CodeiumEditor
              value={codigo}
              language="python"
              theme="vs-dark"
              onChange={handleCodigoChange}
              options={{ fontSize: 14, tabSize: 4, quickSuggestions: false, suggestOnTriggerCharacters: false }}
              height={'435px'}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Botão de Enviar Resposta */}
      <Button variant="contained" onClick={handleEnviarResposta} sx={{ marginTop: '20px' }}>
        Enviar Resposta
      </Button>
    </Box>
  );
};
