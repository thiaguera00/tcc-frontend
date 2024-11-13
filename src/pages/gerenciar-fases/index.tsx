import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { buscarFases, cadastrarFase, atualizarFase, excluirFase } from '../../services/phaseService';
import NavBarAdmin from '../../Components/nav-gerenciar-user';

interface Fase {
  id: string;
  title: string;
  description: string;
  content: { description: string };
  count_question: number;
  created_at: string;
}

export const GerenciarFases = () => {
  const [fases, setFases] = useState<Fase[]>([]);
  const [faseEditando, setFaseEditando] = useState<Fase | null>(null);
  const [openFormulario, setOpenFormulario] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({ title: '', description: '', contentDescription: '', count: 0 });

  const buscarFasesSalvas = async () => {
    const data = await buscarFases();
    setFases(data);
  };

  useEffect(() => {
    buscarFasesSalvas();
  }, []);

  const abrirFormulario = (fase?: Fase) => {
    if (fase) {
      setFormValues({
        title: fase.title,
        description: fase.description,
        contentDescription: fase.content.description,
        count: fase.count_question,
      });
      setFaseEditando(fase);
    } else {
      setFormValues({ title: '', description: '', contentDescription: '', count: 0 });
      setFaseEditando(null);
    }
    setOpenFormulario(true);
  };

  const fecharFormulario = () => setOpenFormulario(false);

  const handleSalvar = async () => {
    if (faseEditando) {
      await atualizarFase(faseEditando.id, formValues.title, formValues.description, formValues.contentDescription, formValues.count);
    } else {
      await cadastrarFase(formValues.title, formValues.description, formValues.contentDescription, formValues.count);
    }
    fecharFormulario();
    buscarFasesSalvas();
  };

  const handleExcluir = async (id: string) => {
    await excluirFase(id);
    buscarFasesSalvas();
  };

  return (
    <>
      <NavBarAdmin title="Gerenciar Fases" />
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Typography variant="h4" component="div" align="center" color="#ffffff">
          Gerenciar Fases
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
        <TableContainer component={Paper} style={{ maxWidth: '75%', marginTop: '20px' }}>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button style={{ backgroundColor: '#8E44AD', color: '#FFFFFF', fontSize: '16px', outline: 'none', borderColor: '#8E44AD'}} onClick={() => abrirFormulario()}>
              Adicionar Fase
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize:'17px' }}>Título</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize:'17px' }}>Descrição</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize:'17px' }}>Conteúdo</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize:'17px' }}>Quantidade de Questões</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize:'17px' }}>Data de Criação</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize:'17px' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fases.map((fase) => (
                <TableRow key={fase.id}>
                  <TableCell>{fase.title}</TableCell>
                  <TableCell>{fase.description}</TableCell>
                  <TableCell>{fase.content.description}</TableCell>
                  <TableCell>{fase.count_question}</TableCell>
                  <TableCell>{format(new Date(fase.created_at), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => abrirFormulario(fase)} style={{ marginRight: '10px' }}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleExcluir(fase.id)}>
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openFormulario} onClose={fecharFormulario}>
          <DialogTitle>{faseEditando ? 'Editar Fase' : 'Adicionar Fase'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.title}
              onChange={(e) => setFormValues((prev) => ({ ...prev, title: e.target.value }))}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.description}
              onChange={(e) => setFormValues((prev) => ({ ...prev, description: e.target.value }))}
            />
            <TextField
              label="Conteúdo"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.contentDescription}
              onChange={(e) => setFormValues((prev) => ({ ...prev, contentDescription: e.target.value }))}
            />
            <TextField
              label="Quantidade de Questões"
              variant="outlined"
              fullWidth
              type="number"
              margin="normal"
              value={formValues.count}
              onChange={(e) => setFormValues((prev) => ({ ...prev, count: Number(e.target.value) }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={fecharFormulario}>Cancelar</Button>
            <Button onClick={handleSalvar}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default GerenciarFases;