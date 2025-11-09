import React from 'react';

export default function Sobre() {
  return (
    // Usamos a classe de estilo do seu main.css
    <section id="sobre" style={{ minHeight: '80vh', backgroundColor: '#151515' }}>
      <div className="content-container">
        <h1 className="section-title">SOBRE MIM</h1>
        <div className="notification">
          <div className="notititle">Minha Filosofia</div>
          <div className="notibody">
            Sou um desenvolvedor focado em criar soluções eficientes e escaláveis. 
            (Você pode atualizar este texto no portfolioData.js)
          </div>
        </div>
      </div>
    </section>
  );
}