import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, LinearProgress, Grid, Button } from '@mui/material';
import { CodeiumEditor } from '@codeium/react-code-editor';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { AvatarFeedback } from '../../Components/avatar';
import { CardFase } from '../../Components/card-fase';
import { gerarQuestaoIa } from '../../services/iaService';
import ReactMarkdown from 'react-markdown';

export const Atividades = () => {
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
  };

  return (
    <>
      <NavBarPerfil />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          gap: '20px',
          marginTop: '60px',
        }}
      >
        {/* Barra de Navegação e Progresso */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <IconButton
            sx={{
              color: '#FFFFFF',
              '&:disabled': {
                color: '#666',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{
                backgroundColor: '#2E2E54',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#A66FD9',
                },
              }}
            />
          </Box>
        </Box>

        {/* Card da Fase */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <CardFase
            fase="FASE 1"
            descricao="Introdução à Lógica de Programação"
            corFundo="#9ade5b"
            caminho="/fase1"
          />
        </div>

        {/* Layout Principal com Enunciado e IDE */}
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
                maxHeight: '400px', // Limitar altura máxima da caixa
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                overflowY: 'auto', // Adicionar scroll se o conteúdo for maior que a caixa
                wordBreak: 'break-word', // Garantir que palavras muito longas sejam quebradas
              }}
            >
              <ReactMarkdown>{questao}</ReactMarkdown>
            </Box>
          </Grid>

          {/* IDE de Código */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                position: 'relative',
              }}
            >
              {/* Avatar do Feedback no canto superior direito */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-50px',
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
                options={{
                  fontSize: 14,
                  tabSize: 4,
                  quickSuggestions: false,
                  suggestOnTriggerCharacters: false,
                }}
                height={'400px'}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Botão de Enviar Resposta */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#6200ea',
              '&:hover': {
                backgroundColor: '#3700b3',
              },
              padding: '10px 20px',
              fontSize: '16px',
            }}
            onClick={handleEnviarResposta}
          >
            Enviar Resposta
          </Button>
        </Box>
      </Box>
    </>
  );
};
