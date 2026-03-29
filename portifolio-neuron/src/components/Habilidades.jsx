import React from 'react';
import { PROJECTS, SKILLS } from '../data/portfolioData';
import * as SiIcons from 'react-icons/si'; 
import * as FaIcons from 'react-icons/fa';

export default function Habilidades({ setFiltro }) {
  
  // Função para renderizar o ícone dinamicamente a partir da string do banco/data
  const renderIcon = (iconName, color) => {
    const IconComponent = SiIcons[iconName] || FaIcons[iconName];
    return IconComponent ? <IconComponent color={color} /> : null;
  };

  const hasRelatedProjects = (skillName) => {
    return PROJECTS.some(proj => 
      proj.tags.some(tag => tag.toLowerCase().includes(skillName.toLowerCase()))
    );
  };

  const handleFilter = (skillName) => {
    setFiltro(skillName);
    const section = document.getElementById('projetos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="habilidades" style={styles.section}>
      <div className="content-container">
        <h1 className="section-title">Habilidades & Conhecimentos</h1>
        <div className="notification">
          <div className="notibody" style={styles.skillGrid}>
            
            {Object.entries(SKILLS).map(([category, list]) => (
              <div key={category}>
                <h3 style={styles.skillCategory}>
                  {category.replace('_', ' & ').toUpperCase()}
                </h3>
                <ul style={styles.skillList}>
                  {list.map((skill) => (
                    <li key={skill.name} style={styles.skillItem}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={styles.iconSpan}>
                          {renderIcon(skill.icon, skill.color)}
                        </span>
                        {skill.name}
                      </div>

                      {hasRelatedProjects(skill.name) && (
                        <button 
                          onClick={() => handleFilter(skill.name)}
                          className="btn-skill-filter"
                        >
                          Projetos
                        </button>
                      )}
                    </li>
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
  section: { backgroundColor: '#151515', padding: '4rem 0' },
  skillGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' },
  skillCategory: { color: '#4377ef', fontFamily: '"Audiowide", sans-serif', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(67, 119, 239, 0.3)', paddingBottom: '5px' },
  skillList: { listStyle: 'none', padding: 0 },
  skillItem: { color: '#ccc', fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  iconSpan: { marginRight: '10px', display: 'inline-flex', fontSize: '1.2rem' }
};