import { useState } from 'react';
import { Box } from '@mui/material';
import NavBarPerfil from '../../Components/nav-bar-perfil';
import { QuestionarioComponent } from '../../Components/questionario';
import { IDEComponent } from '../../Components/ide';
import { CardFase } from '../../Components/card-fase';
import { useLocation, useNavigate } from 'react-router-dom';

export const AtividadesPage = () => {
  const location = useLocation();
  const { fase, descricao } = location.state || {};
  const [etapa, setEtapa] = useState<number>(1);
  const navigate = useNavigate();
console.log("fase:",fase, "etapa: ", etapa)
  const handleNextStep = () => {
    if (fase === 'FASE 1' && etapa < 3) {
      setEtapa((prev) => prev + 1);
    } else if (fase !== 'FASE 1' && etapa < 3) {
      setEtapa((prev) => prev + 1);
    } else {
      alert('Você completou a fase! Parabéns!');
      navigate('/paginaInicial');
    }
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
          fase={fase || "FASE"}
          descricao={descricao || "Descrição da Fase"}
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
        {fase === 'FASE 1' && (

          <>
            {etapa === 1 && <QuestionarioComponent onFinish={handleNextStep} />}
            {etapa === 2 && <QuestionarioComponent onFinish={handleNextStep} />}
            {etapa === 3 && <QuestionarioComponent onFinish={handleNextStep} />}
          </>
        )}
        {fase !== 'FASE 1' && (

          <>
            {etapa === 1 && <QuestionarioComponent onFinish={handleNextStep} />}
            {etapa === 2 && <IDEComponent onFinish={handleNextStep} />}
            {etapa === 3 && <QuestionarioComponent onFinish={handleNextStep} />}
          </>
        )}
      </Box>
    </>
  );
};
