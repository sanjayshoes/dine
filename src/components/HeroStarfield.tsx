import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
  depth: number; // 0.2 to 1.0 (parallax weight)
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const HeroStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors = [
      'rgba(56, 189, 248, ',   // Cyan
      'rgba(125, 211, 252, ',  // Light Cyan / Sky
      'rgba(255, 255, 255, ',  // Pure White
      'rgba(147, 197, 253, ',  // Soft Blue
      'rgba(45, 212, 191, ',   // Teal
    ];

    // Determine particle count based on screen area
    const particleCount = Math.floor(Math.min(160, Math.max(70, (width * height) / 9000)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 * depth + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.25,
        alpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15 * depth,
        vy: (Math.random() - 0.5) * 0.15 * depth - 0.05 * depth, // subtle upward drift
        depth,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Occasional shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 60 + 40,
          speed: Math.random() * 4 + 4,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 deg downward
          alpha: 1,
          active: true,
        });
      }
    };

    let shootingStarTimer = setInterval(spawnShootingStar, 4000);

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Normalize to -1..1 from center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - centerX) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - centerY) / (rect.height / 2);
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Resize observer
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let time = 0;

    const render = () => {
      time += 1;

      // Smooth mouse lerp
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.04;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.04;

      const parallaxOffsetX = mouseRef.current.currentX * 28;
      const parallaxOffsetY = mouseRef.current.currentY * 22;

      ctx.clearRect(0, 0, width, height);

      // Render standard starfield particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Parallax position
        const drawX = p.x + parallaxOffsetX * p.depth;
        const drawY = p.y + parallaxOffsetY * p.depth;

        // Twinkle
        const dynamicAlpha = Math.max(
          0.1,
          p.baseAlpha + Math.sin(time * p.twinkleSpeed + p.twinkleOffset) * 0.25
        );

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 1.4) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${dynamicAlpha * 0.25})`;
          ctx.fill();
        }
      }

      // Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          s.active = false;
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.7, `rgba(56, 189, 248, ${s.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Glowing tip
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(shootingStarTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] w-full h-full pointer-events-none opacity-85"
      aria-hidden="true"
    />
  );
};
