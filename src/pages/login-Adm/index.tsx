import React, { useState } from 'react';
import { FormGenerate } from "../../Components/form-generate";
import { Box, Typography } from '@mui/material';

export const LoginAdm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      setSuccessMessage('Login efetuado com sucesso!');
    } catch (error) {
      setErrorMessage('Erro ao efetuar o login, tente novamente.');
      console.error('Erro ao efetuar login:', error);
    }
  };

  const formInputs = [
    { name: 'email', type: 'email', placeholder: 'E-mail', value: formData.email, onChange: handleChange },
    { name: 'password', type: 'password', placeholder: 'Senha', value: formData.password, onChange: handleChange },
  ];

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#252746'
        }}
      >
        <div>
          <img src="/assets/nixPurple.svg" alt="cabeça nix" />
        </div>
        <div style={{ alignItems: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
           Nix admin
          </Typography>
        </div>
        <hr style={{ width: '37%' }} />
        <FormGenerate 
          inputs={formInputs} 
          action={handleSubmit} 
          method="POST"
          buttonName="Entrar"
        />
        {errorMessage && (
          <Typography variant="body2" style={{ color: 'red', marginTop: '16px' }}>{errorMessage}</Typography>
        )}
        {successMessage && (
          <Typography variant="body2" style={{ color: 'green', marginTop: '16px' }}>{successMessage}</Typography>
        )}
      </Box>
    </>
  );
};

export default LoginAdm;
