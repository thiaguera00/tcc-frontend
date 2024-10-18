import { FormGenerate } from "../../Components/form-generate";
import { NavBarButton } from "../../Components/nav-bar-button";
import { Box } from '@mui/material';
import './index.css';

export const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulário enviado!');
  };

  const formInputs = [
    { name: 'email', type: 'email', placeholder: 'E-mail'},
    { name: 'password', type: 'password', placeholder: 'Senha'},
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
    </Box>
    </>
  );
};
