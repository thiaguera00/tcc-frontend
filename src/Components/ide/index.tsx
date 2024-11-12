import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { CodeiumEditor } from '@codeium/react-code-editor';
import ReactMarkdown from 'react-markdown';
import { AvatarFeedback } from '../../Components/avatar';
import { gerarQuestaoIa, corrigirCodigoIa } from '../../services/iaService';

interface IDEProps {
  onFinish: () => void;
  conteudo: string;
}

export const IDEComponent = ({ onFinish, conteudo }: IDEProps) => {
  const [codigo, setCodigo] = useState<string>('');
  const [questao, setQuestao] = useState<string>('Carregando a questão...');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const questaoGerada = await gerarQuestaoIa(conteudo);
        console.log('Questão gerada:', questaoGerada);
        setQuestao(questaoGerada.questao);
      } catch (error) {
        setQuestao('Erro ao carregar a questão. Tente novamente mais tarde.');
        console.error('Erro ao gerar a questão:', error);
      }
    };
    fetchQuestao();
  }, [conteudo]);

  const handleCodigoChange = (newCodigo?: string) => {
    if (newCodigo !== undefined) {
      setCodigo(newCodigo);
    }
  };

  const handleEnviarResposta = async () => {
    console.log('Código enviado:', codigo);
    setLoading(true);
    setFeedback(null);

    try {
      const respostaVerificacao = await corrigirCodigoIa(questao, codigo);
      if (respostaVerificacao.correto) {
        setFeedback('Resposta correta! Muito bem! 🎉');
        setTimeout(() => {
          onFinish();
        }, 3000);
      } else {
        setFeedback(respostaVerificacao.mensagem);
      }
    } catch (error) {
      setFeedback('Erro ao verificar a resposta. Tente novamente mais tarde.');
      console.error('Erro ao verificar a resposta:', error);
    } finally {
      setLoading(false);
    }
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
              minHeight: '500px',
              maxHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left',
              overflowY: 'auto',
              wordBreak: 'break-word',
              width: '450px',
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
              height={'532px'}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Botão de Enviar Resposta */}
      <Button variant="contained" onClick={handleEnviarResposta} sx={{ marginTop: '20px' }} disabled={loading}>
        {loading ? 'Verificando...' : 'Enviar Resposta'}
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
