import { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from '@mui/material';
import NavBarAdmin from '../../Components/nav-gerenciar-user';
import SearchComponent from '../../Components/pesquisa';
import axios from 'axios';
import { format } from 'date-fns';
import { inativarUsuario } from '../../services/userService'; // Importa a função inativarUsuario

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
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

  const handleEditUser = (userId: string) => {
    const user = usersArray.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  const handleInactivateUser = async (userId: string) => {
    try {
      await inativarUsuario(userId);
      alert('Usuário inativado com sucesso.');
    } catch (err) {
      console.error('Erro ao inativar usuário:', err);
      setError('Erro ao inativar usuário. Tente novamente mais tarde.');
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
    <div className="mainContainer" style={{ padding: '16px', backgroundColor:'#252746' }}>
      <NavBarAdmin title="Gerenciar usuários" />
      <Box display="flex" justifyContent="start" alignItems="start" mt={2} marginLeft={23.5}>
        <Typography variant="h4" component="div" align="center" color="#ffffff">
          GERENCIAR USUÁRIOS
        </Typography>
      </Box>

      {/* Caixa de pesquisa posicionada acima da tabela */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '16px auto',
          marginTop: '116px',
          width: '30%',
        }}
      >
        <SearchComponent value={searchQuery} onChange={handleSearchChange} />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: '20px', backgroundColor: '#dedede', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
          <TableHead>
            <TableRow style={{ background: '#b6b6b6' }}>
              <TableCell style={{ fontWeight: 'bold', fontSize: '17px' }}>Nome</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '17px' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '17px' }}>Função</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '17px' }}>Criado em</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '17px' }}>Ativo</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '17px' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} style={{ background: '#c5c5c5' }}>
                <TableCell style={{ color: '#000000' }}>{user.name}</TableCell>
                <TableCell style={{ color: '#000000' }}>{user.email}</TableCell>
                <TableCell style={{ color: '#000000' }}>{user.role}</TableCell>
                <TableCell style={{ color: '#000000' }}>{format(new Date(user.created_at), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell style={{ color: '#000000' }}>{!user.deleted_at ? 'SIM' : 'NÃO'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditUser(String(user.id))}
                    sx={{ marginRight: '8px' }}
                  >
                    Detalhes
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleInactivateUser(String(user.id))}
                  >
                    Inativar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
