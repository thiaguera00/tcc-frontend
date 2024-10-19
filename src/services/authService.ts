import axios from "axios";

const API_URL = 'http://localhost:3000';

const loginEstudante = async(email: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: senha
        });
        return response.data
    } catch(error) {
        console.error('Error ao fazer login', error);
        throw error;
    }
}

export { loginEstudante }