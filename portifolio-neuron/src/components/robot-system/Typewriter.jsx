import React, { useState, useEffect } from 'react';

// Configurações de velocidade
const TYPING_SPEED = 35; // Velocidade de digitação (em milissegundos)
const PAUSE_DURATION = 500; // Pausa antes de começar a digitar

export default function Typewriter({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reseta o componente se o texto mudar
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]); // Dependência: 'text'

  useEffect(() => {
    // Se não houver texto ou se já terminou de digitar, não faz nada.
    if (!text || currentIndex >= text.length) {
      return;
    }

    // 1. Inicia o processo com um delay (a "pausa")
    const timeout = setTimeout(() => {
      // 2. Adiciona o próximo caractere
      setDisplayedText((prev) => prev + text[currentIndex]);
      // 3. Incrementa o índice
      setCurrentIndex((prev) => prev + 1);
    }, currentIndex === 0 ? PAUSE_DURATION : TYPING_SPEED); 

    // 4. Limpeza: Cancela o timeout se o componente for desmontado
    return () => clearTimeout(timeout);
    
  }, [text, currentIndex]); // Dependência: 'text' e 'currentIndex'

  return (
    // 'pre-wrap' preserva os espaços e quebras de linha que o Gemini/IA enviar
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {displayedText}
      {/* Adiciona um cursor piscando no final se ainda estiver digitando */}
      {currentIndex < text.length && <span style={styles.cursor}>|</span>}
    </span>
  );
}

// Estilos CSS in-line para o cursor. 
// (Vamos adicionar a animação @keyframes no seu arquivo CSS principal)
const styles = {
  cursor: {
    animation: 'blink-caret 0.75s step-end infinite',
  }
};