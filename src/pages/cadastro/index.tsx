import React, { useState } from 'react';
import { FormGenerate } from "../../Components/form-generate";
import { NavBarButton } from "../../Components/nav-bar-button";
import { Box } from '@mui/material';
import { registrarEstudante } from "../../services/userService";
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate

export const Cadastro = () => {
  const navigate = useNavigate(); // Hook do react-router-dom para navegar para outras páginas
  
  // Estados para armazenar valores dos inputs do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Estado para exibir mensagem de erro ou sucesso
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
    setErrorMessage(null); // Limpar mensagens de erro ao enviar
    setSuccessMessage(null); // Limpar mensagens de sucesso ao enviar

    // Validação básica para conferir se as senhas batem
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    try {
      // Chamada ao serviço para registrar o usuário
      const response = await registrarEstudante(formData.nome, formData.email, formData.password);
      console.log('Usuário registrado com sucesso:', response);
      
      // Definindo a mensagem de sucesso e redirecionando para a página de login
      setSuccessMessage('Usuário registrado com sucesso! Redirecionando para a página de login...');
      
      setTimeout(() => {
        navigate('/login'); // Redireciona o usuário para a página de login após 3 segundos
      }, 3000);

    } catch (error) {
      setErrorMessage('Erro ao registrar o estudante, tente novamente.');
      console.error('Erro ao registrar estudante:', error);
    }
  };

  const formInputs = [
    { name: 'nome', type: 'text', placeholder: 'Nome', value: formData.nome, onChange: handleChange },
    { name: 'email', type: 'email', placeholder: 'E-mail', value: formData.email, onChange: handleChange },
    { name: 'password', type: 'password', placeholder: 'Senha', value: formData.password, onChange: handleChange },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirme sua senha', value: formData.confirmPassword, onChange: handleChange },
  ];

  return (
    <>
    <NavBarButton buttonName="Entrar" navigateTo="/login" />
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
      <div style={{ alignItems: 'center' }}>
        <h3 style={{ fontSize: '40px' }}>
          Crie o seu perfil
        </h3>
      </div>
      <div>
        <p style={{ fontSize: '18px', color: '#9fa0b9' }}>Cadastre-se para aprender de forma personalizada com Inteligência Artificial.</p>
      </div>
      <hr style={{ width: '37%' }} />
      <FormGenerate 
        inputs={formInputs} 
        action={handleSubmit} 
        method="POST"
        buttonName="Cadastrar"
      />
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '16px' }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: 'green', marginTop: '16px' }}>{successMessage}</p>
      )}
    </Box>
    </>
  );
};
