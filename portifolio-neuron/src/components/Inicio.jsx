import React from 'react';
import AIInteraction from './robot-system/AIInteraction'; // T15

export default function Inicio() {
  return (
    // Usamos a classe de estilo do main.css (T03)
    <section id="inicio" className="hero-section">
      
      {/* 2. O componente de IA (Globo + Diálogo) */}
      <AIInteraction /> 
     
    </section>
  );
}