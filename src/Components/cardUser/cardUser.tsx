import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface User {
    id: number;
    name: string;
    email: string;
    photo: string; 
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Card sx={{ maxWidth: 300, margin: '16px', backgroundColor: '#3F4273', color: 'white', borderRadius: '8px' }}>
            <CardMedia
                component="img"
                image={user.photo} 
                alt={user.name}
                sx={{ borderRadius: '50%', width: '80px', height: '80px', margin: '16px auto' }} 
            />
            <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>{user.name}</Typography> 
                <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '12px' }}>{user.email}</Typography> 
                <Button variant="contained" color="secondary" sx={{ width: '100%' }}>
                    Inativar usuário
                </Button>
            </CardContent>
        </Card>
    );
};

export default UserCard;
