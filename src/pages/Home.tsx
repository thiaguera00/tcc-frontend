import NavBar from '../Components/nix-nav-bar/Index';
import Formulario from '../Components/nix-formulario'; 
import NixImg from '../assets/nixImgs.svg';
import EditorCode from '../assets/IDE.png';
import NixGrande from '../assets/NixGrande.svg';
import gameficImg from '../assets/gamefic.png';
import pcImg from '../assets/IconePC.png';
import comunidadeImg from '../assets/comunidade.png';
import starImg from '../assets/starImg.png';
import penImg from '../assets/penImg.png';
import integrantes from '../assets/ParticipantesGrupo.png';

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
                    <h1>Aprenda, <br/>Pratique e <br/>Evolua com <br/> <div className='texNix'> NIX!</div></h1>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        <Formulario />
                    </Box>
                </div>
                <img id="img" src={NixImg} className="logo react" alt="NixImg" />
            </div>

            <div id='Editor'>
                <h1>Aprenda Python sem complicação: <br />&nbsp; &nbsp;O ensino que se adapta a você </h1>
                <img id="img" src={EditorCode} className="logo react" alt="Editor Code" />
            </div>

            <div id="aprender">
                <div id="conteudo">
                    <h1>Comece a aprender a <br /> programar agora mesmo<br />no seu computador!</h1>
                </div>
                <img id="imgnix" src={NixGrande} className="NixGrande" alt="Mascote Nix" />
                <button id="btn-aprender">Comece a aprender</button>
            </div>

            <div id="sectionGameficacao">
                <div className="item">
                    <img className="sectionGameficacaoIMG" src={gameficImg} />
                    <h1>Gamificação</h1>
                     <p>Aprenda de forma divertida <br/>e envolvente, com exercícios <br/>interativos que transformam <br/> o estudo em uma experiência <br/>dinâmica.</p>
                </div>

                <div className="item">
                    <img className="sectionGameficacaoIMG" src={pcImg} />
                    <h1>Projetos</h1>
                    <p>Crie projetos interessantes <br /> que podem ser utilizados em seu <br /> portfólio, aplicando o que <br /> você aprendeu de forma <br /> prática e relevante.</p>
                </div>

                <div className="item">
                <img className="sectionGameficacaoIMG" src={comunidadeImg} />
                    <h1>Comunidade</h1>
                    <p>Conecte-se com outros <br /> estudantes no Discord, troque<br /> ideias, tire dúvidas e faça <br/> amizades. Aproveite o apoio de <br />uma rede colaborativa para <br />crescer juntos.</p>
                </div>

                <div className="item">
                 <img className="sectionGameficacaoIMG" src={starImg} />
                    <h1>Conquista</h1>
                    <p>Alcance marcos ao longo da <br />sua jornada de aprendizado, <br />desbloqueando novos <br />conteúdos. Use suas <br />conquistas como motivação <br />para ir ainda mais longe!</p>
                </div>

                <div className="item">
                    <img className="sectionGameficacaoIMG" src={penImg} />
                    <h1>Personalizado</h1>
                    <p>Exercícios que se adaptam ao<br /> seu desenvolvimento, ajustando <br />o nível de dificuldade conforme o <br />seu progresso, para um<br /> aprendizado mais eficiente e <br />focado nas suas necessidades.</p>
                </div>
            </div>

            <div id="about">
                <div className='textAbout'>
                    <h1>Sobre a aplicação</h1>
                        <p>
                            Essa aplicação foi desenvolvida para um TCC e tem como objetivo ensinar lógica de programação utilizando Python de forma personalizada e eficiente. Integrando Inteligência Artificial, a plataforma adapta o conteúdo às necessidades individuais dos alunos, garantindo um aprendizado progressivo. Com gamificação para incentivar o engajamento, a solução é voltada para estudantes de Sistemas de Informação e áreas correlatas, especialmente aqueles cursando disciplinas de Lógica de Programação. A proposta visa facilitar o aprendizado para iniciantes, ajudando-os a superar dificuldades comuns e evoluir de maneira prática e dinâmica.
                        </p>
                </div>

                <div className="image">
                    <img className="integrantes" src={integrantes} />
                </div>

            </div>
        </div>
        <Footer />
        </>
    );
};







