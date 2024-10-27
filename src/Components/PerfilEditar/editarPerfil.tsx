import React, { useState } from 'react';
import { Box, Avatar, Typography, Card } from '@mui/material';
import { atualizarperfil } from "../../services/alterarService";
import { FormGenerate } from "../../Components/form-generate";


// import { useNavigate } from 'react-router-dom';

const ProfileCardEditar = () => {
  // const navigate = useNavigate();

  // Aqui você precisa obter o ID do usuário que será atualizado
  // Isso pode vir de um contexto, roteamento, estado global, etc.
  const userId = "123"; // Exemplo: esse valor deve ser dinâmico na prática

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    try {
      // Aqui você passa o ID do usuário e os dados do perfil a serem alterados
      const response = await atualizarperfil(userId, {
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
      });

      console.log('Usuário alterado com sucesso:', response);

      setSuccessMessage('Usuário alterado com sucesso! Redirecionando...');
      // Aqui você pode adicionar um redirecionamento, por exemplo:
      // navigate('/login');

    } catch (error) {
      setErrorMessage('Erro ao alterar o perfil do usuário, tente novamente.');
      console.error('Erro ao alterar perfil:', error);
    }
  };



  const formInputs = [
    { name: 'nome', type: 'text', placeholder: 'Nome', value: formData.nome, onChange: handleChange},
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
        width: '100%', // Garanta que o box ocupe toda a largura
        padding: 2,    // Adicione padding
      }}
    >
      <Card 
        sx={{ 
          width:450, 
          padding: 9, 
          borderRadius: '16px', 
          backgroundColor: '#3F4273',
          position: 'relative', // Ajuste o posicionamento relativo para o botão "Editar"
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        
        {/* Avatar e nome */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="Carlos Silva Souza"
            src="/static/images/avatar.png" // Substitua com o caminho do avatar
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
        </Box>

        {/* Linha divisória */}   
        <Box sx={{ marginTop: 2, marginBottom: 1, borderBottom: '1px solid #343661' }}>
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
          </Typography>
        </Box>

        <Box>
         <FormGenerate 
          inputs={formInputs} 
          action={handleSubmit} 
          method="POST"
          buttonName="Salvar"
          inputStyles={{
           
          }}
          />
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '16px', marginLeft: '' }}>{errorMessage}</p>
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
   