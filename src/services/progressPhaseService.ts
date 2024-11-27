import axios from 'axios';

const API_URL = 'http://localhost:3000';

interface IAtualizarProgress {
  status?: string;
  score?: number;
  finished_at?: Date;
}

/**
 * Buscar ou criar progresso de fase
 * @param userId - O ID do usuário
 * @param phaseId - O ID da fase
 * @returns O progresso da fase
 */
export const buscarProgresso = async (userId: string, phaseId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/progress/find/${userId}/${phaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar progresso da fase:', error);
    throw error;
  }
};

/**
 * Atualizar progresso de fase
 * @param progressId - O ID do progresso a ser atualizado
 * @param data - Os dados a serem atualizados
 * @returns O progresso atualizado
 */
export const atualizarFaseProgresso = async (progressId: string, data: IAtualizarProgress) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/progress/update/${progressId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar progresso da fase:', error);
    throw error;
  }
};
