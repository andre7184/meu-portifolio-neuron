import React from 'react';

export default function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* O Logo (seu nome) aponta para o topo */}
        <a href="#inicio" style={styles.logo}>
          André Brandão
        </a>
        <div style={styles.links}>
          <a href="#inicio" style={styles.link}>Inicio</a>
          <a href="#sobre" style={styles.link}>Sobre Mim</a>
          <a href="#habilidades" style={styles.link}>Habilidades</a>
          <a href="#projetos" style={styles.link}>Projetos</a>
          <a href="#contato" style={styles.link}>Contato</a>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed', // Fica fixo no topo
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(16, 16, 16, 0.8)', // Fundo escuro semi-transparente
    backdropFilter: 'blur(10px)',
    zIndex: 1000, // Garante que fique acima de tudo
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    height: '70px',
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontFamily: '"Audiowide", sans-serif',
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '1rem',
    fontFamily: '"Quantico", sans-serif',
    transition: 'color 0.3s ease',
  },
  // (Adicionaremos um :hover no main.css para responsividade)
};