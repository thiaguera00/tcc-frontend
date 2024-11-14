import { useState, useEffect } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import NavBarAdmin from '../../Components/nav-gerenciar-user';
import SearchComponent from '../../Components/pesquisa';
import UserList from '../../Components/user-list';
import axios from 'axios';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  photo?: string;
}

export const GerenciarUsuario = () => {
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/listUsers');
        setUsersArray(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar usuários. Tente novamente mais tarde.');
        setLoading(false);
        console.error('Erro ao buscar usuários:', err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(usersArray);
    } else {
      setFilteredUsers(
        usersArray.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, usersArray]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEditUser = (userId: number) => {
    const user = usersArray.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return <div>Carregando usuários...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mainContainer" style={{ padding: '16px', backgroundColor:'#252746'}}>
      <NavBarAdmin title="Gerenciar usuários" />
      <Box
        sx={{
          height: '25vh',
          margin: '16px auto',
          maxWidth: '600px',
          padding: '16px',
          marginLeft: '75%',
        }}
      >
        <SearchComponent value={searchQuery} onChange={handleSearchChange} />
      </Box>
      <UserList users={filteredUsers} onEditUser={handleEditUser} />

      {/* Modal para exibir detalhes do usuário */}
      <Modal
        open={!!selectedUser}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '400px',
            backgroundColor: '#262B40',
            color: '#ffffff',
            padding: '24px',
            borderRadius: '8px',
          }}
        >
          {selectedUser && (
            <>
              <Typography variant="h5" sx={{ marginBottom: '16px' }}>
                Detalhes do Usuário
              </Typography>
              <Typography variant="body1">
                <strong>Nome:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {selectedUser.role}
              </Typography>
              <Typography variant="body1">
                <strong>Criado em:</strong> {selectedUser.created_at}
              </Typography>
              <Typography variant="body1">
                <strong>Última atualização:</strong> {selectedUser.updated_at}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
