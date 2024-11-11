import axios from "axios";

const API_URL = 'http://localhost:3000';

export const buscarFases = async () => {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login novamente.');
  }

  try {
    const response = await axios.get(`${API_URL}/phases/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Envia o token para a API
      },
    });

    return response.data; // Retorna os dados recebidos da API
  } catch (error) {
    console.error("Erro ao buscar fases:", error);
    throw error;
  }
};
