import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  sub: string;
}

export const getUserIdFromToken = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    console.log(`Access token: ${token}`);
    if (token) {
      const decodedToken: TokenPayload = jwtDecode(token);
      console.log(decodedToken.sub)
      return decodedToken.sub;
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
  }
  return null;
};
