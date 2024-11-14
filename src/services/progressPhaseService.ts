import axios from "axios";

const API_URL = 'localhost:3000';

interface IAtualizarProgress {
    user_id?: string;
    phase_id?: string;
    status?: string;
    score?: number;
    finished_at?: Date;
}

export const atualizarFase = async (progressId: string, data: IAtualizarProgress) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/progress/update/${progressId}`, data, {
            headers: {
            Authorization: `Bearer ${token}` 
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
        throw error;
    }
   
}