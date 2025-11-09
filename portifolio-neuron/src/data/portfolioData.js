/*
 * ===============================================
 * ARQUIVO DE DADOS CENTRALIZADO DO PORTIFOLIO-NEURON
 * ===============================================
 */

// 1. CONFIGURAÇÃO DA IA E AUTOMAÇÃO (Sem alteração)
export const AI_CONFIG = {
    N8N_WEBHOOK_URL: "https://n8n.promptweb.com.br/webhook/fe465265-1bd3-4e19-9391-bcbc8fc053d8",
    KEY_SKILLS: "Java, Spring Boot, Python, DevOps, N8N, e soluções de IA.",
    FALLBACK_MESSAGE: "Olá! Seja bem-vindo ao meu portfólio. Aqui demonstro soluções em Java, Python e automação inteligente."
};

// 2. DADOS DOS PROJETOS (MODIFICADO)
export const PROJECTS = [
    {
        id: 'ia-robot-portfolio',
        // 1. ID da Âncora (para o link do carrossel)
        anchorId: 'detalhe-ia-robot', 
        title: 'Robô de IA para PortfólIO (Este Projeto!)',
        // 2. Descrição Curta (para o carrossel)
        shortDescription: 'Um assistente de IA que usa N8N e Gemini para criar uma saudação personalizada.',
        // 3. Descrição Longa (para a seção de detalhes)
        longDescription: 'Este projeto demonstra a integração de um front-end React com um back-end de automação (N8N) e uma API de IA (Gemini). O robô identifica a geolocalização do visitante para fornecer uma saudação única, mostrando habilidades em automação full-stack.',
        tags: ['React', 'N8N', 'Gemini API', 'Automação', 'SVG'],
        // 4. Links de Saída
        githubLink: 'https://github.com/seu-usuario/portifolio-neuron',
        liveLink: null // (O próprio site)
    },
    {
        id: 'generic-project-1',
        anchorId: 'detalhe-saas',
        title: 'Projeto Full Stack (Ex: SaaS)',
        shortDescription: 'Plataforma full-stack para gerenciamento de X, construída com Java/Spring Boot e React.',
        longDescription: 'Uma descrição muito mais detalhada do projeto SaaS, explicando a arquitetura, os desafios enfrentados e as soluções implementadas utilizando Java e React.',
        tags: ['Java', 'Spring Boot', 'React', 'SaaS'],
        githubLink: 'https://github.com/seu-usuario/projeto-saas',
        liveLink: 'https://meu-saas.com'
    },
    // Adicione mais projetos...
];

// 3. DADOS DE CONTATO (Sem alteração)
export const CONTACT = {
    linkedin: "https://www.linkedin.com/in/andre-m-brandao",
    github: "https://github.com/andre7184",
    email: "amb7184@gmail.com"
};