import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';

// --- COMPONENTE DO POPUP NAVEGÁVEL (Mantenha igual ao anterior) ---
const PopupGaleria = ({ project, onClose }) => {
  if (!project || !project.images || project.images.length === 0) return null;
  const totalImages = project.images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const proximaImagem = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % totalImages); };
  const imagemAnterior = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages); };

  return (
    <AnimatePresence mode="wait">
      <motion.div style={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div style={styles.modal} initial={{ y: "-50px", opacity: 0 }} animate={{ y: "0", opacity: 1 }} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <div>
              <h2 style={styles.modalTitle}>{project.title}</h2>
              <div style={styles.paginationText}>Imagem {currentIndex + 1} de {totalImages}</div>
            </div>
            <button onClick={onClose} style={styles.closeButton}>&times;</button>
          </div>
          <div style={styles.imageContainer}>
            {totalImages > 1 && <button onClick={imagemAnterior} style={{...styles.navButton, left: '10px'}}>&#10094;</button>}
            <motion.img key={currentIndex} src={project.images[currentIndex]} style={styles.projectImage} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} />
            {totalImages > 1 && <button onClick={proximaImagem} style={{...styles.navButton, right: '10px'}}>&#10095;</button>}
          </div>
          {totalImages > 1 && (
            <div style={styles.dotsContainer}>
              {project.images.map((_, index) => (
                <span key={index} onClick={() => setCurrentIndex(index)} style={{...styles.dot, backgroundColor: index === currentIndex ? '#4377ef' : '#555'}} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function Projetos({ filtro, setFiltro }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  const projetosFiltrados = useMemo(() => {
    if (!filtro) return PROJECTS;
    return PROJECTS.filter(proj => proj.tags.some(tag => tag.toLowerCase().includes(filtro.toLowerCase())));
  }, [filtro]);

  const totalPaginas = Math.ceil(projetosFiltrados.length / itensPorPagina);
  const projetosExibidos = projetosFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  useEffect(() => { setPaginaAtual(1); }, [filtro]);

  const irParaTopo = () => {
    const section = document.getElementById('projetos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projetos" style={styles.section}>
      <div className="content-container" style={styles.containerCenter}>
        <div style={styles.headerRow}>
          <h1 className="section-title">{filtro ? `PROJETOS: ${filtro.toUpperCase()}` : 'PROJETOS EM DESTAQUE'}</h1>
          {filtro && <button onClick={() => setFiltro(null)} style={styles.clearBtn}>✕ Limpar</button>}
        </div>
        
        <div style={styles.grid}>
          <AnimatePresence mode="wait">
            {projetosExibidos.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="notification" style={styles.miniCard}>
                
                {/* Parte Superior: Título e Tags */}
                <div style={styles.topContent}>
                  <div className="notititle" style={styles.miniTitle}>{project.title}</div>
                  <div style={styles.tags}>
                    {project.tags.map(tag => <span key={tag} style={styles.tag}>{tag}</span>)}
                  </div>
                </div>

                {/* Parte Inferior: Descrição e Botões COLADOS */}
                <div style={styles.bottomContent}>
                  <div className="notibody" style={styles.miniBody}>{project.shortDescription}</div>
                  <div style={styles.buttonGroup}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={styles.btnAction}>GitHub</a>
                    )}
                    {project.images?.length > 0 && (
                      <button onClick={() => setSelectedProject(project)} style={{...styles.btnAction, borderColor: '#ff00ff', color: '#ff00ff', background: 'none'}}>Fotos</button>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div style={styles.paginationControls}>
            <button disabled={paginaAtual === 1} onClick={() => { setPaginaAtual(p => p - 1); irParaTopo(); }} style={{...styles.pageBtn, opacity: paginaAtual === 1 ? 0.3 : 1}}>Anterior</button>
            <span style={styles.pageInfo}>Página {paginaAtual} de {totalPaginas}</span>
            <button disabled={paginaAtual === totalPaginas} onClick={() => { setPaginaAtual(p => p + 1); irParaTopo(); }} style={{...styles.pageBtn, opacity: paginaAtual === totalPaginas ? 0.3 : 1}}>Próxima</button>
          </div>
        )}

        <div style={styles.footerContainer}>
          <a href="https://github.com/andre7184" target="_blank" rel="noopener noreferrer" className="project-details-link">VER REPOSITÓRIO COMPLETO</a>
        </div>
      </div>
      <AnimatePresence>{selectedProject && <PopupGaleria project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </section>
  );
}

const styles = {
  section: { padding: '4rem 0', backgroundColor: '#0d0d0d', display: 'flex', justifyContent: 'center' },
  containerCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  headerRow: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 350px))', gap: '1.5rem', width: '100%', justifyContent: 'center' },
  
  miniCard: { 
    padding: '1.2rem', 
    minHeight: '260px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', // 👈 Centraliza horizontalmente o conteúdo do card
    justifyContent: 'flex-start', 
    borderRadius: '1rem',
    gap: '0.5rem',
    position: 'relative'
  },

  topContent: { 
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', // 👈 Centraliza o Título e o bloco de Tags
    textAlign: 'center' 
  },

  bottomContent: { 
    display: 'flex', 
    flexDirection: 'column', 
    flexGrow: 1, 
    width: '100%',
    alignItems: 'center', // 👈 Centraliza a descrição
    justifyContent: 'space-between' 
  },
  
  miniTitle: { 
    fontSize: '1.2rem', 
    color: '#4377ef', 
    padding: '0 0 0.5rem 0', 
    textAlign: 'center', // 👈 Força centralização do texto
    fontFamily: '"Audiowide", sans-serif',
    width: '100%'
  },

  miniBody: { 
    fontSize: '0.9rem', 
    color: '#99999d', 
    padding: '0', 
    textAlign: 'center', // 👈 Centraliza o texto da descrição
    lineHeight: '1.4',
    marginBottom: '1rem' 
  },
  
  tags: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '4px', 
    marginBottom: '10px',
    justifyContent: 'center', // 👈 Centraliza as tags horizontalmente
    width: '100%'
  },

  buttonGroup: { 
    display: 'flex', 
    gap: '8px', 
    width: '100%',
    marginTop: 'auto', 
    paddingTop: '0.5rem',
    justifyContent: 'center' // 👈 Centraliza os botões entre si
  },

  btnAction: { 
    flex: 1, 
    maxWidth: '120px', // 👈 Limita a largura para os botões não ficarem gigantescos
    textAlign: 'center', 
    fontSize: '0.75rem', 
    padding: '8px 0', 
    border: '1px solid #4377ef', 
    color: '#4377ef', 
    textDecoration: 'none', 
    borderRadius: '4px', 
    transition: '0.3s', 
    fontFamily: '"Audiowide", sans-serif',
    cursor: 'pointer'
  },
  tag: { fontSize: '0.6rem', border: '1px solid rgba(67, 119, 239, 0.4)', padding: '1px 5px', borderRadius: '3px', color: '#4377ef' },
  clearBtn: { background: '#222', color: '#4377ef', border: '1px solid #4377ef', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' },
  paginationControls: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' },
  pageBtn: { background: 'transparent', border: '1px solid #4377ef', color: '#4377ef', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  pageInfo: { color: '#ccc', fontSize: '0.9rem' },
  footerContainer: { textAlign: 'center', marginTop: '2.5rem' },

  // POPUP
  backdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' },
  modal: { width: '90%', maxWidth: '900px', backgroundColor: '#151515', borderRadius: '12px', padding: '1.2rem', border: '1px solid #4377ef', position: 'relative', overflow: 'hidden' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(67,119,239,0.3)', paddingBottom: '8px', marginBottom: '10px' },
  modalTitle: { fontFamily: '"Audiowide", sans-serif', color: '#4377ef', fontSize: '1.1rem', margin: 0 },
  paginationText: { color: '#aaa', fontSize: '0.8rem' },
  closeButton: { background: 'none', border: 'none', color: '#ccc', fontSize: '2rem', cursor: 'pointer' },
  imageContainer: { position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', maxHeight: '70vh', backgroundColor: '#000', borderRadius: '8px' },
  projectImage: { maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' },
  navButton: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10 },
  dotsContainer: { display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', cursor: 'pointer' }
};