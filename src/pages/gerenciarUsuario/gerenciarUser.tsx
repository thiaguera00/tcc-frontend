import NixNavBarPerfil from '../../Components/nav-bar-perfil';
import SearchComponent from '../../Components/pesquisa/pesquisa';
import UserList from '../../Components/userlist/userlist'; 
import { Box } from '@mui/material';

export const GerenciarUsuario = () => {
    const users = [
        {
            id: 1,
            name: 'Larissa Silva',
            email: 'larissasilva@gmail.com',
            photo: 'https://via.placeholder.com/80', 
        },
        {
            id: 2,
            name: 'João Victor',
            email: 'joaovictor@gmail.com',
            photo: 'https://via.placeholder.com/80',
        },
        {
            id: 3,
            name: 'Francisco Junior',
            email: 'franciscojr@gmail.com',
            photo: 'https://via.placeholder.com/80',
        },
        {
            id: 4,
            name: 'Júlia Souza',
            email: 'juliassouza@gmail.com',
            photo: 'https://via.placeholder.com/80',
        },
        {
            id: 5,
            name: 'Bianca Macedo',
            email: 'biancamacedo@outlook.com',
            photo: 'https://via.placeholder.com/80',
        },
    ];

    return (
        <div className="mainContainer">
            <NixNavBarPerfil />
            <Box
                sx={{
                    height: '25vh', 
                    marginLeft: '75%', 
                    padding: '16px', 
                }}
            >
                <SearchComponent />   
            </Box>

            <UserList users={users} /> 
        </div>
    );
};
