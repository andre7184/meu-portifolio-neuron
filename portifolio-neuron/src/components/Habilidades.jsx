import React from 'react';

// Vamos reutilizar o estilo .notification que você gosta
const skills = {
    linguagens: ['Java', 'Python', 'JavaScript (ES6+)', 'TypeScript'],
    backend: ['Spring Boot', 'N8N', 'Node.js', 'APIs RESTful', 'SQL (MySQL/PostgreSQL)'],
    frontend: ['React', 'HTML5', 'CSS3 (Flexbox/Grid)', 'TailwindCSS'],
    devops: ['Docker', 'Git', 'CI/CD (GitLab)', 'Linux']
};

export default function Habilidades() {
  return (
    <section id="habilidades" style={{ minHeight: 'auto', backgroundColor: '#151515' }}>
      <div className="content-container">
        <h1 className="section-title">Habilidades & Conhecimentos</h1>
        
        {/* Reutilizando o card .notification (do main.css) */}
        <div className="notification">
          <div className="notititle">Tecnologias Principais</div>
          <div className="notibody" style={styles.skillGrid}>
            
            {/* Mapeando as categorias de habilidades */}
            {Object.entries(skills).map(([category, list]) => (
              <div key={category}>
                <h3 style={styles.skillCategory}>{category.toUpperCase()}</h3>
                <ul style={styles.skillList}>
                  {list.map((skill) => (
                    <li key={skill} style={styles.skillItem}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  skillGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  skillCategory: {
    color: '#4377ef',
    fontFamily: '"Audiowide", sans-serif',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    borderBottom: '1px solid #4377ef',
    paddingBottom: '5px',
  },
  skillList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  skillItem: {
    color: '#ccc',
    fontSize: '1rem',
    marginBottom: '5px',
  }
};