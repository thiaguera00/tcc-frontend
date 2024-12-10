import { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { CodeiumEditor } from '@codeium/react-code-editor';
import { AvatarFeedback } from '../../Components/avatar';
import { gerarQuestaoIa, corrigirCodigoIa } from '../../services/iaService';

interface IDEProps {
  onFinish: (isCorrect: boolean) => void;
  conteudo: string[];
}

export const IDEComponent = ({ onFinish, conteudo }: IDEProps) => {
  const [codigo, setCodigo] = useState<string>('');
  const [questao, setQuestao] = useState<any>(null);
  const [feedback, setFeedback] = useState<{
    esta_correto: boolean;
    resumo: string;
    correcao: string;
    melhorias?: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const questaoGerada = await gerarQuestaoIa(conteudo);
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
    setLoading(true);
    setFeedback(null);
    setShowNextButton(false);

    try {
      const questaoTexto = questao?.titulo || '';

      const payload = {
        questao: questaoTexto,
        codigo: codigo,
      };

      const respostaVerificacao = await corrigirCodigoIa(payload);

      const feedbackData: {
        esta_correto: boolean;
        resumo: string;
        correcao: string;
        melhorias?: string;
      } = {
        esta_correto: respostaVerificacao.esta_correto,
        resumo: respostaVerificacao.esta_correto
          ? `Resposta correta! Muito bem! 🎉 ${respostaVerificacao.feedback.resumo}`
          : `Resposta incorreta. ${respostaVerificacao.feedback.resumo}`,
        correcao: respostaVerificacao.feedback.correcao,
      };

      if (respostaVerificacao.feedback.melhorias?.trim()) {
        feedbackData.melhorias = respostaVerificacao.feedback.melhorias;
      }

      setFeedback(feedbackData);
      setShowNextButton(true);
    } catch (error) {
      setFeedback({
        esta_correto: false,
        resumo: 'Erro ao verificar a resposta. Tente novamente mais tarde.',
        correcao: '',
      });
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
            backgroundColor: feedback.esta_correto ? '#d1e2c0' : '#ffebee',
            color: feedback.esta_correto ? '#3a7202' : '#c62828',
            borderRadius: '8px',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {feedback.resumo}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '8px' }}>
            <strong>Correção:</strong> {feedback.correcao}
          </Typography>
          {feedback.melhorias && (
            <Typography variant="body2">
              <strong>Melhorias:</strong> {feedback.melhorias}
            </Typography>
          )}
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
