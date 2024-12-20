import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const buscarFases = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/phases/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const cadastrarFase = async (title: string, description: string, contentDescription: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/phases/create`,
    { title, description, contentDescription },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const atualizarFase = async (
  id: string,
  title: string,
  description: string,
  contentDescription: string,
) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/phases/update/${id}`,
    { title, description, contentDescription, },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const excluirFase = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/phases/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const buscarConteudoDaFase = async (faseId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/phases/${faseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar conteúdo da fase:", error);
    throw error;
  }
};
