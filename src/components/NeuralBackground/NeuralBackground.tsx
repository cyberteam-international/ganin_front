'use client';

import { useEffect } from 'react';
import styles from './NeuralBackground.module.css';

export default function NeuralBackground() {
    useEffect(() => {
        const initNeuralBackground = () => {
            const canvas = document.getElementById('globalNeuralCanvas') as HTMLCanvasElement;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const nodes: Array<{x: number, y: number, vx: number, vy: number}> = [];
            const totalNodes = Math.floor((window.innerWidth * window.innerHeight) / 8000);

            // Создание узлов
            for (let i = 0; i < totalNodes; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3
                });
            }

            function draw() {
                if (!ctx) return;
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                nodes.forEach((node, i) => {
                    // Рисуем узлы
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(44, 62, 80, 0.6)';
                    ctx.fill();

                    // Рисуем связи между узлами
                    for (let j = i + 1; j < totalNodes; j++) {
                        const dx = node.x - nodes[j].x;
                        const dy = node.y - nodes[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(nodes[j].x, nodes[j].y);
                            ctx.strokeStyle = `rgba(44, 62, 80, ${0.3 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }

                    // Обновляем позицию узлов
                    node.x += node.vx;
                    node.y += node.vy;

                    // Отскок от границ
                    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                });

                requestAnimationFrame(draw);
            }

            draw();
        };

        initNeuralBackground();
    }, []);

    return (
        <canvas id="globalNeuralCanvas" className={styles.globalNeuralBackground}></canvas>
    );
}
