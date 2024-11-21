import axios from 'axios';

interface ICodigoCorrecaoPayload {
  questao: string;
  codigo: string;
}

const API_URL =' http://localhost:3000';

const gerarQuestaoIa = async ( conteudo: string) => {
  try {
    const response = await axios.post('https://ia-assistente-python.onrender.com/gerar-questao/', {
      conteudo,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar questão:', error);
    throw error;
  }
};

const corrigirCodigoIa = async (payload: ICodigoCorrecaoPayload) => {
  try {
    const response = await axios.post(`https://ia-assistente-python.onrender.com/corrigir-codigo/`, payload);
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

const gerarQuestaoForm = async (conteudo : string) => {
  try {
    
    const response = await axios.post(
      'https://ia-assistente-python.onrender.com/gerar-questionario/',
      {},
      {
        params: {
          conteudo: conteudo,
        },
        headers: {
          'Content-Type': 'application/json'
        },
      },
    );
    return response.data.questao;
  } catch (error) {
    console.error('Erro ao gerar questões:', error);
    throw error;
  }
};

const corrigirQuestaoForm = async (questao: string, alternativas: string, resposta: string) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
      'https://ia-assistente-python.onrender.com/verificar-resposta-questionario/',
      {
        questao,
        alternativas,
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


export  { gerarQuestaoIa, corrigirCodigoIa, classificarEstudante, gerarQuestaoForm, corrigirQuestaoForm };
