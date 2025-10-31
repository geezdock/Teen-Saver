import { useState } from 'react';
import ConfettiCanvas from '../ConfettiCanvas';
import { Button } from '@/components/ui/button';

export default function ConfettiCanvasExample() {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center">
      {showConfetti && <ConfettiCanvas emojis={['💰', '✨', '👻', '🎃', '💜', '🧡']} />}
      <Button 
        onClick={triggerConfetti}
        size="lg"
        data-testid="button-trigger-confetti"
        className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-500 hover:to-purple-500 text-white"
      >
        Trigger Confetti!
      </Button>
    </div>
  );
}
