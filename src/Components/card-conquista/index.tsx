import { Box, Card, CardContent, Typography } from '@mui/material';
import cerebro from "../../assets/cerebro.svg";
import variavel from "../../assets/variavel.svg";
import decisao from "../../assets/decisao.svg";
import estrutura from "../../assets/estrutura.svg";
import projetofinal from "../../assets/projetofinal.svg";

const Conquistas = () => {
  const conquistas = [
    { icon: <img src={cerebro} alt="Cérebro" style={{ width: '60px', height: '70px' }} />, texto: 'VOCÊ JÁ PENSA COMO UM PROGRAMADOR!' },
    { icon: <img src={variavel} alt="variavel" style={{ width: '60px', height: '70px' }} />, texto: 'VARIÁVEIS E TIPOS DE DADOS? FÁCIL PARA VOCÊ!' },
    { icon: <img src={decisao} alt="decisao" style={{ width: '60px', height: '70px' }} />, texto: 'DECISÕES INTELIGENTES NO CÓDIGO, ÓTIMO TRABALHO!' },
    { icon: <img src={estrutura} alt="estrutura" style={{ width: '60px', height: '70px' }} />, texto: 'ESTRUTURAS LÓGICAS? FEITAS COM SUCESSO!' },
    { icon: <img src={projetofinal} alt="projetofinal" style={{ width: '60px', height: '70px' }} />, texto: 'VOCÊ CHEGOU AO GRANDE DESAFIO FINAL!' }
  ];

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      gap={2} 
      padding={5} 
      bgcolor="#3F4273" 
      borderRadius={2}
      color="white"
      height={"740px"}
      marginTop={"10px"}  
      width={"30%"}  
      marginLeft={"35%"} 
      border={2}            
      borderColor="#A66FD9"
    >
      {conquistas.map((conquista, index) => (
        <Card 
          key={index} 
          sx={{ 
            width: '100%', 
            maxWidth: '500px',
            height:'500px', 
            backgroundColor: '#3F4273', 
            color: 'white',
            border: 1,
            borderColor: '#A66FD9',
            paddingTop: '10px', 
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {conquista.icon}
            <Typography variant="body1">{conquista.texto}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Conquistas;
