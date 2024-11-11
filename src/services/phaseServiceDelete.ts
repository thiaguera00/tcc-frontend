// services/phaseServicedelete.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pela URL do seu backend

export const deletarFase = async (id: string) => {
  try {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage

    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login novamente.');
    }

    await axios.delete(`${API_URL}/phases/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Erro ao excluir fase:', error);
    throw error;
  }
};
