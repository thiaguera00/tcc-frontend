import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#191B33', padding: '20px 0 100px 0', position: 'relative' }}>
      <div id="footerDiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '27.2px' }}>NIX</h1>
        </div>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '27.2px' }}>Acompanhe a gente</h1>
        </div>
        <Link to={'https://discord.gg/pUwuhkPTVD'}> 
          <img src="/assets/Vector.png" alt="Discord" />
        </Link>
      <img 
        src="/NixHead.svg" 
        alt="cabeça nix" 
        style={{ 
          position: 'absolute', 
          right: '100px',
          bottom: '0',
          width: '150px', 
          height: '150px' 
        }}
      />
      </div>

      {/* Imagem da cabeça Nix posicionada na parte inferior direita */}
    </footer>
  );
};
