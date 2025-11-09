import React from 'react';
import './styles/main.css'; 

// Componentes de Layout
import Header from './components/layout/Header'; // T21 (NOVO)

// Seções da Página
import Inicio from './components/Inicio';
import Sobre from './components/Sobre';
import Habilidades from './components/Habilidades'; // T23 (NOVO)
import Projetos from './components/Projetos';
import ProjetoDetalhe from './components/ProjetoDetalhe'; 
import Contato from './components/Contato';

// (O SenacGlitch foi removido como solicitado)

export default function App() {
  return (
    <div className="App">
      
      {/* O Menu Fixo no Topo */}
      <Header /> 
      
      {/* O conteúdo da página */}
      <Inicio /> 
      <Sobre />
      <Habilidades />
      <Projetos />
      <ProjetoDetalhe />
      <Contato />

    </div>
  );
}