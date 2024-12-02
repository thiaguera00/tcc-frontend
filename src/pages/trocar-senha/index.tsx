import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetarSenha } from '../../services/userService';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      if (!token) {
        setError('Token inválido.');
        return;
      }
      const response = await resetarSenha({ token, newPassword });

      setMessage(response.message || 'Senha redefinida com sucesso.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <h2>Redefinir Senha</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Redefinindo...' : 'Redefinir Senha'}
        </button>
      </form>
    </div>
  );
};
