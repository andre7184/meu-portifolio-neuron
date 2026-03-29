import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';

// --- COMPONENTE DO POPUP (GALERIA) ---
const PopupGaleria = ({ project, onClose }) => {
  if (!project) return null;

  // Variantes de animação para o Framer Motion
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: "0", 
      opacity: 1,
      transition: { delay: 0.1, type: "spring", stiffness: 120 }
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="backdrop"
        style={styles.backdrop}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose} // Fecha se clicar fora
      >
        <motion.div
          className="modal"
          style={styles.modal}
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} // Impede o fechamento se clicar dentro
        >
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>{project.title} - Prints</h2>
            <button onClick={onClose} style={styles.closeButton}>&times;</button>
          </div>
          
          <div style={styles.modalBody}>
            {project.images && project.images.map((imgUrl, index) => (
              <img 
                key={index} 
                src={imgUrl} 
                alt={`Print ${index + 1} do projeto ${project.title}`} 
                style={styles.projectImage}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- COMPONENTE PRINCIPAL (GRID) ---
export default function Projetos({ filtro, setFiltro }) {
  // Lógica de filtragem: se houver filtro, busca nas tags, se não, mostra os 6 primeiros
  const filteredProjects = filtro 
    ? PROJECTS.filter(proj => proj.tags.some(tag => tag.toLowerCase().includes(filtro.toLowerCase())))
    : PROJECTS.slice(0, 6);

  const mainProjects = PROJECTS.slice(0, 6);
  // Estado para controlar qual projeto está com o popup aberto
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projetos" style={styles.section}>
      <div className="content-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="section-title">
            {filtro ? `PROJETOS: ${filtro.toUpperCase()}` : 'PROJETOS EM DESTAQUE'}
          </h1>
          
          {/* BOTÃO PARA LIMPAR O FILTRO */}
          {filtro && (
            <button onClick={() => setFiltro(null)} style={styles.clearBtn}>
              ✕ Limpar
            </button>
          )}
        </div>
        
        <div style={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="notification" style={styles.miniCard}>
              <div style={styles.header}>
                <div className="notititle" style={styles.miniTitle}>{project.title}</div>
                <div style={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="notibody" style={styles.miniBody}>
                {project.shortDescription}
              </div>

              <div style={styles.buttonGroup}>
                {/* Botão GitHub: Dinâmico */}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={styles.btnAction}>
                    GitHub
                  </a>
                )}

                {/* Botão Demo: Dinâmico */}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" style={{...styles.btnAction, borderColor: '#00ffcc', color: '#00ffcc'}}>
                    Demo
                  </a>
                )}

                {/* Botão Fotos: Dinâmico - Abre o Popup */}
                {project.images && project.images.length > 0 && (
                  <button 
                    onClick={() => setSelectedProject(project)} 
                    style={{...styles.btnAction, borderColor: '#ff00ff', color: '#ff00ff', background: 'none', cursor: 'pointer'}}
                  >
                    Fotos
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.footerContainer}>
          <a href="https://github.com/andre7184" target="_blank" className="project-details-link">
            VER REPOSITÓRIO COMPLETO
          </a>
        </div>
      </div>

      {/* Renderiza o Popup se houver um projeto selecionado */}
      <AnimatePresence>
        {selectedProject && (
          <PopupGaleria 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// --- ESTILOS (Compactos e Popup) ---
const styles = {
  section: { padding: '3rem 0', backgroundColor: '#0d0d0d' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  miniCard: {
    padding: '1rem',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '8px'
  },
  header: { marginBottom: '0.5rem' },
  miniTitle: { fontSize: '1.1rem', color: '#4377ef', paddingBottom: '0.3rem' },
  miniBody: { fontSize: '0.85rem', color: '#bbb', padding: '0', marginBottom: '0.8rem', lineHeight: '1.3' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '4px' },
  tag: { fontSize: '0.6rem', border: '1px solid rgba(67, 119, 239, 0.4)', padding: '1px 5px', borderRadius: '3px', color: '#4377ef' },
  buttonGroup: { display: 'flex', gap: '8px', marginTop: 'auto' },
  btnAction: {
    flex: 1,
    textAlign: 'center',
    fontSize: '0.75rem',
    padding: '5px 0',
    border: '1px solid #4377ef',
    color: '#4377ef',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: '0.3s',
    fontFamily: '"Audiowide", sans-serif'
  },
  footerContainer: { textAlign: 'center', marginTop: '2.5rem' },

  // --- Estilos do Popup (Modal) ---
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)'
  },
  modal: {
    width: '90%',
    maxWidth: '800px',
    maxHeight: '80vh',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #4377ef',
    boxShadow: '0 0 20px rgba(67, 119, 239, 0.4)',
    overflowY: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(67,119,239,0.3)',
    paddingBottom: '10px',
    marginBottom: '15px'
  },
  modalTitle: {
    fontFamily: '"Audiowide", sans-serif',
    color: '#4377ef',
    fontSize: '1.2rem',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#ccc',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    overflowY: 'auto'
  },
  projectImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    border: '1px solid #333'
  },
  clearBtn: {
    background: '#222',
    color: '#4377ef',
    border: '1px solid #4377ef',
    padding: '5px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: '"Quantico", sans-serif'
  }
};