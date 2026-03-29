/*
 * ===============================================
 * ARQUIVO DE DADOS CENTRALIZADO DO PORTIFOLIO-NEURON
 * ===============================================
 */

// 1. DADOS DOS PROJETOS (MODIFICADO)
export const PROJECTS = [
    {
        id: 'sistema-comissoes',
        anchorId: 'detalhe-comissoes',
        title: 'Gestão de Comissões (SaaS)',
        shortDescription: 'Plataforma Multi-Tenant com Spring Boot e React para automação de cálculos e pagamentos.',
        tags: ['Java', 'Spring Boot', 'React', 'JavaScript', 'Typescript', 'Tailwind CSS', 'JWT', 'SaaS', 'Docker', 'PostgreSQL', 'DevOps'],
        demoUrl: 'https://comissoes.neurono.com.br',
        images: ['/projects/sistema-comissoes_001.png', '/projects/sistema-comissoes_002.png', '/projects/sistema-comissoes_003.png']
    },
    {
        id: 'whatsapp-bot-go',
        anchorId: 'detalhe-bot',
        title: 'WhatsApp Bot (Go)',
        shortDescription: 'Bot integrado à WhatsApp Cloud API com processamento via Webhook e IA.',
        tags: ['Go', 'Cloud API', 'Webhooks', 'IA', 'Token JWT', 'Docker', 'DevOps'],
        githubUrl: 'https://github.com/andre7184/whatsapp-bot'
    },
    {
        id: 'app-up-cg',
        anchorId: 'detalhe-appup',
        title: 'App-UP CG (Mobile)',
        shortDescription: 'Aplicativo multiplataforma para mobilidade urbana e integração com APIs SaaS.',
        tags: ['React Native', 'Python', 'Mobile', 'Django', 'Typescript'],
        images: ['/projects/app-up-cg_001.jpg', '/projects/app-up-cg_002.jpg']
    },
    {
        id: 'infra-traefik',
        anchorId: 'detalhe-traefik',
        title: 'Deploy com Traefik',
        shortDescription: 'Infraestrutura automatizada com Docker Compose e certificados SSL automáticos.',
        tags: ['Docker', 'Traefik', 'DevOps', 'SSL', 'Linux'],
        githubUrl: 'https://github.com/andre7184/deploy-com-traefik'
    },
    {
        id: 'neurono-ia',
        anchorId: 'detalhe-neurono',
        title: 'Neurono (Orquestrador IA)',
        shortDescription: 'Plataforma para gerenciamento dinâmico de múltiplos modelos de Inteligência Artificial.',
        tags: ['Python', 'Cloud API', 'Go', 'IA', 'SaaS', 'Linux', 'Docker', 'DevOps'],
        images: ['/projects/neurono-ia_001.jpg', '/projects/neurono-ia_002.jpg', '/projects/neurono-ia_003.jpg', '/projects/neurono-ia_004.jpg', '/projects/neurono-ia_005.jpg']
    },
    {
        id: 'app-flutter-tasks',
        anchorId: 'detalhe-flutter',
        title: 'AppFlutter',
        shortDescription: 'Gerenciamento de tarefas com persistência local e interface responsiva.',
        tags: ['Flutter', 'Dart', 'Mobile', 'SQLite', 'Android', 'iOS', 'API REST'],
        githubUrl: 'https://github.com/andre7184/AppFluter',
        images: ['/projects/app-flutter-tasks_001.jpg', '/projects/app-flutter-tasks_002.jpg', '/projects/app-flutter-tasks_003.jpg']
    },
    {
        id: 'digicoin-django',
        anchorId: 'detalhe-django',
        title: 'DigiCoin (Django)',
        shortDescription: 'Sistema web para controle de moeda virtual, com intuito de promover insentivo de colaboradores para a realização de tarefas.',
        tags: ['Python', 'Django', 'MySQL', 'Docker', 'DevOps', 'Linux', 'API REST', 'Git', 'GitHub', 'Scrum', 'Kanban', 'Html', 'CSS', 'JavaScript'],
        images: ['/projects/digicoin_000.png','/projects/digicoin_001.png', '/projects/digicoin_002.png', '/projects/digicoin_003.png', '/projects/digicoin_004.png', '/projects/digicoin_005.png']
    },
    {
        id: 'docker-cluster',
        anchorId: 'detalhe-docker-cluster',
        title: 'Docker Cluster com Vagrant e Swarm',
        shortDescription: 'Aplicação de teste com ambiente automatizado de cluster Docker Swarm com 4 nós (1 master, 3 workers) usando Vagrant e VirtualBox.',
        tags: ['Php', 'MySQL', 'Nginx', 'Docker', 'Vagrant', 'Cluster', 'Linux', 'Shell', 'Automação', 'DevOps', 'Git', 'GitHub', 'Docker Swarm', 'Docker Compose'],
        githubUrl: 'https://github.com/andre7184/docker-projeto2-cluster-main'
    },
    {
        id: 'sistema-catalago-produtos',
        anchorId: 'detalhe-sistema-catalago-produtos',
        title: 'Sistema Catálogo de Produtos',
        shortDescription: 'Aplicação Node.js com MongoDB para gerenciamento de catálogo de produtos, incluindo API RESTful e interface de administração.',
        longDescription: 'Este projeto implementa um sistema completo de catálogo de produtos utilizando Node.js, Express e MongoDB. A aplicação oferece uma API RESTful para operações CRUD, busca textual e filtros dinâmicos. Os dados são populados automaticamente com um script de seed que insere 10.000 produtos com atributos variados (nome, categoria, preço, memória, processador, etc.). O ambiente é totalmente containerizado com Docker e inclui Mongo Express para visualização dos dados. É um exemplo prático de integração entre backend, banco de dados NoSQL e automação com Docker.',
        tags: ["Node.js", "Express", "MongoDB", "Docker", "API REST", "CRUD", "DevOps", "JavaScript", "Backend", "Mongo Express"
        ],
        githubUrl: "https://github.com/andre7184/sistema-catalago-produtos",
    }
];

