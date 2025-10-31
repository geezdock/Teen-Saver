import AddGoalForm from '../AddGoalForm';
import { THEME_CONFIG } from '@/lib/themeConfig';

export default function AddGoalFormExample() {
  const handleAddGoal = (name: string, price: number, duration: number, savedAmount: number) => {
    console.log('New goal:', { name, price, duration, savedAmount });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 p-8 flex items-center justify-center">
      <AddGoalForm 
        colors={THEME_CONFIG.spooky.colors} 
        onAddGoal={handleAddGoal}
      />
    </div>
  );
}
