import { FormGenerate } from "../../Components/form-generate";
import { NavBarButton } from "../../Components/nav-bar-button";
import { Box } from '@mui/material';
import './index.css';

export const Cadastro = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulário enviado!');
  };

  const formInputs = [
    { name: 'nome', type: 'text', placeholder: 'Nome'},
    { name: 'email', type: 'email', placeholder: 'E-mail'},
    { name: 'password', type: 'password', placeholder: 'Senha'},
    { name: 'password', type: 'password', placeholder: 'Confirme sua senha' },
  ];

  return (
    <>
    <NavBarButton buttonName="Entrar" navigateTo="/login"/>
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
          Crie o seu perfil
        </h3>
      </div>
        <div>
          <p style={{fontSize: '18px', color: '#9fa0b9'}}>Cadastre-se para aprender de forma personalizada com <br />Inteligência Artificial.</p>
        </div>
        <hr style={{width: '25%'}}/>
      <FormGenerate 
        inputs={formInputs} 
        action={handleSubmit} 
        method="POST"
        buttonName="Cadastrar" 
      />
    </Box>
    </>
  );
};