// 2. HABILIDADES (MODIFICADO)
export const SKILLS = {
    backend: [
        { name: 'Java', icon: 'FaJava', color: '#ed8b00' },
        { name: 'Go', icon: 'SiGo', color: '#00add8' },
        { name: 'PHP', icon: 'SiPhp', color: '#3776ab' },
        { name: 'Python', icon: 'SiPython', color: '#3776ab' },
        { name: 'Node.js', icon: 'SiNodedotjs', color: '#f7df1e' },
        { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#336791' },
        { name: 'MySQL', icon: 'SiMysql', color: '#336791' },
        { name: 'MongoDB', icon: 'SiMongodb', color: '#336791' },
        { name: 'Django', icon: 'SiDjango', color: '#3776ab' },
        { name: 'Spring Boot', icon: 'SiSpringboot', color: '#6db33f' },
    ],
    frontend: [
        { name: 'JavaScript', icon: 'SiJavascript', color: '#f7df1e' },
        { name: 'TypeScript', icon: 'SiTypescript', color: '#3178c6' },
        { name: 'React', icon: 'SiReact', color: '#61DAFB' },
        { name: 'React Native', icon: 'SiReact', color: '#099453' },
        { name: 'Flutter', icon: 'SiFlutter', color: '#38B2AC' },
        { name: 'CSS', icon: 'SiCss', color: '#38B2AC' },
        { name: 'HTML', icon: 'SiHtml5', color: '#38B2AC' },
        { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#38B2AC' }
    ],
    devops: [
        { name: 'Docker', icon: 'SiDocker', color: '#2496ed' },
        { name: 'Kubernetes', icon: 'SiKubernetes', color: '#2496ed' },
        { name: 'Git', icon: 'FaGitAlt', color: '#f05032' },
        { name: 'GitHub', icon: 'SiGithub', color: '#f05032' },
        { name: 'Linux', icon: 'FaLinux', color: '#ffffff' }
    ]
};

// 3. DADOS DE CONTATO (Sem alteração)
export const CONTACT = {
    linkedin: "https://www.linkedin.com/in/andre-m-brandao",
    github: "https://github.com/andre7184",
    email: "amb7184@gmail.com",
    whatsapp: "5567992020992"
};