import { useState, useEffect, useMemo } from 'react';
import { THEME_CONFIG, type ThemeKey } from '@/lib/themeConfig';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import FloatingBackground from '@/components/FloatingBackground';
import ConfettiCanvas from '@/components/ConfettiCanvas';
import SavingsCalendar from '@/components/SavingsCalendar';
import GoalCard, { type Goal } from '@/components/GoalCard';
import AddGoalForm from '@/components/AddGoalForm';
import ExpensePanel, { type Expense } from '@/components/ExpensePanel';
import { Button } from '@/components/ui/button';

interface SavingsHistory {
  date: string;
  amount: number;
  goalId: number;
}

export default function Home() {
  const [theme, setTheme] = useState<ThemeKey>('spooky');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savingsHistory, setSavingsHistory] = useState<SavingsHistory[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExpensePanel, setShowExpensePanel] = useState(false);
  const [dailyInputs, setDailyInputs] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  const currentTheme = THEME_CONFIG[theme];
  const colors = currentTheme.colors;
  const ThemeIcons = currentTheme.IconComponents;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedData = localStorage.getItem('savings-tracker-data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setGoals(data.goals || []);
        setExpenses(data.expenses || []);
        setSavingsHistory(data.savingsHistory || []);
        setTheme(data.theme || 'spooky');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = (updates: Partial<{
    goals: Goal[];
    expenses: Expense[];
    savingsHistory: SavingsHistory[];
    theme: ThemeKey;
  }>) => {
    try {
      const data = {
        goals: updates.goals !== undefined ? updates.goals : goals,
        expenses: updates.expenses !== undefined ? updates.expenses : expenses,
        savingsHistory: updates.savingsHistory !== undefined ? updates.savingsHistory : savingsHistory,
        theme: updates.theme !== undefined ? updates.theme : theme,
      };
      localStorage.setItem('savings-tracker-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleThemeChange = (newTheme: ThemeKey) => {
    setTheme(newTheme);
    saveData({ theme: newTheme });
  };

  const handleAddGoal = (name: string, price: number, duration: number, savedAmount: number) => {
    const newGoal: Goal = {
      id: Date.now(),
      name,
      price,
      duration,
      saved: savedAmount,
    };
    const newGoals = [...goals, newGoal];
    setGoals(newGoals);
    saveData({ goals: newGoals });
    
    triggerConfetti();
  };

  const handleDeleteGoal = (id: number) => {
    const newGoals = goals.filter(g => g.id !== id);
    setGoals(newGoals);
    saveData({ goals: newGoals });
  };

  const handleLogContribution = (goalId: number) => {
    const amount = parseFloat(dailyInputs[goalId] || '0');
    if (amount <= 0) return;

    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const newSaved = Math.min(goal.saved + amount, goal.price);
    const newGoals = goals.map(g => 
      g.id === goalId ? { ...g, saved: newSaved } : g
    );
    setGoals(newGoals);

    const today = new Date().toISOString().split('T')[0];
    const newHistory = [...savingsHistory, { date: today, amount, goalId }];
    setSavingsHistory(newHistory);

    setDailyInputs(prev => {
      const newInputs = { ...prev };
      delete newInputs[goalId];
      return newInputs;
    });

    saveData({ goals: newGoals, savingsHistory: newHistory });
    triggerConfetti();
  };

  const handleAddExpense = (name: string, amount: number) => {
    const newExpense: Expense = {
      id: Date.now(),
      name,
      amount,
      date: new Date().toISOString(),
    };
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    saveData({ expenses: newExpenses });
  };

  const handleDeleteExpense = (id: number) => {
    const newExpenses = expenses.filter(e => e.id !== id);
    setExpenses(newExpenses);
    saveData({ expenses: newExpenses });
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const dailyActivities = useMemo(() => {
    const activities: Record<string, { saved: number; spent: number }> = {};
    
    expenses.forEach(exp => {
      const dateKey = exp.date.split('T')[0];
      activities[dateKey] = activities[dateKey] || { saved: 0, spent: 0 };
      activities[dateKey].spent += exp.amount;
    });
    
    savingsHistory.forEach(sav => {
      const dateKey = sav.date;
      activities[dateKey] = activities[dateKey] || { saved: 0, spent: 0 };
      activities[dateKey].saved += sav.amount;
    });
    
    return activities;
  }, [expenses, savingsHistory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange-400 text-2xl">Loading your savings...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden font-sans"
      style={{ background: currentTheme.gradient }}
    >
      <FloatingBackground icons={currentTheme.floatingIcons} />
      {showConfetti && <ConfettiCanvas emojis={currentTheme.confetti} />}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold ${colors.headerText} flex items-center gap-3`}>
            <ThemeIcons.HeaderIcon className="w-10 h-10" />
            {currentTheme.headerTitle}
          </h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowExpensePanel(true)}
              variant="destructive"
              data-testid="button-open-expenses"
            >
              <ThemeIcons.ExpenseIcon className="w-4 h-4 mr-2" />
              Expenses
            </Button>
            <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
          </div>
        </header>

        <div className="flex flex-col items-center gap-8 mb-8">
          <AddGoalForm colors={colors} onAddGoal={handleAddGoal} />
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">{currentTheme.emptyGoalsIcon}</div>
            <p className={`text-2xl ${colors.secondaryText}`}>No goals yet. Create your first savings goal!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                colors={colors}
                dailyInput={dailyInputs[goal.id] || ''}
                onDailyInputChange={(value) => setDailyInputs(prev => ({ ...prev, [goal.id]: value }))}
                onLogContribution={() => handleLogContribution(goal.id)}
                onDelete={() => handleDeleteGoal(goal.id)}
              />
            ))}
          </div>
        )}

        <SavingsCalendar dailyActivities={dailyActivities} theme={currentTheme} />
      </div>

      {showExpensePanel && (
        <ExpensePanel
          expenses={expenses}
          totalExpenses={totalExpenses}
          ExpenseIcon={ThemeIcons.ExpenseIcon}
          onClose={() => setShowExpensePanel(false)}
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      )}
    </div>
  );
}
