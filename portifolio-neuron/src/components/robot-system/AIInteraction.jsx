import React, { useState, useRef, useEffect } from 'react';
import NeuralGlobe from './NeuralGlobe'; // T14 (Animação)
import Typewriter from './Typewriter';   // T13 (Digitação)
import { AI_CONFIG } from '../../data/portfolioData'; // T12 (Dados)

export default function AIInteraction() {
  
  const [robotMessage, setRobotMessage] = useState(AI_CONFIG.FALLBACK_MESSAGE);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // T29: Ref para o player de áudio e o controlador de requisição
  const audioRef = useRef(null); 
  const fetchControllerRef = useRef(null); 

  // Limpa a requisição ao desmontar o componente
  useEffect(() => {
    return () => {
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort(); 
      }
    };
  }, []);

  // T28: Lógica de Interação REAL com N8N
  const handleInteract = async () => {
    
    // Cancela qualquer requisição anterior
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsProcessing(true);
    setRobotMessage("Conexão estabelecida. Processando IA no N8N..."); 
    
    fetchControllerRef.current = new AbortController();
    const signal = fetchControllerRef.current.signal;

    try {
      // 1. Chama o Webhook do N8N (T28)
      const response = await fetch(AI_CONFIG.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Falha na resposta do N8N: ${response.status}`);
      }

      const data = await response.json();

      // 2. Recebe e decodifica os dados (T29)
      if (data.aiMessage && data.audioData) {
        setRobotMessage(data.aiMessage);
        
        // T29: Constrói a URI Base64 e toca o áudio
        const audioSrc = "data:audio/mpeg;base64," + data.audioData;
        
        if (audioRef.current) {
          audioRef.current.src = audioSrc;
          audioRef.current.play();
        }
      } else {
        throw new Error('Resposta do N8N está mal formatada ou incompleta.');
      }

    } catch (error) {
      // Trata a falha e mostra a mensagem de fallback
      if (error.name !== 'AbortError') {
        console.error("Erro fatal na integração de IA:", error);
        setRobotMessage(AI_CONFIG.FALLBACK_MESSAGE);
      }
    } finally {
      setIsProcessing(false); 
      fetchControllerRef.current = null;
    }
  };

  // Botão de Parar (Funciona para parar o fetch e o áudio)
  const handleStop = () => {
    if (fetchControllerRef.current) {
      fetchControllerRef.current.abort(); // Cancela o fetch
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsProcessing(false);
    setRobotMessage(AI_CONFIG.FALLBACK_MESSAGE); 
  };

  return (
    <div style={styles.inlineContainer} className="inlineContainer"> 
      
      <div style={styles.globeWrapper}>
        <NeuralGlobe isProcessing={isProcessing} />
      </div>

      <div style={styles.dialogBox} className="dialogBox">
        
        <div style={styles.messageArea}>
          <Typewriter key={robotMessage} text={robotMessage} />
        </div>
        
        <div style={styles.buttonContainer}>
          {!isProcessing ? (
            <button 
              onClick={handleInteract} 
              style={styles.interactButton}
            >
              Interact
            </button>
          ) : (
            <button 
              onClick={handleStop}
              style={styles.stopButton}
            >
              Parar
            </button>
          )}
        </div>
      </div>
      
      {/* T29: O player de áudio invisível */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}

// --- ESTILOS (Sem alteração) ---
const styles = {
  inlineContainer: { 
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '2rem', 
    width: '100%',
    maxWidth: '850px',
    zIndex: 2, 
  },
  globeWrapper: {
    flex: 'none', 
    width: '400px', 
    height: '400px',
    maxWidth: '100%', 
  },
  dialogBox: {
    flex: 'none', 
    width: '450px',
    maxWidth: '100%', 
    padding: '20px',
    backgroundColor: 'rgba(30, 30, 50, 0.7)', 
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    position: 'relative', 
  },
  messageArea: {
    minHeight: '120px',
    fontSize: '16px',
    color: '#E0E0E0', 
    fontFamily: '"Quantico", sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  interactButton: {
    padding: '10px 20px',
    backgroundColor: '#4377ef', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: '"Audiowide", sans-serif',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  stopButton: {
    padding: '10px 20px',
    backgroundColor: '#992c2c', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: '"Audiowide", sans-serif',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};