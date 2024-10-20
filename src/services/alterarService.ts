import axios from "axios";

const API_URL = 'http://localhost:3000';

// Função para atualizar o perfil do usuário, recebendo o ID e os dados de atualização
const atualizarperfil = async (id: string, data: { nome?: string; email?: string; password?: string }) => {
  try {
    // Chamada PUT com o ID do usuário na URL e os dados de atualização no corpo da requisição
    const response = await axios.put(`${API_URL}/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw error;
  }
};

export { atualizarperfil };