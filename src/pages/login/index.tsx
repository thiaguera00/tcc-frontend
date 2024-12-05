import React, { useState } from 'react';
import { FormGenerate } from "../../Components/form-generate";
import { NavBarButton } from "../../Components/nav-bar-button";
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import { loginEstudante } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import './index.css';
import Loading from '../../Components/componenteLoading'; 

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setRecoveryEmail('');
    setModalMessage(null);
  };

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
        const payload = JSON.parse(atob(response.token.split('.')[1]));
        console.log('Payload:', payload);
  
        if (payload.deleted_at !== null) {
          setErrorMessage('Usuário inativo. Entre em contato com o suporte.');
          return;
        }
  
        if (payload.role !== 'Estudante') {
          setErrorMessage('Apenas usuários estudantes podem acessar esta área.');
          return;
        }
  
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
  

  const handlePasswordRecovery = async () => {
    setIsLoading(true); 
    setModalMessage(null);

    try {
      const response = await fetch(`http://localhost:3000/users/recovery-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail }),
      });

      if (response.status === 404) {
        setModalMessage("E-mail não encontrado.");
        return;
      }

      if (!response.ok) {
        throw new Error("Erro inesperado no servidor.");
      }

      setModalMessage("E-mail de recuperação enviado com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar e-mail de recuperação:", error);
      setModalMessage("Erro ao enviar o e-mail. Tente novamente.");
    } finally {
      setIsLoading(false); 
    }
  };

  const formInputs = [
    { name: 'email', type: 'email', placeholder: 'E-mail', value: formData.email, onChange: handleChange },
    { name: 'password', type: 'password', placeholder: 'Senha', value: formData.password, onChange: handleChange },
  ];

  return (
    <>
      <NavBarButton buttonName="Cadastrar" navigateTo="/cadastro" />
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
          <h3 style={{ fontSize: '40px' }}>Entrar</h3>
        </div>
        <div>
          <p style={{ fontSize: '18px', color: '#9fa0b9' }}>
            Se você já é cadastrado, pode fazer login com seu <br /> endereço de e-mail e senha.
          </p>
        </div>
        <hr style={{ width: '25%' }} />
        
        <FormGenerate
          inputs={formInputs}
          action={handleSubmit}
          method="POST"
          buttonName="Entrar"
        />
        {errorMessage && <p style={{ color: 'red', marginTop: '16px' }}>{errorMessage}</p>}

        <Button
          onClick={handleModalOpen}
          style={{ 
            marginTop: '16px', 
            textTransform: 'none',
            color: '#ffffff',
            backgroundColor: 'transparent',
          }}
        >
          Esqueci minha senha
        </Button>

        {/* Modal para recuperação de senha */}
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: '285px',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              backgroundColor: '#252746',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Recuperar Senha
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Insira o e-mail cadastrado para receber as instruções de recuperação de senha.
            </Typography>
            <TextField
              sx={{
                borderRadius: '5px',
                backgroundColor: '#343661',
                color: 'white',
                border: 'none',
                marginTop: '40px',
              }}
              fullWidth
              label="E-mail"
              variant="outlined"
              margin="normal"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              InputProps={{
                style: {
                  color: 'white', 
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handlePasswordRecovery}
              sx={{
                mt: 2,
                borderRadius: '5px',
                width: '100%',
                height: '15%',
                marginTop: '20px',
                backgroundColor: '#A66FD9',
              }}
            >
              Enviar
            </Button>

            {isLoading ? (
              <Loading /> 
            ) : (
              modalMessage && (
                <Typography sx={{ mt: 2, color: modalMessage.includes('sucesso') ? 'green' : 'red' }}>
                  {modalMessage}
                </Typography>
              )
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
};
