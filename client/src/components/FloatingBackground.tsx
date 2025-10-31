import { useMemo } from 'react';

interface FloatingBackgroundProps {
  icons: string[];
}

export default function FloatingBackground({ icons }: FloatingBackgroundProps) {
  const count = 40;

  const floatingElements = useMemo(() => {
    return Array(count).fill(0).map((_, i) => ({
      id: i,
      emoji: icons[Math.floor(Math.random() * icons.length)],
      style: {
        left: `${Math.random() * 100}vw`,
        top: `${80 + Math.random() * 30}vh`,
        fontSize: `${20 + Math.random() * 40}px`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${30 + Math.random() * 30}s`,
        opacity: 0.2 + Math.random() * 0.4,
      },
    }));
  }, [icons]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-50vh) rotate(5deg); opacity: 0.5; }
            100% { transform: translateY(-120vh) rotate(-5deg); opacity: 0; }
          }
          .floating-element {
            position: absolute;
            color: white;
            animation: floatUp infinite ease-in-out;
            z-index: 0;
          }
        `}
      </style>
      {floatingElements.map(el => (
        <span key={el.id} className="floating-element" style={el.style}>
          {el.emoji}
        </span>
      ))}
    </div>
  );
}
