import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavBarButtonProps {
  buttonName: string;
  navigateTo: string;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({ buttonName, navigateTo }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(navigateTo);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined" 
          sx={{ 
            borderColor: '#A66FD9',
            color: '#FFFFFF',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: '#A66FD9',
              color: '#FFFFFF'
            }
          }}
          onClick={handleNavigation}
        >
          {buttonName}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
