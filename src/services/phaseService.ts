import axios from "axios";

const API_URL = 'http://localhost:3000';

export const cadastrarFase = async (titulo: string, descricao: string, conteudo: string, quantidadeQuestoes: number) => {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login novamente.');
  }

  try {
    const response = await axios.post(
      `${API_URL}/phases/create`, 
      {
        title: titulo,
        description: descricao,
        count:quantidadeQuestoes,
        contentDescription: conteudo,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        }
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Erro ao registrar a fase:", error);
    throw error; 
  }
};
