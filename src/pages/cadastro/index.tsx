import React, { useState } from 'react';
import { FormGenerate } from "../../Components/form-generate";
import { NavBarButton } from "../../Components/nav-bar-button";
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { registrarEstudante } from "../../services/userService";
import { useNavigate } from 'react-router-dom';
import TermosDeUso from '../../Components/Termo-de-uso/index'; 

export const Cadastro = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); 

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    if (!isTermsAccepted) {
      setErrorMessage('Você precisa aceitar os Termos de Uso para se cadastrar.');
      return;
    }

    try {
      await registrarEstudante(formData.nome, formData.email, formData.password);
      
      setSuccessMessage('Usuário registrado com sucesso! Redirecionando para a página de login...');
      
      setTimeout(() => {
        navigate('/login');
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(event.target.checked); 
    if (event.target.checked) {
      setIsModalOpen(true); 
    }
  };

  const handleCloseTermos = (accepted: boolean) => {
    setIsModalOpen(false); 
    setIsTermsAccepted(accepted); 
  };

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

      <FormControlLabel
        control={<Checkbox checked={isTermsAccepted} onChange={handleCheckboxChange} />}
        label="Aceito os Termos de Uso"
        sx={{ marginTop: '20px' }} 
      />

      {errorMessage && (
        <p style={{
        color: 'white', 
        marginTop: '16px', 
        backgroundColor: '#e74c3c', 
        padding: '10px',
        borderRadius: '5px',
      }}>
      {errorMessage}
      </p>
      )}
      {successMessage && (
        <p style={{
        color: 'white', 
        marginTop: '16px', 
        backgroundColor: '#2ecc71', 
        padding: '10px',
        borderRadius: '5px',
        }}>
        {successMessage}
        </p>
      )}
    </Box>

    {/* Modal para exibir os Termos de Uso */}
    <TermosDeUso 
      open={isModalOpen} 
      onClose={handleCloseTermos} 
    />
    </>
  );
};
