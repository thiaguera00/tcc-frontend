import { Box, Card, CardContent, Typography } from '@mui/material';
import cerebro from "../../assets/cerebro.svg";
import cobra from "../../assets/cobra.svg";
import variavel from "../../assets/variavel.svg";
import decisao from "../../assets/decisao.svg";
import estrutura from "../../assets/estrutura.svg";
import projetofinal from "../../assets/projetofinal.svg";

const Conquistas = () => {
  const conquistas = [
    { icon: <img src={cerebro} alt="Cérebro" style={{ width: '60px', height: '60px' }} />, texto: 'VOCÊ JÁ PENSA COMO UM PROGRAMADOR!' },
    { icon: <img src={cobra} alt="Cérebro" style={{ width: '60px', height: '60px' }} />, texto: 'PARABÉNS, O UNIVERSO PYTHON TE ESPERA!' },
    { icon: <img src={variavel} alt="Cérebro" style={{ width: '60px', height: '60px' }} />, texto: 'VARIÁVEIS E TIPOS DE DADOS? FÁCIL PARA VOCÊ!' },
    { icon: <img src={decisao} alt="Cérebro" style={{ width: '60px', height: '60px' }} />, texto: 'DECISÕES INTELIGENTES NO CÓDIGO, ÓTIMO TRABALHO!' },
    { icon: <img src={estrutura} alt="Cérebro" style={{ width: '60px', height: '60px' }} />, texto: 'ESTRUTURAS LÓGICAS? FEITAS COM SUCESSO!' },
    { icon: <img src={projetofinal} alt="Cérebro" style={{ width: '60px', height: '60px' }} />, texto: 'VOCÊ CHEGOU AO GRANDE DESAFIO FINAL!' }
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
      height={"580px"}
      marginTop={"150px"}
      width={"20%"}
      marginLeft={"35%"}
      border={2} /* Define a espessura da borda do Box */
      borderColor="#A66FD9" /* Define a cor da borda do Box */
    >
      {conquistas.map((conquista, index) => (
        <Card 
          key={index} 
          sx={{ 
            width: '100%', 
            maxWidth: 400, 
            backgroundColor: '#3F4273', 
            color: 'white',
            border: 1, /* Define a espessura da borda do Card */
            borderColor: '#A66FD9' /* Define a cor da borda do Card */
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
