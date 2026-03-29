import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '../data/portfolioData';

export default function Contato() {
  const contactMethods = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'andre-m-brandao',
      icon: <FaLinkedin color="#0077b5" />,
      url: CONTACT.linkedin
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'andre7184',
      icon: <FaGithub color="#fff" />,
      url: CONTACT.github
    },
    {
      id: 'email',
      label: 'E-mail',
      value: CONTACT.email,
      icon: <FaEnvelope color="#ea4335" />,
      url: `mailto:${CONTACT.email}`
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: 'Conectar agora',
      icon: <FaWhatsapp color="#25d366" />,
      url: `https://wa.me/${CONTACT.whatsapp}` // Adicione seu número aqui
    }
  ];

  return (
    <section id="contato" style={styles.section}>
      <div className="content-container">
        <h1 className="section-title">VAMOS CONECTAR?</h1>
        <p style={styles.subtitle}>
          Estou sempre aberto a novos desafios técnicos e colaborações em projetos inovadores.
        </p>

        <div style={styles.contactGrid}>
          {contactMethods.map((method) => (
            <a 
              key={method.id} 
              href={method.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="notification" // Reutiliza seu estilo de card com brilho
              style={styles.contactCard}
            >
              <div style={styles.iconWrapper}>
                {method.icon}
              </div>
              <div style={styles.textWrapper}>
                <span style={styles.label}>{method.label}</span>
                <span style={styles.value}>{method.value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '5rem 0',
    backgroundColor: '#0A0A0A',
    minHeight: '60vh'
  },
  subtitle: {
    color: '#999',
    marginBottom: '3rem',
    maxWidth: '600px',
    fontSize: '1.1rem',
    lineHeight: '1.5'
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '1100px'
  },
  contactCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '1.5rem',
    textDecoration: 'none',
    minHeight: 'auto', // Sobrescreve o padrão para ficar mais compacto
    width: '100%'
  },
  iconWrapper: {
    fontSize: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  label: {
    fontFamily: '"Audiowide", sans-serif',
    color: '#4377ef',
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  },
  value: {
    color: '#fff',
    fontSize: '1rem',
    marginTop: '4px',
    fontFamily: '"Quantico", sans-serif'
  }
};