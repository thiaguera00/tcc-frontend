import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  userId: string;
}

export const getUserIdFromToken = (): string | null => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: TokenPayload = jwtDecode(token);

      if (decodedToken.userId) {
        return decodedToken.userId;
      }
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
  }

  return null;
};