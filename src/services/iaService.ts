import axios from 'axios';

const API_URL =' http://localhost:3000';

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
    const response = await axios.post(`${API_URL}/ia/codeCorrection`, {
      code,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao corrigir código:', error);
    throw error;
  }
};

const classificarEstudante = async (responseStudents: string[], userId: string) => {
  try {
    // Obter o token do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Fazer a requisição para a API
    const response = await axios.post(
      `${API_URL}/ia/classificationStudent`,
      {
        responses: responseStudents,
        userId: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Adiciona o token JWT no cabeçalho
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao classificar estudante:', error);
    throw error;
  }
};



export  { gerarQuestaoIa, corrigirCodigo, classificarEstudante };
