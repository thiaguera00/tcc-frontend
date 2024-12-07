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
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false); // Estado para validação da senha
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null); // Mensagem dinâmica para senha

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(password)) {
      setPasswordValid(true);
      setPasswordMessage("Senha válida!");
    } else {
      setPasswordValid(false);
      setPasswordMessage(
        "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula e um caractere especial."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      validatePassword(value); // Valida a senha em tempo real
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!passwordValid) {
      setErrorMessage('Por favor, insira uma senha válida antes de continuar.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
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
          <h3 style={{ fontSize: '40px' }}>Crie o seu perfil</h3>
        </div>
        <div>
          <p style={{ fontSize: '18px', color: '#9fa0b9' }}>
            Cadastre-se para aprender de forma personalizada com Inteligência Artificial.
          </p>
        </div>
        <hr style={{ width: '37%' }} />

        <FormGenerate inputs={formInputs} action={handleSubmit} method="POST" buttonName="Cadastrar" />

        {passwordMessage && (
          <p style={{ color: passwordValid ? 'green' : 'red', marginTop: '8px' }}>{passwordMessage}</p>
        )}

        <FormControlLabel
          control={<Checkbox checked={isTermsAccepted} onChange={handleCheckboxChange} />}
          label="Aceito os Termos de Uso"
          sx={{ marginTop: '20px' }}
        />

        {errorMessage && (
          <p
            style={{
              color: 'white',
              marginTop: '16px',
              backgroundColor: '#e74c3c',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p
            style={{
              color: 'white',
              marginTop: '16px',
              backgroundColor: '#2ecc71',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {successMessage}
          </p>
        )}
      </Box>

      {/* Modal para exibir os Termos de Uso */}
      <TermosDeUso open={isModalOpen} onClose={handleCloseTermos} />
    </>
  );
};
