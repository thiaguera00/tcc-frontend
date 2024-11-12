import React from 'react';
import { TextField } from '@mui/material';

interface SearchComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="Pesquisar usuário"
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      sx={{
        backgroundColor: '#1d1e2d',
        input: {
          color: '#ffffff',
        },
        label: {
          color: '#ffffff',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ffffff',
          },
          '&:hover fieldset': {
            borderColor: '#ffffff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#c56bc5',
          },
        },
      }}
    />
  );
};

export default SearchComponent;
