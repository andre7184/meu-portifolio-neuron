import React from 'react';
import { CONTACT } from '../data/portfolioData'; // T12

export default function Contato() {
  return (
    <section id="contato" style={{ minHeight: '50vh', backgroundColor: '#0A0A0A' }}>
      <div className="content-container">
        <h1 className="section-title">CONTATO</h1>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '2rem' }}>
          {/* (Links de Contato da T12) */}
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${CONTACT.email}`}>Email</a>
        </div>
      </div>
    </section>
  );
}