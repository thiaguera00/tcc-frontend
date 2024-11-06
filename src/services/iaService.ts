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
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${API_URL}/users/classificationStudent`,
      {
        responses: responseStudents,
        userId: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao classificar estudante:', error);
    throw error;
  }
};

const gerarQuestaoForm = async (conteudo : string, nivel: string) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
    'https://ia-assistente-python.onrender.com/gerar-questao/',
      {
        conteudo : conteudo,
        nivel: nivel
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    return response.data.questao;
  } catch (error) {
    console.error('Erro ao gerar questões:', error);
    throw error;
  }
};

const corrigirQuestaoForm = async (questao: string, resposta: string) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
      'https://ia-assistente-python.onrender.com/verificar-resposta-questionario/',
      {
        questao,
        resposta,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao verificar resposta da questão:', error);
    throw error;
  }
};


export  { gerarQuestaoIa, corrigirCodigo, classificarEstudante, gerarQuestaoForm, corrigirQuestaoForm };
