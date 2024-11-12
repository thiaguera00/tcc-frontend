import axios from "axios";

const API_URL = 'http://localhost:3000';

export const registrarEstudante = async  (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/create`, {
            name: name,
            email: email,
            password: password,
        });
        return response.data; 
    } catch (error) {
        console.error("Erro ao registrar estudante:", error);
        throw error;
    }
}

export const usuarioLogado = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            throw new Error('Token não encontrado. Por favor, faça login novamente.');
        }

        const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do estudante:", error);
        throw error;
    }
}

export const registrarQuestao = async (questao: { question: string; difficulty_level: string }) => {
    try {
        const response = await axios.post(`${API_URL}/questions/save-question`, questao, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.id;
    } catch (error) {
        console.error('Erro ao registrar questão:', error);
        throw error;
    }
};
  
  export const registrarRespostasUsuario = async (responses: { questionId: string; response: string; isCorrect: boolean }[]) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/questions/responses`,
        { responses },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Erro ao registrar respostas do usuário:', error);
      throw error;
    }
  };

  export const registrarUserQuestion = async (userId: string, questionId: string) => {
    try {
      await axios.post(`${API_URL}/questions/responses`, { userId, questionId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao registrar UserQuestion:', error);
      throw error;
    }
  };
