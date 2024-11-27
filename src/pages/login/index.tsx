import React, { useState } from 'react';
import { FormGenerate } from "../../Components/form-generate";
import { NavBarButton } from "../../Components/nav-bar-button";
import { Box } from '@mui/material';
import { loginEstudante } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import './index.css';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    try {
      const response = await loginEstudante(formData.email, formData.password);
      
      if (response?.token) {
        localStorage.setItem('token', response.token);
        navigate('/playground');
      } else {
        setErrorMessage('Erro inesperado: token não recebido.');
      }
    } catch (error) {
      setErrorMessage('Credenciais inválidas. Tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  const formInputs = [
    { name: 'email', type: 'email', placeholder: 'E-mail', value: formData.email, onChange: handleChange },
    { name: 'password', type: 'password', placeholder: 'Senha', value: formData.password, onChange: handleChange },
  ];

  return (
    <>
      <NavBarButton buttonName="Cadastrar" navigateTo="/cadastro"/>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div>
          <img src="/assets/nixPurple.svg" alt="cabeça nix" />
        </div>
        <div style={{ alignItems: 'center'}}>
          <h3 style={{fontSize: '40px'}}>
            Entrar
          </h3>
        </div>
        <div>
          <p style={{fontSize: '18px', color: '#9fa0b9'}}>Se você já é cadastrado, pode fazer login com seu <br/> endereço de e-mail e senha.</p>
        </div>
        <hr style={{width: '25%'}}/>
        <FormGenerate 
          inputs={formInputs} 
          action={handleSubmit} 
          method="POST"
          buttonName="Entrar" 
        />
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '16px' }}>{errorMessage}</p>
        )}
      </Box>
    </>
  );
};
