import { useEffect, useRef } from 'react';

const GRID_SIZE = 8;
const CELL_SIZE = 20;
const GAP = 3;
const PADDING = 8;

interface Cell {
  x: number;
  y: number;
  entropy: number;
  targetEntropy: number;
  speed: number;
}

export function EntropyVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const cellsRef = useRef<Cell[]>([]);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const totalSize = PADDING * 2 + GRID_SIZE * (CELL_SIZE + GAP) - GAP;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = totalSize * dpr;
    canvas.height = totalSize * dpr;
    canvas.style.width = `${totalSize}px`;
    canvas.style.height = `${totalSize}px`;
    ctx.scale(dpr, dpr);

    // Initialize cells
    if (cellsRef.current.length === 0) {
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          cellsRef.current.push({
            x: col,
            y: row,
            entropy: Math.random() * 0.3,
            targetEntropy: Math.random() * 0.4,
            speed: 0.01 + Math.random() * 0.03,
          });
        }
      }
    }

    function getEntropyColor(entropy: number): string {
      // Low entropy = green/teal, high entropy = red/orange
      if (entropy < 0.3) {
        const t = entropy / 0.3;
        const r = Math.round(34 + t * (34));
        const g = Math.round(197 - t * 60);
        const b = Math.round(94 + t * 20);
        return `rgb(${r}, ${g}, ${b})`;
      } else if (entropy < 0.6) {
        const t = (entropy - 0.3) / 0.3;
        const r = Math.round(68 + t * (177));
        const g = Math.round(137 - t * (37));
        const b = Math.round(114 - t * (74));
        return `rgb(${r}, ${g}, ${b})`;
      } else {
        const t = (entropy - 0.6) / 0.4;
        const r = Math.round(245 - t * 6);
        const g = Math.round(100 - t * 32);
        const b = Math.round(40 - t * 0);
        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    function animate(): void {
      if (!ctx) return;
      timeRef.current += 1;
      const time = timeRef.current;

      ctx.clearRect(0, 0, totalSize, totalSize);

      for (const cell of cellsRef.current) {
        // Slowly shift targets
        if (time % 120 === Math.floor(Math.random() * 120)) {
          cell.targetEntropy = Math.random() * 0.85 + 0.05;
        }

        // Lerp entropy toward target
        const diff = cell.targetEntropy - cell.entropy;
        cell.entropy += diff * cell.speed;

        // Add some wave-based entropy variation
        const wave = Math.sin(time * 0.02 + cell.x * 0.5 + cell.y * 0.3) * 0.15;
        const displayEntropy = Math.max(0, Math.min(1, cell.entropy + wave));

        const px = PADDING + cell.x * (CELL_SIZE + GAP);
        const py = PADDING + cell.y * (CELL_SIZE + GAP);
        const radius = 4;

        ctx.fillStyle = getEntropyColor(displayEntropy);
        ctx.globalAlpha = 0.85;

        ctx.beginPath();
        ctx.roundRect(px, py, CELL_SIZE, CELL_SIZE, radius);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-2xl ring-1 ring-neutral-200/50"
      />
      {/* Legend */}
      <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-xs text-neutral-400">
        <span>Low entropy</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgb(34, 197, 94)' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgb(68, 137, 114)' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgb(245, 158, 11)' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgb(239, 68, 68)' }} />
        </div>
        <span>High entropy</span>
      </div>
    </div>
  );
}
