import axios from 'axios';


const API_URL = 'http://localhost:3000';

const gerarQuestaoIa = async (level: string, content: string) => {
  try {
    const response = await axios.post(`${API_URL}/ia/questions`, {
      level,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar questão:', error);
    throw error;
  }
};

const corrigirCodigo = async (code: string) => {
  try {
    const response = await axios.post(`${API_URL}/ia/code-correction`, {
      code,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao corrigir código:', error);
    throw error;
  }
};


export  { gerarQuestaoIa, corrigirCodigo };