import { useState } from 'react';
import GoalCard from '../GoalCard';
import { THEME_CONFIG } from '@/lib/themeConfig';

export default function GoalCardExample() {
  const [dailyInput, setDailyInput] = useState('');
  const [saved, setSaved] = useState(150);

  const mockGoal = {
    id: 1,
    name: 'New Gaming Console',
    price: 500,
    duration: 60,
    saved: saved,
  };

  const handleLog = () => {
    const amount = parseFloat(dailyInput);
    if (amount > 0) {
      setSaved(prev => Math.min(prev + amount, mockGoal.price));
      setDailyInput('');
      console.log('Logged contribution:', amount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <GoalCard
          goal={mockGoal}
          colors={THEME_CONFIG.spooky.colors}
          dailyInput={dailyInput}
          onDailyInputChange={setDailyInput}
          onLogContribution={handleLog}
          onDelete={() => console.log('Delete goal')}
        />
      </div>
    </div>
  );
}
