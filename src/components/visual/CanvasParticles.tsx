import { useEffect, useRef, useState } from 'react';

// Extend particle with a slight hue shift for subtle chromatic variance
interface Particle { x: number; y: number; vx: number; vy: number; r: number; o: number; z: number; h: number; }

interface CanvasParticlesProps {
  count?: number;
  className?: string;
}

// Canvas baseado em RAF, pausando em reduced-motion e em aba oculta.
export function CanvasParticles({ count = 42, className = '' }: CanvasParticlesProps) {
  // Nota: Em reduced-motion renderizamos apenas um frame estático (drawStatic) mantendo estética sem movimento.
  // Layering: componente posicionado acima do acento radial (z-10 configurado no Layout) mas abaixo do conteúdo interativo.
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dimsRef = useRef<{w:number;h:number}>({w:0,h:0});
  const [debug, setDebug] = useState(false);
  const rafRef = useRef<number>();
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sempre desenhamos uma camada inicial (mesmo em reduced motion) estática
    const DPR = window.devicePixelRatio || 1;
    function resizeBase() {
      if (!canvas || !ctx) return;
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(DPR, DPR);
    }
    resizeBase();

    // Função para (re)popular partículas de forma integral
    function populateFull(w:number,h:number){
      particlesRef.current = Array.from({ length: count }).map(() => ({
        x: w * Math.random(),
        y: h * Math.random(),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.55,
        o: Math.random() * 0.45 + 0.2,
        z: Math.random(),
        h: 145 + Math.random() * 12
      }));
    }

    // Função para preencher apenas área nova (quando expandiu)
    function populateDelta(prevW:number, prevH:number, newW:number, newH:number){
      const arr = particlesRef.current;
      // Se largura aumentou: adicionar partículas nas colunas novas
      if(newW > prevW){
        const addCount = Math.round((newW - prevW) / newW * count);
        for(let i=0;i<addCount;i++){
          arr.push({
            x: prevW + Math.random()*(newW - prevW),
            y: newH * Math.random(),
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            r: Math.random() * 1.4 + 0.55,
            o: Math.random() * 0.45 + 0.2,
            z: Math.random(),
            h: 145 + Math.random() * 12
          });
        }
      }
      // Se altura aumentou: adicionar partículas nas linhas novas
      if(newH > prevH){
        const addCount = Math.round((newH - prevH) / newH * count);
        for(let i=0;i<addCount;i++){
          arr.push({
            x: newW * Math.random(),
            y: prevH + Math.random()*(newH - prevH),
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            r: Math.random() * 1.4 + 0.55,
            o: Math.random() * 0.45 + 0.2,
            z: Math.random(),
            h: 145 + Math.random() * 12
          });
        }
      }
      // Não removemos ao encolher para evitar “flash” – poderia otimizar depois.
    }

    const w = canvas.clientWidth; const h = canvas.clientHeight;
    dimsRef.current = {w,h};
    populateFull(w,h);

    function drawStatic() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particlesRef.current) {
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5.2);
        // centro mais intenso + suave halo
  g.addColorStop(0, `hsla(${p.h},70%,48%,${p.o})`);
  g.addColorStop(0.4, `hsla(${p.h},65%,45%,${p.o * 0.55})`);
  g.addColorStop(1, `hsla(${p.h},60%,40%,0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 5.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawStatic();
    if (reduce) return; // não anima além da camada estática

    function resize() {
      if (!canvas || !ctx) return;
      const prevW = dimsRef.current.w; const prevH = dimsRef.current.h;
      const beforeClientW = canvas.clientWidth; const beforeClientH = canvas.clientHeight;
      resizeBase();
      const newW = canvas.clientWidth; const newH = canvas.clientHeight;
      dimsRef.current = {w:newW,h:newH};

      // Critério: se aumentou mais que 5% em qualquer dimensão, povoar delta
      const grewW = newW > prevW && (newW - prevW)/prevW > 0.05;
      const grewH = newH > prevH && (newH - prevH)/prevH > 0.05;
      if (grewW || grewH) {
        populateDelta(prevW, prevH, newW, newH);
      }
      // Em debug, forçar um novo draw estático para visualização imediata
      if(debug){
        ctx.clearRect(0,0,newW,newH);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function step() {
      if (!canvas || !ctx) { rafRef.current = requestAnimationFrame(step); return; }
      if (document.hidden) { rafRef.current = requestAnimationFrame(step); return; }
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particlesRef.current) {
        // deslocamento escalado por profundidade (camadas dão sensação 3D)
        p.x += p.vx * (0.42 + p.z * 0.9); p.y += p.vy * (0.42 + p.z * 0.9);
        if (p.x < -24) p.x = canvas.clientWidth + 18; else if (p.x > canvas.clientWidth + 24) p.x = -18;
        if (p.y < -24) p.y = canvas.clientHeight + 18; else if (p.y > canvas.clientHeight + 24) p.y = -18;
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5.2);
  g.addColorStop(0, `hsla(${p.h},70%,48%,${p.o})`);
  g.addColorStop(0.4, `hsla(${p.h},65%,45%,${p.o * 0.55})`);
  g.addColorStop(1, `hsla(${p.h},60%,40%,0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 5.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if(debug){
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(0,0,180,90);
        ctx.fillStyle = '#7ef2b8';
        ctx.font = '11px monospace';
        ctx.textBaseline = 'top';
        const d = dimsRef.current;
        ctx.fillText(`W:${d.w}`,8,6);
        ctx.fillText(`H:${d.h}`,8,20);
        ctx.fillText(`#:${particlesRef.current.length}`,8,34);
        // Detectar cobertura aproximada: contar quantos estão após 80% largura
        const right = particlesRef.current.filter(p=>p.x > d.w*0.8).length;
        ctx.fillText(`>80%:${right}`,8,48);
        ctx.fillText(`debug:on`,8,62);
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, reduce]);

  // Expor toggle debug global simples
  useEffect(()=>{
    (window as any).__ZORO_PARTICLES_DEBUG_TOGGLE = () => setDebug(d=>!d);
  },[]);

  return <canvas ref={canvasRef} className={className + ' block w-full h-full'} aria-hidden />;
}