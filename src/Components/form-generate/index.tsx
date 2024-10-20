import React from 'react';
import { Button, Box } from '@mui/material';

interface InputField {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormGenerateProps {
  buttonName: string;
  inputs: InputField[];
  action: (event: React.FormEvent<HTMLFormElement>) => void;
  method: 'POST' | 'GET';
  inputStyles?: React.CSSProperties;
}

export const FormGenerate: React.FC<FormGenerateProps> = ({ inputs, action, method, buttonName, inputStyles }) => {
  return (
    <Box 
      component="form" 
      onSubmit={action} 
      method={method.toLowerCase()} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        padding: '16px',
        width: '100%', 
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {inputs.map((input, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            id={input.name}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
            style={{
              ...inputStyles,
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#2E2E54',
              color: '#FFFFFF',
              fontSize: '16px',
              outline: 'none',
            }}
          />
        </Box>
      ))}

      <Button 
        variant="contained" 
        type="submit" 
        sx={{ 
          backgroundColor: '#A66FD9', 
          color: '#FFFFFF', 
          padding: '16px 32px', // Aumente o padding para deixar o botão maior
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px', // Aumente o tamanho da fonte se necessário
          width: '100%', // Para que o botão ocupe toda a largura disponível
        }}
      >
        {buttonName}
      </Button>
    </Box>
  );
};
