import React from 'react';

// Este componente usa as classes de estilo .glitch-section e .glitch
// que já estão no seu arquivo 'src/styles/main.css' (T03).

export default function SenacGlitch() {
  return (
    <section id="senac" className="glitch-section">
      <div id="wrapper">
        {/* Usamos data-text para o efeito funcionar */}
        <h1 className="glitch" data-text="TURMA 31">TURMA 31</h1>
      </div>
    </section>
  );
}