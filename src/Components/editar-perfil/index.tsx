import React, { useState, useEffect } from 'react';
import { Box, Avatar, Card } from '@mui/material';
import { atualizarperfil } from "../../services/alterarService";
import { FormGenerate } from "../form-generate";
import { usuarioLogado } from '../../services/userService'; 

const ProfileCardEditar = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [userId, setUserId] = useState<string>('');  // Estado para armazenar o ID do usuário
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Carregar os dados do usuário logado
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioData = await usuarioLogado();  // Chama o serviço para buscar os dados do usuário logado
        setUserId(usuarioData.id);  // Armazena o ID do usuário
        setFormData({
          nome: usuarioData.name || '',
          email: usuarioData.email || '',
          password: '',  // Deixa a senha vazia inicialmente
          confirmPassword: '' // Deixa a confirmação de senha vazia
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
        await atualizarperfil(userId, {
          nome: formData.nome,
          email: formData.email,
          password: formData.password,
        });

        setSuccessMessage('Usuário alterado com sucesso!');
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
            src="/static/images/avatar.png"
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
          {successMessage && (
            <p style={{ color: 'green', marginTop: '16px' }}>{successMessage}</p>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileCardEditar;
