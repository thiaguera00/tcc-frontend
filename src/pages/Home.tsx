import NavBar from '../Components/NixNavBar/Index';
import Formulario from '../Components/NixFormulario/formulario'; // Importando o Formulário
import reactLogo from '../assets/teste.svg';
import EditorCode from '../assets/EditorCode.svg';
import NixGrande from '../assets/NixGrande.svg';
import '../styles/componentsEstyle.css';
import { Box } from '@mui/material';
import { Footer } from '../Components/footer';

export const Home = () => {
    return (
        <>
        <div className="main-container">
            <NavBar />
            <div className="content">
                <div className="form-section">
                    <h1>Aprenda, Pratique e Evolua com Nix!</h1>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        <Formulario />
                    </Box>
                </div>
                <img id="img" src={reactLogo} className="logo react" alt="React logo" />
            </div>

            <div id='Editor'>
                <h1>Aprenda Python sem complicação: <br />&nbsp; &nbsp;O ensino que se adapta a você </h1>
                <img id="img" src={EditorCode} className="logo react" alt="React logo" />
            </div>

            <div id="aprender">
                <div id="conteudo">
                    <h1>Comece a aprender a <br /> programar agora mesmo no <br /> seu computador!</h1>
                </div>
                <img id="img" src={NixGrande} className="NixGrande" alt="Mascote Nix" />
                <button id="btn-aprender">Comece a aprender</button>
            </div>
        </div>
        <Footer />
        </>
    );
};







