import React from 'react';
import { PROJECTS } from '../data/portfolioData'; // T15

export default function Projetos() {
  
  // 1. Duplicamos a lista para o loop infinito (necessário para o CSS)
  const duplicatedProjects = [...PROJECTS, ...PROJECTS];

  return (
    <section id="projetos" style={{ minHeight: 'auto' }}>
      <h1 className="section-title">PROJETOS</h1>
      
      {/* 2. O Wrapper (do main.css) */}
      <div className="project-carousel-wrapper">
        
        {/* 3. O Container (que o main.css anima) */}
        <div className="project-carousel-container">
          
          {/* Renderiza a lista duplicada */}
          {duplicatedProjects.map((project, index) => (
            <div 
              className="notification project-carousel-card" 
              key={`${project.id}-${index}`} 
            >
              
              <div className="notititle">{project.title}</div>
              
              <div className="notibody">
                {project.shortDescription}
              </div>
              
              <a href={`#${project.anchorId}`} className="project-details-link">
                Ver Detalhes
              </a>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}