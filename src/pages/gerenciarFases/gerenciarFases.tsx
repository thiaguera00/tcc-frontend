import { useEffect, useState } from 'react';
import { buscarFases } from '../../services/phaseServiceAll';
import PersistentDrawerLeft from '../../Components/navGerenciarUser/navGerenciarUser';
import FaseComponente from '../../Components/fases/faseComponente';
import FormularioFases from '../../Components/formularioFases/formularioFases';
import { cadastrarFase } from '../../services/phaseService'; // Corrigir a importação
import { atualizarFase } from '../../services/phaseServiceAlterar'; // Importando a função de atualizar

interface Fase {
  id: string;
  title: string;
  description: string;
  content: { description: string };
  marcado: boolean;
  count_question: number;
  created_at?: string;
}

export const GerenciarFases = () => {
  const [openFormulario, setOpenFormulario] = useState<boolean>(false);
  const [fases, setFases] = useState<Fase[]>([]);
  const [faseEditando, setFaseEditando] = useState<Fase | null>(null); // Estado para manter a fase que está sendo editada

  const abrirFormulario = (fase?: Fase) => {
    if (fase) {
      setFaseEditando(fase); // Se houver fase, significa que estamos editando
    } else {
      setFaseEditando(null); // Se não, é um novo cadastro
    }
    setOpenFormulario(true);
  };

  const fecharFormulario = () => {
    setOpenFormulario(false);
    setFaseEditando(null);
  };

  const buscarFasesSalvas = async () => {
    try {
      const fasesRecuperadas = await buscarFases();
      setFases(fasesRecuperadas);
    } catch (error) {
      console.error("Erro ao buscar fases:", error);
    }
  };

  useEffect(() => {
    buscarFasesSalvas();
  }, []);

  const salvarFase = async (title: string, description: string, conteudo: string, count_question: number) => {
    try {
      if (faseEditando) {
        // Atualizar a fase existente
        await atualizarFase(faseEditando.id, title, description, conteudo, count_question);
        setFases((prevFases) =>
          prevFases.map((fase) =>
            fase.id === faseEditando.id
              ? { ...fase, title, description, content: { description: conteudo }, count_question }
              : fase
          )
        );
      } else {
        // Adicionar uma nova fase
        const novaFase = await cadastrarFase(title, description, conteudo, count_question);
        setFases((prevFases) => [...prevFases, novaFase]);
      }

      fecharFormulario();
    } catch (error) {
      console.error('Erro ao salvar a fase:', error);
    }
  };

  return (
    <div id="mainContainer">
      <PersistentDrawerLeft title="Gerenciar Fases" />
      <FaseComponente
        fases={fases}
        setFases={setFases}
        abrirFormulario={abrirFormulario} // Agora passamos a fase a ser editada para o formulário
      />
      <FormularioFases
        open={openFormulario}
        onClose={fecharFormulario}
        onSalvar={salvarFase}
        faseEditando={faseEditando} // Passa a fase em edição, se houver
      />
    </div>
  );
};
