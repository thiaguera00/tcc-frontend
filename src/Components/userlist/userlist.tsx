import { Box } from '@mui/material';
import UserCard from '../cardUser/cardUser'; 

interface User {
    id: number;
    name: string;
    email: string;
    photo: string;
}

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                padding: '16px',
                borderRadius: '8px',
                gap: '16px', // Adicionado para espaço entre os cards
            }}
        >
            {users.map((user) => (
                <UserCard key={user.id} user={user} /> 
            ))}
        </Box>
    );
};

export default UserList;
