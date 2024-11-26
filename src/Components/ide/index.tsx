import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { CodeiumEditor } from '@codeium/react-code-editor';
import { AvatarFeedback } from '../../Components/avatar';
import { gerarQuestaoIa, corrigirCodigoIa } from '../../services/iaService';

interface IDEProps {
  onFinish: (isCorrect: boolean) => void;
  conteudo: string;
}

export const IDEComponent = ({ onFinish, conteudo }: IDEProps) => {
  const [codigo, setCodigo] = useState<string>('');
  const [questao, setQuestao] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const questaoGerada = await gerarQuestaoIa(conteudo);
        console.log('Questão gerada:', questaoGerada);

        if (questaoGerada && typeof questaoGerada === 'object' && questaoGerada.questao) {
          setQuestao(questaoGerada.questao);
        } else {
          console.error('Questão gerada não está no formato esperado:', questaoGerada);
          setQuestao(null);
        }
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
    setShowNextButton(false);
  
    try {
      const questaoTexto = questao?.titulo || '';
  
      const payload = {
        questao: questaoTexto,
        codigo: codigo
      };
  
      console.log('Payload enviado:', payload);
  
      const respostaVerificacao = await corrigirCodigoIa(payload);
      console.log('Resposta da correção:', respostaVerificacao);
  
      if (respostaVerificacao.esta_correto) {
        setFeedback(`Resposta correta! Muito bem! 🎉\n\n${respostaVerificacao.feedback}`);
        setShowNextButton(true);
      } else {
        setFeedback(`Resposta incorreta. Aqui está o feedback:\n\n${respostaVerificacao.feedback}`);
        setShowNextButton(true);
      }
    } catch (error) {
      setFeedback('Erro ao verificar a resposta. Tente novamente mais tarde.');
      console.error('Erro ao verificar a resposta:', error);
      setShowNextButton(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProximaQuestao = () => {
    onFinish(true);
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
            {questao ? (
              <>
                {questao.titulo && (
                  <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    {questao.titulo}
                  </Typography>
                )}
                {questao.instrucao && (
                  <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                    <strong>Instrução:</strong> {questao.instrucao}
                  </Typography>
                )}
                {questao.objetivo && (
                  <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                    <strong>Objetivo:</strong> {questao.objetivo}
                  </Typography>
                )}
                {questao.exemplo && (
                  <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                    <strong>Exemplo:</strong>
                    <pre style={{ background: '#333', padding: '10px', borderRadius: '5px' }}>
                      <code style={{ color: '#fff' }}>{questao.exemplo}</code>
                    </pre>
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="h6">Carregando a questão...</Typography>
            )}
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
      {!showNextButton && (
        <Button variant="contained" onClick={handleEnviarResposta} sx={{ marginTop: '20px' }} disabled={loading}>
          {loading ? 'Verificando...' : 'Enviar Resposta'}
        </Button>
      )}

      {/* Exibindo o feedback da resposta */}
      {feedback && (
        <Box
          sx={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: feedback.includes('correta') ? '#e0f7fa' : '#ffebee',
            color: feedback.includes('correta') ? '#006064' : '#c62828',
            borderRadius: '8px',
          }}
        >
          <Typography variant="subtitle1">{feedback}</Typography>
        </Box>
      )}

      {/* Botão de Próxima Questão */}
      {showNextButton && (
        <Button variant="contained" color="primary" onClick={handleProximaQuestao} sx={{ marginTop: '20px' }}>
          Próxima Questão
        </Button>
      )}
    </Box>
  );
};
