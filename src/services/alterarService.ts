import axios from "axios";

const API_URL = 'http://localhost:3000';

const atualizarperfil = async (id: string, data: { nome?: string; email?: string; password?: string }) => {
  try {
    console.log(`Chamando o endpoint: ${API_URL}/users/${id}`);
    console.log('Dados enviados:', data);

    const response = await axios.put(`${API_URL}/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Resposta recebida do backend:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
    } else {
      console.error('Erro ao atualizar perfil:', error);
    }
    throw error;
  }
};

export { atualizarperfil };