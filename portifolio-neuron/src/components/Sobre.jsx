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
            Desenvolvedor Fullstack e Arquiteto de Sistemas com sólida experiência em todo o ciclo de vida de software. Do ERP legado a microserviços modernos, domino o ecossistema Java (Spring Boot), a agilidade do Go e a versatilidade do Python. Unindo minha base em infraestrutura Cloud (AWS/Docker) com a paixão por Inteligência Artificial, busco desenvolver aplicações que não apenas funcionem, mas que escalem com segurança e eficiência. Premiado pelo Cisco Networking Academy, sigo comprometido com a excelência técnica e a inovação contínua.
          </div>
        </div>
      </div>
    </section>
  );
}