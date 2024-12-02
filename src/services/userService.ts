import axios from "axios";

const API_URL = 'http://localhost:3000';

interface IAtualizarUsuario {
  name?: string;
  email?: string;
  level?: string;
  points?: number;
  passwords?: string
  is_first_access?: boolean;
}

interface IResetSenha {
  token: string;
  newPassword: string;
}

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
        if (!token) {
            throw new Error('Token não encontrado. Por favor, faça login novamente.');
        }

        const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.status == 401) {
          alert("Seu token expirou faça login novamente")
          window.location.href = '/login';
          throw new Error('Token inválido. Por favor, faça login novamente.');
        }

        return response.data;

      } catch (error) {
        console.error("Erro ao buscar dados do estudante:", error);
        throw error; 
    }
};


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

  export const atualizarUsuario = async (userId: string, data: IAtualizarUsuario) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.put(`${API_URL}/users/update/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar UserQuestion:', error);
      throw error;
    }
  };

  export const resetarSenha = async (data: IResetSenha) => {
    try {
  
      const response = await axios.post(`${API_URL}/users/reset-password`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar UserQuestion:', error);
      throw error;
    }
  };

  export const inativarUsuario = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.delete(`${API_URL}/users/inactive/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao inativar Usuario:', error);
      throw error;
    }
  };
