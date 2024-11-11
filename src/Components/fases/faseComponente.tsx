import { useState } from 'react';
import { Checkbox, IconButton, Button, List, ListItem, Collapse } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { deletarFase } from '../../services/phaseServicedelete';

interface Fase {
  id: string;
  title: string;
  description: string;
  content: { description: string };
  marcado: boolean;
  count_question: number;
  created_at?: string;
}

interface FaseComponenteProps {
  fases: Fase[];
  setFases: React.Dispatch<React.SetStateAction<Fase[]>>;
  abrirFormulario: (fase?: Fase) => void; // Atualizamos para receber uma fase opcional
}

const FaseComponente = ({ fases, setFases, abrirFormulario }: FaseComponenteProps) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const excluirFase = async (id: string) => {
    try {
      await deletarFase(id);
      setFases((prevFases) => prevFases.filter((fase) => fase.id !== id));
    } catch (error) {
      console.error('Erro ao excluir fase:', error);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', margin: '10%', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Fases</h2>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => abrirFormulario()}>
          Adicionar Fase
        </Button>
      </div>

      <List>
        {fases.map((fase) => (
          <div key={fase.id}>
            <ListItem
              style={{
                marginBottom: '10px',
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={fase.marcado} edge="start" onChange={() => toggleExpand(fase.id)} />
                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{fase.title} -</span>
                  <span>{fase.description}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconButton onClick={() => abrirFormulario(fase)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => excluirFase(fase.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            </ListItem>

            <Collapse in={expanded[fase.id]} timeout="auto" unmountOnExit>
              <div
                style={{
                  marginLeft: '40px',
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '5px',
                }}
              >
                <p>
                  <strong>Conteúdo:</strong> {fase.content.description}
                </p>
                <p>
                  <strong>Data de Rastreabilidade:</strong> {fase.created_at}
                </p>
                <p>
                  <strong>Quantidade de questões:</strong> {fase.count_question}
                </p>
              </div>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default FaseComponente;
