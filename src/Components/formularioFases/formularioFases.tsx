import { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import './forumarioFases.css';

interface FormularioFasesProps {
  open: boolean;
  onClose: () => void;
  onSalvar: (titulo: string, descricao: string, conteudo: string, quantidadeQuestoes: number) => void;
  faseEditando?: Fase | null;
}

interface Fase {
  id: string;
  title: string;
  description: string;
  content: { description: string };
  marcado: boolean;
  count_question: number;
  created_at?: string;
}

const FormularioFases = ({ open, onClose, onSalvar, faseEditando }: FormularioFasesProps) => {
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [conteudo, setConteudo] = useState<string>('');
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (faseEditando) {
      setTitulo(faseEditando.title);
      setDescricao(faseEditando.description);
      setConteudo(faseEditando.content.description);
      setQuantidadeQuestoes(faseEditando.count_question);
    } else {
      setTitulo('');
      setDescricao('');
      setConteudo('');
      setQuantidadeQuestoes(0);
    }
    setSuccessMessage(null); // Limpar a mensagem de sucesso ao abrir o formulário
  }, [faseEditando]);

  const handleSalvar = () => {
    if (!titulo || !descricao || !conteudo || !quantidadeQuestoes) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    onSalvar(titulo, descricao, conteudo, quantidadeQuestoes);
    
    // Mostrar mensagem de sucesso
    setSuccessMessage('Fase salva com sucesso!');
    setErrorMessage(null);

    // Ocultar a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{faseEditando ? 'Editar Fase' : 'Adicionar Fase'}</DialogTitle>
      <DialogContent>
        <TextField className='campos'
          label="Título"
          variant="outlined"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          margin="normal"
        />
        <TextField className='campos'
          label="Descrição"
          variant="outlined"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
        />
        <TextField className='campos'
          label="Conteúdo"
          variant="outlined"
          fullWidth
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          margin="normal"
        />
        <TextField className='campos'
          label="Quantidade de questões"
          variant="outlined"
          fullWidth
          type="number"
          value={quantidadeQuestoes}
          onChange={(e) => setQuantidadeQuestoes(Number(e.target.value))}
          margin="normal"
        />
        {errorMessage && <Box sx={{ color: 'red', marginTop: '16px' }}>{errorMessage}</Box>}
        {successMessage && <Box sx={{ color: 'green', marginTop: '16px' }}>{successMessage}</Box>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSalvar} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioFases;
