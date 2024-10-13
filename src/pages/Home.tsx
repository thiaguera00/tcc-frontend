
import NavBar from '../Components/NixNavBar/Index';
import Formulario from '../Components/NixFormulario/formulario'; // Importando o Formulário
import { Box } from '@mui/material';
import reactLogo from '../assets/teste.svg';
import '../styles/componentsEstyle.css'

export const Home = () => {
    return (
        <div>
            {/* Barra de Navegação */}
            <NavBar />
            
            <div className="container container-md">
                <Box sx={{ display: 'flex', alignItems: 'center'}}> {/* Alinha itens ao topo */}
                    <div id='FormParagrafo'>
                        <h1>Aprenda, Pratique e Evolua com Nix!</h1>
                        <Formulario />
                        
                    </div>
                    
                   
                </Box>
                <img id='img' src={reactLogo} className="logo react" alt="React logo" />
               
               
            </div>
        </div>
    );
};



