import { Trash2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ThemeColors } from '@/lib/themeConfig';

export interface Goal {
  id: number;
  name: string;
  price: number;
  duration: number;
  saved: number;
}

interface GoalCardProps {
  goal: Goal;
  colors: ThemeColors;
  dailyInput: string;
  onDailyInputChange: (value: string) => void;
  onLogContribution: () => void;
  onDelete: () => void;
}

export default function GoalCard({ 
  goal, 
  colors, 
  dailyInput, 
  onDailyInputChange, 
  onLogContribution,
  onDelete 
}: GoalCardProps) {
  const progress = (goal.saved / goal.price) * 100;
  const isComplete = goal.saved >= goal.price;
  const dailyTarget = goal.price / goal.duration;

  return (
    <div
      className={`${colors.primaryBg} backdrop-blur-sm p-6 rounded-xl border-2 ${
        isComplete ? colors.goalCompleteBorder : colors.goalCardBorder
      } shadow-lg ${isComplete ? colors.goalCompleteShadow : colors.goalCardShadow} transition-all duration-300`}
      data-testid={`goal-card-${goal.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold ${colors.goalHeader}`} data-testid={`goal-name-${goal.id}`}>
          {goal.name}
        </h3>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 transition-colors p-1"
          data-testid={`button-delete-${goal.id}`}
          title="Delete goal"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${colors.secondaryText}`}>Target:</span>
          <span className={`text-xl font-bold ${colors.primaryText} font-mono`} data-testid={`goal-target-${goal.id}`}>
            ${goal.price.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${colors.secondaryText}`}>Saved:</span>
          <span className={`text-xl font-bold ${colors.primaryText} font-mono`} data-testid={`goal-saved-${goal.id}`}>
            ${goal.saved.toFixed(2)}
          </span>
        </div>

        <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${colors.progressBar} transition-all duration-500 rounded-full`}
            style={{ width: `${Math.min(progress, 100)}%` }}
            data-testid={`progress-bar-${goal.id}`}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className={colors.tertiaryText}>{progress.toFixed(0)}% Complete</span>
          <span className={colors.tertiaryText}>{goal.duration} days</span>
        </div>

        <div className={`text-xs ${colors.tertiaryText} text-center py-2`}>
          Daily target: ${dailyTarget.toFixed(2)}
        </div>

        {!isComplete && (
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="number"
                placeholder="Amount"
                value={dailyInput}
                onChange={(e) => onDailyInputChange(e.target.value)}
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                data-testid={`input-contribution-${goal.id}`}
              />
            </div>
            <Button
              onClick={onLogContribution}
              className={`${colors.buttonCustomLog} text-white`}
              data-testid={`button-log-${goal.id}`}
            >
              Log
            </Button>
          </div>
        )}

        {isComplete && (
          <div className="text-center py-2">
            <span className="text-green-400 text-lg font-bold">🎉 Goal Complete! 🎉</span>
          </div>
        )}
      </div>
    </div>
  );
}
