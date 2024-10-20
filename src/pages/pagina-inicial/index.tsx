import { useEffect, useState } from 'react';
import { usuarioLogado } from "../../services/userService";
import { Usuario } from '../../utils/interfaces';
import { useNavigate } from 'react-router-dom';

export const PaginaInicial = () => {

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {

    const fetchUsuarioLogado = async () => {
      try {
        const usuarioData = await usuarioLogado();
        if (usuarioData.is_first_access === true) {
          navigate('/pesquisa')
        }
        setUsuario(usuarioData);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados do estudante:", err);
        setError('Erro ao buscar dados do estudante');
        setLoading(false);
      }
    };

    fetchUsuarioLogado();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <p>Bem-vindo, {usuario?.name}!</p>
    </>
  );
};
