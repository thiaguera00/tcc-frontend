import { Box } from '@mui/material';
import UserCard from '../card-user';


interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

interface UserListProps {
  users: User[];
  onEditUser: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEditUser }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '16px',
        borderRadius: '8px',
        gap: '16px',
      }}
    >
      {users.map((user) => (
        
        <UserCard key={user.id} user={user}  onEditClick={onEditUser} />
      ))}
    </Box>
  );
};

export default UserList;
