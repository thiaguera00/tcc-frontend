import PersistentDrawerLeft from '../../Components/navGerenciarUser/navGerenciarUser';
import SearchComponent from '../../Components/pesquisa/pesquisa';
import UserList from '../../Components/userlist/userlist'; 
import { Box } from '@mui/material';

export const GerenciarUsuario = () => {
    const usersMap = new Map([
        [1, { id: 1, name: 'Larissa Silva', email: 'larissasilva@gmail.com', photo: 'https://via.placeholder.com/80' }],
        [2, { id: 2, name: 'João Victor', email: 'joaovictor@gmail.com', photo: 'https://via.placeholder.com/80' }],
        [3, { id: 3, name: 'Francisco Junior', email: 'franciscojr@gmail.com', photo: 'https://via.placeholder.com/80' }],
        [4, { id: 4, name: 'Júlia Souza', email: 'juliassouza@gmail.com', photo: 'https://via.placeholder.com/80' }],
        [5, { id: 5, name: 'Bianca Macedo', email: 'biancamacedo@outlook.com', photo: 'https://via.placeholder.com/80' }],
        [6, { id: 6, name: 'Bianca Macedo', email: 'biancamacedo@outlook.com', photo: 'https://via.placeholder.com/80' }],
    ]);

    const usersArray = Array.from(usersMap.values());

    return (
        <div className="mainContainer" style={{ padding: '16px' }}> 
             <PersistentDrawerLeft title="Gerenciar usuários" />

            <Box
                sx={{
                    height: '25vh', 
                    margin: '16px auto',
                    maxWidth: '600px', 
                    padding: '16px',
                    marginLeft: '75%' 
                }}
            >
                <SearchComponent />   
            </Box>
            <UserList users={usersArray} /> 
        </div>
    );
};
