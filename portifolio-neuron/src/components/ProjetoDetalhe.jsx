import React from 'react';
import { PROJECTS } from '../data/portfolioData'; // T15

// Esta seção usa as classes .project-detail-item do main.css (T20)
export default function ProjetoDetalhe() {
  return (
    // Usamos um 'section' normal, mas com 'min-height: auto'
    <section id="projetos-detalhe" style={{ minHeight: 'auto', background: '#0A0A0A' }}>
      
      {/* Usamos o container-padrão para centralizar */}
      <div className="content-container">
        {PROJECTS.map((project) => (
          
          // T17: Este 'id' é o âncora para onde o carrossel aponta
          <div id={project.anchorId} key={project.id} className="project-detail-item">
            
            <h2>{project.title}</h2>
            
            <p>{project.longDescription}</p>
            
            <div className="project-links">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  Ver no GitHub
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  Ver Deploy (Ao Vivo)
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}