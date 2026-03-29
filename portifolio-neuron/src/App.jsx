import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sobre from './components/Sobre';
import Habilidades from './components/Habilidades';
import Projetos from './components/Projetos';
import Contato from './components/Contato';
import './styles/main.css';

function App() {
  // Estado para armazenar a tag selecionada nas Habilidades
  const [filtro, setFiltro] = useState(null);

  return (
    <div className="App">
      <Header />
      <main>
        <Sobre />
        {/* Passamos a função setFiltro para as habilidades */}
        <Habilidades setFiltro={setFiltro} />
        
        {/* Passamos o filtro atual e a função para limpar para os projetos */}
        <Projetos filtro={filtro} setFiltro={setFiltro} />
        
        <Contato />
      </main>
    </div>
  );
}

export default App;