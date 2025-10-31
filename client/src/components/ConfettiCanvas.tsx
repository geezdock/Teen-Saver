import { useState, useEffect } from 'react';

interface ConfettiCanvasProps {
  emojis: string[];
}

export default function ConfettiCanvas({ emojis }: ConfettiCanvasProps) {
  const [pieces, setPieces] = useState<Array<{
    id: number;
    emoji: string;
    style: React.CSSProperties;
  }>>([]);

  useEffect(() => {
    const newPieces = Array(150).fill(0).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      style: {
        left: `${Math.random() * 100}vw`,
        top: `${-10 - Math.random() * 20}vh`,
        animationDelay: `${Math.random() * 1}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }));
    setPieces(newPieces);
  }, [emojis]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0vh) rotate(0deg) scale(1); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0.1; }
          }
          .confetti-piece {
            position: absolute;
            font-size: 20px;
            opacity: 0;
            animation: fall linear forwards;
          }
        `}
      </style>
      {pieces.map(piece => (
        <span key={piece.id} className="confetti-piece" style={piece.style}>
          {piece.emoji}
        </span>
      ))}
    </div>
  );
}
