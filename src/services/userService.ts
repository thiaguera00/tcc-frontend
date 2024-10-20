import axios from "axios";

const API_URL = 'http://localhost:3000';

const registrarEstudante = async  (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, {
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

export {registrarEstudante}