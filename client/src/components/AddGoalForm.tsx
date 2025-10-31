import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ThemeColors } from '@/lib/themeConfig';

interface AddGoalFormProps {
  colors: ThemeColors;
  onAddGoal: (name: string, price: number, duration: number, savedAmount: number) => void;
}

export default function AddGoalForm({ colors, onAddGoal }: AddGoalFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [savedAmount, setSavedAmount] = useState('');

  const handleSubmit = () => {
    if (name && price && duration) {
      onAddGoal(
        name,
        parseFloat(price),
        parseInt(duration),
        parseFloat(savedAmount) || 0
      );
      setName('');
      setPrice('');
      setDuration('');
      setSavedAmount('');
      setShowForm(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className={`${colors.addGoal} text-white px-8 py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center gap-2 text-lg font-semibold`}
        data-testid="button-add-goal"
      >
        <Plus className={`w-6 h-6 ${colors.addGoalIcon}`} />
        Add New Goal
      </button>
    );
  }

  return (
    <div className={`${colors.primaryBg} backdrop-blur-sm p-6 rounded-xl border-2 ${colors.primaryBorder} shadow-lg w-full max-w-md`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${colors.primaryText}`}>New Savings Goal</h3>
        <button
          onClick={() => setShowForm(false)}
          className={`${colors.secondaryText} hover:text-white transition-colors`}
          data-testid="button-close-form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Goal name (e.g., New Phone)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          data-testid="input-goal-name"
        />
        <Input
          type="number"
          placeholder="Target amount ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          data-testid="input-goal-price"
        />
        <Input
          type="number"
          placeholder="Duration (days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          data-testid="input-goal-duration"
        />
        <Input
          type="number"
          placeholder="Already saved (optional)"
          value={savedAmount}
          onChange={(e) => setSavedAmount(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          data-testid="input-goal-saved"
        />
        <Button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-500 text-white"
          data-testid="button-submit-goal"
        >
          Create Goal
        </Button>
      </div>
    </div>
  );
}
