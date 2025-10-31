import { useState } from 'react';
import ExpensePanel from '../ExpensePanel';
import { Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExpensePanelExample() {
  const [showPanel, setShowPanel] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Coffee', amount: 5.50, date: new Date().toISOString() },
    { id: 2, name: 'Lunch', amount: 12.00, date: new Date().toISOString() },
  ]);

  const handleAddExpense = (name: string, amount: number) => {
    const newExpense = {
      id: Date.now(),
      name,
      amount,
      date: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 p-8 flex items-center justify-center">
      <Button onClick={() => setShowPanel(true)} size="lg">
        Open Expense Panel
      </Button>
      {showPanel && (
        <ExpensePanel
          expenses={expenses}
          totalExpenses={totalExpenses}
          ExpenseIcon={Receipt}
          onClose={() => setShowPanel(false)}
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      )}
    </div>
  );
}
