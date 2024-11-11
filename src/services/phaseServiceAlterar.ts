import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const atualizarFase = async (
  id: string,
  titulo: string,
  descricao: string,
  conteudo: string,
  quantidadeQuestoes: number
) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login novamente.');
  }

  try {
    const response = await axios.put(
      `${API_URL}/phases/update/${id}`,
      {
        title: titulo,
        description: descricao,
        content: { description: conteudo },
        count_question: quantidadeQuestoes,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar fase:', error);
    throw error;
  }
};
