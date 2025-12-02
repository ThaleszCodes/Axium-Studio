
import React, { useRef, useEffect } from 'react';

export const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        let particlesArray: Particle[] = [];
        const numberOfParticles = 50;
        
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 0.5 + 0.5;
                const x = Math.random() * width;
                const y = Math.random() * height;
                const directionX = (Math.random() - 0.5) * 0.2;
                const directionY = (Math.random() - 0.5) * 0.2;
                const color = 'rgba(17, 24, 39, 0.4)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        let animationFrameId: number;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', () => {});
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};