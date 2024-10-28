import { useState } from 'react';
import { Box } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';

export const AtividadesPage = () => {
  const [etapa, setEtapa] = useState<number>(1);

  const handleNextStep = () => {
    setEtapa((prev) => prev + 1);
  };

  return (
    <>
      <NavBarPerfil />
      {/* Card da Fase */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '80px', 
        }}
      >
        <CardFase
          fase="FASE 1"
          descricao="Introdução à Lógica de Programação"
          corFundo="#9ade5b"
          caminho="#"
        />
      </Box>

      {/* Conteúdo da Atividade */}
      <Box
        sx={{
          padding: '40px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: '40px', 
        }}
      >
        {etapa === 1 && <QuestionarioComponent onFinish={handleNextStep} />}
        {etapa === 2 && <IDEComponent onFinish={handleNextStep} />}
        {etapa === 3 && <QuestionarioComponent onFinish={handleNextStep} />}
      </Box>
    </>
  );
};
