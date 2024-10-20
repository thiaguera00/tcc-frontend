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

const usuarioLogado = async() => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_URL}/users/me`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do estudante:", error);
        throw error;
    }
}

export {registrarEstudante, usuarioLogado}