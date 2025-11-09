import React, { useEffect, useRef } from 'react';

export default function NeuralGlobe({ isProcessing }) {
    
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // --- TODO O SEU CÓDIGO DE ANIMAÇÃO VEM AQUI ---
        const svgNS = "http://www.w3.org/2000/svg";

        // --- Configurações ---
        const NUM_NODES = 100;
        const GLOBE_RADIUS = 200;
        const CENTER_X = 250;
        const CENTER_Y = 250;
        const ROTATION_SPEED_X = 0.001;
        const ROTATION_SPEED_Y = 0.0015;
        const CONNECTION_DISTANCE_THRESHOLD = 150;
        const SIGNAL_SPEED = 0.03;
        const LIGHTNING_DURATION = 15;
        const LIGHTNING_LENGTH_MIN = 30;
        const LIGHTNING_LENGTH_MAX = 80;
        const LIGHTNING_SEGMENTS = 3;

        let PULSE_CHANCE = 0.005;
        let SIGNAL_CHANCE = 0.002;
        let LIGHTNING_CHANCE = 0.0005;

        // Cores
        const NODE_COLOR_START = "#ffffff";
        const NODE_COLOR_END = "#a0e9ff";
        const LINE_COLOR = "rgba(255, 255, 255, 0.3)";
        const CLOUD_COLOR_START = "rgba(100, 200, 255, 0.25)";
        const CLOUD_COLOR_END = "rgba(100, 200, 255, 0.0)";
        const PULSE_COLOR = "rgb(170, 240, 255)";
        const SIGNAL_COLOR = "rgb(255, 255, 255)";
        const LIGHTNING_COLOR = "rgb(200, 230, 255)";

        let nodes = [];
        let activeSignals = [];
        let activeLightnings = [];
        let rotationX = 0;
        let rotationY = 0;

        // --- Definições de Filtros e Gradientes (Seu código) ---
        const defs = document.createElementNS(svgNS, 'defs');
        
        const globeGrad = document.createElementNS(svgNS, 'radialGradient');
        globeGrad.setAttribute('id', 'globeGradient');
        globeGrad.innerHTML = `
            <stop offset="0%" style="stop-color:${CLOUD_COLOR_START}" />
            <stop offset="70%" style="stop-color:${CLOUD_COLOR_END}" /> 
            <stop offset="100%" style="stop-color:${CLOUD_COLOR_END}" />
        `;
        defs.appendChild(globeGrad);

        const nodeGrad = document.createElementNS(svgNS, 'radialGradient');
        nodeGrad.setAttribute('id', 'nodeGradient');
        nodeGrad.innerHTML = `
            <stop offset="0%" style="stop-color:${NODE_COLOR_START}" />
            <stop offset="100%" style="stop-color:${NODE_COLOR_END}" />
        `;
        defs.appendChild(nodeGrad);

        const filter = document.createElementNS(svgNS, 'filter');
        filter.setAttribute('id', 'nodeGlow');
        filter.innerHTML = `
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        `;
        defs.appendChild(filter);
        svg.appendChild(defs);

        // Elemento de Fundo (Nuvem de Poeira)
        const globeCloud = document.createElementNS(svgNS, 'circle');
        globeCloud.setAttribute('cx', CENTER_X);
        globeCloud.setAttribute('cy', CENTER_Y);
        globeCloud.setAttribute('r', GLOBE_RADIUS);
        globeCloud.setAttribute('fill', 'url(#globeGradient)');
        svg.appendChild(globeCloud);

        // Criação dos Grupos (Seu código)
        const linesGroup = document.createElementNS(svgNS, 'g');
        linesGroup.setAttribute('id', 'lines');
        svg.appendChild(linesGroup);

        const nodesGroup = document.createElementNS(svgNS, 'g');
        nodesGroup.setAttribute('id', 'nodes');
        nodesGroup.setAttribute('filter', 'url(#nodeGlow)');
        svg.appendChild(nodesGroup);

        const signalsGroup = document.createElementNS(svgNS, 'g');
        signalsGroup.setAttribute('id', 'signals');
        signalsGroup.setAttribute('filter', 'url(#nodeGlow)');
        svg.appendChild(signalsGroup);

        const lightningsGroup = document.createElementNS(svgNS, 'g');
        lightningsGroup.setAttribute('id', 'lightnings');
        lightningsGroup.setAttribute('filter', 'url(#nodeGlow)');
        svg.appendChild(lightningsGroup);

        // --- Funções (Seu código, com a alteração para círculos) ---
        function createNodes() {
            const SIDES_OPTIONS = [0]; // Apenas círculos
            for (let i = 0; i < NUM_NODES; i++) {
                const phi = Math.acos(-1 + (2 * i) / NUM_NODES);
                const theta = Math.sqrt(NUM_NODES * Math.PI) * phi;
                const nodeElement = document.createElementNS(svgNS, 'circle');
                nodes.push({
                    x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi),
                    y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
                    z: GLOBE_RADIUS * Math.cos(phi),
                    baseSize: 2 + Math.random() * 3,
                    shapeSides: 0,
                    nodeElement: nodeElement,
                    isPulsing: false,
                    pulseFrame: 0,
                });
            }
            nodes.forEach(node => {
                node.nodeElement.setAttribute('fill', 'url(#nodeGradient)');
                nodesGroup.appendChild(node.nodeElement);
            });
        }

        function project(node) {
            const sinX = Math.sin(rotationX);
            const cosX = Math.cos(rotationX);
            const sinY = Math.sin(rotationY);
            const cosY = Math.cos(rotationY);
            const rotY = node.x * cosY - node.z * sinY;
            const rotZ = node.x * sinY + node.z * cosY;
            const rotX = node.y * cosX - rotZ * sinX;
            const finalZ = node.y * sinX + rotZ * cosX;
            const scale = (finalZ + GLOBE_RADIUS * 1.5) / (GLOBE_RADIUS * 2.5);
            return {
                x: rotY * scale + CENTER_X,
                y: rotX * scale + CENTER_Y,
                z: finalZ,
                scale: Math.max(0.1, scale)
            };
        }

        function createLightning(originNode) {
            const lightningElement = document.createElementNS(svgNS, 'polyline');
            const pOrigin = project(originNode);
            let currentX = pOrigin.x;
            let currentY = pOrigin.y;
            let points = `${currentX},${currentY}`;
            const angle = Math.atan2(currentY - CENTER_Y, currentX - CENTER_X);
            for (let i = 0; i < LIGHTNING_SEGMENTS; i++) {
                const segmentLength = (Math.random() * (LIGHTNING_LENGTH_MAX - LIGHTNING_LENGTH_MIN) + LIGHTNING_LENGTH_MIN) / LIGHTNING_SEGMENTS;
                const segmentAngle = angle + (Math.random() - 0.5) * Math.PI / 4; 
                currentX += Math.cos(segmentAngle) * segmentLength;
                currentY += Math.sin(segmentAngle) * segmentLength;
                points += ` ${currentX},${currentY}`;
            }
            lightningElement.setAttribute('points', points);
            lightningElement.setAttribute('stroke', LIGHTNING_COLOR);
            lightningElement.setAttribute('stroke-width', 2);
            lightningElement.setAttribute('fill', 'none');
            activeLightnings.push({ element: lightningElement, frame: 0 });
            lightningsGroup.appendChild(lightningElement);
        }

        // --- Loop de Animação ---
        let frameId; 
        function animate() {
            if (isProcessing) {
                PULSE_CHANCE = 0.05;
                SIGNAL_CHANCE = 0.02;
                LIGHTNING_CHANCE = 0.005;
            } else {
                PULSE_CHANCE = 0.005;
                SIGNAL_CHANCE = 0.002;
                LIGHTNING_CHANCE = 0.0005;
            }

            linesGroup.innerHTML = ''; 
            signalsGroup.innerHTML = ''; 
            
            let projectedNodes = [];
            nodes.forEach(node => {
                projectedNodes.push(project(node));
            });

            const sortedIndices = projectedNodes.map((_, i) => i)
                .sort((a, b) => projectedNodes[a].z - projectedNodes[b].z);

            let drawnConnections = new Set();
            
            sortedIndices.forEach(index => {
                const node = nodes[index];
                const pNode = projectedNodes[index];
                
                let currentSize = node.baseSize * pNode.scale;
                let currentOpacity = pNode.scale * 1.2;
                let currentFill = 'url(#nodeGradient)';

                if (Math.random() < PULSE_CHANCE && !node.isPulsing) {
                    node.isPulsing = true;
                    node.pulseFrame = 0;
                }

                if (node.isPulsing) {
                    node.pulseFrame++;
                    const progress = node.pulseFrame / 30; // 30 = PULSE_DURATION
                    const sizeFactor = 1 + Math.sin(progress * Math.PI) * 1.5; 
                    currentSize *= sizeFactor;
                    currentFill = PULSE_COLOR;
                    currentOpacity = Math.min(1, currentOpacity + Math.sin(progress * Math.PI) * 0.8);
                    if (node.pulseFrame >= 30) {
                        node.isPulsing = false;
                    }
                }

                node.nodeElement.setAttribute('cx', pNode.x);
                node.nodeElement.setAttribute('cy', pNode.y);
                node.nodeElement.setAttribute('r', currentSize);
                node.nodeElement.setAttribute('opacity', currentOpacity);
                node.nodeElement.setAttribute('fill', currentFill);
                nodesGroup.appendChild(node.nodeElement);
                
                sortedIndices.forEach(otherIndex => {
                    if (index === otherIndex) return;
                    const connectionId = index < otherIndex ? `${index}-${otherIndex}` : `${otherIndex}-${index}`;
                    if (drawnConnections.has(connectionId)) return;
                    const otherNode = nodes[otherIndex];
                    const pOtherNode = projectedNodes[otherIndex];
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const dz = node.z - otherNode.z;
                    const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
                    
                    if (distance < CONNECTION_DISTANCE_THRESHOLD) {
                        const line = document.createElementNS(svgNS, 'line');
                        line.setAttribute('x1', pNode.x);
                        line.setAttribute('y1', pNode.y);
                        line.setAttribute('x2', pOtherNode.x);
                        line.setAttribute('y2', pOtherNode.y);
                        line.setAttribute('stroke', LINE_COLOR);
                        line.setAttribute('stroke-width', pNode.scale * 0.8);
                        line.setAttribute('opacity', pNode.scale * 0.5);
                        linesGroup.appendChild(line);
                        drawnConnections.add(connectionId);
                        if (Math.random() < SIGNAL_CHANCE) {
                            activeSignals.push({
                                node1: node, node2: otherNode,
                                pNode1: pNode, pNode2: pOtherNode,
                                progress: 0, direction: Math.random() < 0.5 ? 0 : 1
                            });
                        }
                    }
                });

                if (pNode.z > GLOBE_RADIUS * 0.5 && Math.random() < LIGHTNING_CHANCE) {
                    createLightning(node);
                }
            });

            activeSignals = activeSignals.filter(signal => {
                signal.progress += SIGNAL_SPEED;
                if (signal.progress >= 1) return false; 
                const fromX = signal.direction === 0 ? signal.pNode1.x : signal.pNode2.x;
                const fromY = signal.direction === 0 ? signal.pNode1.y : signal.pNode2.y;
                const toX = signal.direction === 0 ? signal.pNode2.x : signal.pNode1.x;
                const toY = signal.direction === 0 ? signal.pNode2.y : signal.pNode1.y;
                const currentX = fromX + (toX - fromX) * signal.progress;
                const currentY = fromY + (toY - fromY) * signal.progress;
                const signalRadius = (signal.pNode1.scale + signal.pNode2.scale) / 2 * 3; 
                const signalOpacity = Math.min(1, Math.sin(signal.progress * Math.PI)) * 0.8; 
                const signalCircle = document.createElementNS(svgNS, 'circle');
                signalCircle.setAttribute('cx', currentX);
                signalCircle.setAttribute('cy', currentY);
                signalCircle.setAttribute('r', signalRadius);
                signalCircle.setAttribute('fill', SIGNAL_COLOR);
                signalCircle.setAttribute('opacity', signalOpacity);
                signalsGroup.appendChild(signalCircle);
                return true; 
            });

            activeLightnings = activeLightnings.filter(lightning => {
                lightning.frame++;
                const progress = lightning.frame / LIGHTNING_DURATION;
                lightning.element.setAttribute('opacity', 1 - progress);
                if (lightning.frame >= LIGHTNING_DURATION) {
                    lightning.element.remove(); 
                    return false;
                }
                return true;
            });

            rotationX += ROTATION_SPEED_X;
            rotationY += ROTATION_SPEED_Y;

            frameId = requestAnimationFrame(animate);
        }

        // Iniciar!
        createNodes();
        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
            if (svg) {
                svg.innerHTML = '';
            }
        };

    }, [isProcessing]); // A dependência [isProcessing] está correta.

    // O wrapper <div> foi removido. O SVG agora é responsivo.
    return (
        <svg ref={svgRef} className="w-full" viewBox="0 0 500 500"></svg>
    );
}