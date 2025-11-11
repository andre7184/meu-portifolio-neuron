import React, { useState, useRef, useEffect } from 'react';
import NeuralGlobe from './NeuralGlobe'; // T14 (Animação)
import Typewriter from './Typewriter';   // T13 (Digitação)
import { AI_CONFIG } from '../../data/portfolioData'; // T12 (Dados)

// T28: Função de fetch (movida para fora para clareza)
async function fetchGreetingData(controller) {
  try {
    const response = await fetch(AI_CONFIG.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Falha no N8N');
    const data = await response.json();
    if (!data.aiMessage || !data.audioData) throw new Error('JSON mal formatado');
    return data; // Retorna { aiMessage, audioData }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("Erro no fetch N8N (T28):", error);
    }
    // Retorna o fallback se o N8N falhar
    return { 
      aiMessage: AI_CONFIG.FALLBACK_MESSAGE, 
      audioData: null 
    };
  }
}

export default function AIInteraction() {
  
  // T28: Estado para armazenar os dados pré-buscados
  const [fetchedData, setFetchedData] = useState(null);
  
  // T28: Controla o estado de carregamento do fetch inicial
  // (Usado para desativar o botão)
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // T29: Controla se a IA foi ativada pelo clique (mostra o diálogo)
  const [isIaActive, setIsIaActive] = useState(false);
  
  // T14/T29: Controla a animação do globo e o botão "Parar Áudio"
  const [isPlaying, setIsPlaying] = useState(false);
  
  // T13: Mensagem do Typewriter (começa vazia)
  const [robotMessage, setRobotMessage] = useState(""); 
  
  const audioRef = useRef(null); 
  const fetchControllerRef = useRef(null); 

  // T28: Requisição automática (silenciosa)
  useEffect(() => {
    fetchControllerRef.current = new AbortController();
    
    // 1. Busca os dados
    fetchGreetingData(fetchControllerRef.current)
      .then(data => {
        // T28: Dados recebidos e armazenados!
        setFetchedData(data);
        // T28: Libera o botão "Ligar IA"
        setIsDataLoading(false); 
      });

    // Limpa o fetch se o usuário sair
    return () => {
      if (fetchControllerRef.current) fetchControllerRef.current.abort(); 
    };
  }, []); // Array vazio [] = Roda 1 vez na carga

  // T29: Clique do usuário em "Ligar IA"
  const handleLigarIA = () => {
    if (isDataLoading || isPlaying) return; // Segurança

    setIsIaActive(true); // Mostra o diálogo
    setIsPlaying(true); // T14: Ativa a animação do globo
    setRobotMessage(fetchedData.aiMessage); // T13: Inicia o Typewriter
    
    // T29: Toca o áudio
    if (fetchedData.audioData && audioRef.current) {
      const audioSrc = "data:audio/mpeg;base64," + fetchedData.audioData;
      audioRef.current.src = audioSrc;
      audioRef.current.play(); // Permitido pelo clique
    }
  };

  // T29: Botão "Parar Áudio"
  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false); // Esconde o botão e para a animação
  };

  // T31: Placeholder
  const handleFutureInteract = () => {
    alert("O chatbot (T31) será implementado aqui.");
  };

  // T29: Quando o áudio (T26) terminar
  const onAudioEnded = () => {
    setIsPlaying(false); // Para a animação do globo
  };

  // --- Renderização ---
  return (
    // O container inline (globo + diálogo)
    <div style={styles.inlineContainer} className="inlineContainer"> 
      
      {/* T14: O globo está SEMPRE visível.
          A animação (isProcessing) é controlada pelo 'isPlaying' */}
      <div style={styles.globeWrapper}>
        <NeuralGlobe isProcessing={isPlaying} />
      </div>

      {/* T29: O diálogo SÓ aparece DEPOIS do clique em "Ligar IA" */}
      {isIaActive ? (
        // --- DIÁLOGO ATIVO ---
        <div style={styles.dialogBox} className="dialogBox">
          <div style={styles.messageArea}>
            <Typewriter key={robotMessage} text={robotMessage} />
          </div>
          <div style={styles.buttonContainer}>
            
            {/* T31: Botão de Interação Futura */}
            <button 
              onClick={handleFutureInteract} 
              style={styles.interactButton}
              disabled={isPlaying} // Desabilita o chat enquanto o áudio fala
            >
              Interagir
            </button>

            {/* T29: Botão "Parar Áudio" (só aparece se o áudio estiver tocando) */}
            {isPlaying && (
              <button onClick={handleStopAudio} style={styles.stopButton}>
                Parar Áudio
              </button>
            )}
          </div>
        </div>
      ) : (
        // --- ESTADO INICIAL (IA DESLIGADA) ---
        <div style={styles.dialogBox} className="dialogBox">
          <div style={styles.messageArea}>
            {/* T28: Mensagem de carregamento ou "Pronto" */}
            {isDataLoading ? "Inicializando conexão com N8N..." : "IA pronta."}
          </div>
          <div style={styles.buttonContainer}>
            <button 
              onClick={handleLigarIA} 
              style={styles.interactButton}
              // T28: Desativado até os dados chegarem
              disabled={isDataLoading} 
            >
              {isDataLoading ? 'Carregando...' : 'Ligar IA'}
            </button>
          </div>
        </div>
      )}
      
      {/* T29: Player de áudio (sempre no DOM, mas invisível) */}
      <audio 
        ref={audioRef} 
        style={{ display: 'none' }} 
        onEnded={onAudioEnded} 
      />
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
    gap: '1rem', 
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