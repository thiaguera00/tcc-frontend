import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  userId: string;
}

export const getUserIdFromToken = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    console.log(`Access token: ${token}`);

    if (token) {
      const decodedToken: TokenPayload = jwtDecode(token);
      console.log('Token decodificado:', decodedToken);

      if (decodedToken.userId) {
        console.log('User ID extraído do token:', decodedToken.userId);
        return decodedToken.userId;
      }
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
  }

  return null;
};