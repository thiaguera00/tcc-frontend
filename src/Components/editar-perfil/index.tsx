import React, { useState, useEffect } from 'react';
import { Box, Avatar, Card } from '@mui/material';
import { FormGenerate } from "../form-generate";
import { usuarioLogado, atualizarUsuario } from '../../services/userService'; 
import SuccessSnackbar from '../../Components/componenteSave/index';
import perfilPadrao from '../../assets/usuario-de-perfil.png'; 

const ProfileCardEditar = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [userId, setUserId] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); 

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioData = await usuarioLogado();  
        setUserId(usuarioData.id);  
        setFormData({
          nome: usuarioData.name || '',
          email: usuarioData.email || '',
          password: '',  
          confirmPassword: '' 
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário', error);
        setErrorMessage('Erro ao carregar dados do usuário');
      }
    };

    fetchUsuario();
  }, []); 

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

    try {
      if (userId) {
        const payload: { name?: string; email?: string; password?: string } = {
          name: formData.nome,
          email: formData.email,
        };

        if (formData.password) {
          payload.password = formData.password;  
        }
        
        await atualizarUsuario(userId, payload);  

        setSuccessMessage('Usuário alterado com sucesso!');
        setSnackbarOpen(true);
      } else {
        setErrorMessage('Erro: Não foi possível encontrar o ID do usuário.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`Erro ao alterar o perfil: ${error.message}`);
      } else {
        setErrorMessage('Erro desconhecido. Tente novamente.');
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  const formInputs = [
    { name: 'nome', type: 'text', placeholder: 'Nome', value: formData.nome, onChange: handleChange },
    { name: 'email', type: 'email', placeholder: 'E-mail', value: formData.email, onChange: handleChange },
    { name: 'password', type: 'password', placeholder: 'Senha', value: formData.password, onChange: handleChange },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirme sua senha', value: formData.confirmPassword, onChange: handleChange },
  ];

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 2,
      }}
    >
      <Card 
        sx={{ 
          width: 450, 
          padding: 9, 
          borderRadius: '16px', 
          backgroundColor: '#3F4273',
          position: 'relative', 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="Carlos Silva Souza"
            src={perfilPadrao}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
        </Box>

        <Box sx={{ marginTop: 2, marginBottom: 1, borderBottom: '1px solid #343661' }}></Box>

        <Box>
          <FormGenerate 
            inputs={formInputs} 
            action={handleSubmit} 
            method="POST"
            buttonName="Salvar"
          />
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '16px' }}>{errorMessage}</p>
          )}
        </Box>
      </Card>

      {/* Usa o componente reutilizável para mensagens de sucesso */}
      <SuccessSnackbar
        open={snackbarOpen}
        message={successMessage || ''}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default ProfileCardEditar;
