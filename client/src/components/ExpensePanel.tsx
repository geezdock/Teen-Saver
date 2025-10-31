import { MinusCircle, Trash2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
}

interface ExpensePanelProps {
  expenses: Expense[];
  totalExpenses: number;
  ExpenseIcon: LucideIcon;
  onClose: () => void;
  onAddExpense: (name: string, amount: number) => void;
  onDeleteExpense: (id: number) => void;
}

export default function ExpensePanel({ 
  expenses, 
  totalExpenses, 
  ExpenseIcon,
  onClose, 
  onAddExpense, 
  onDeleteExpense 
}: ExpensePanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (name && amount && parseFloat(amount) > 0) {
      onAddExpense(name, parseFloat(amount));
      setName('');
      setAmount('');
      setShowForm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 border-4 border-red-500/80 p-6 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all shadow-[0_0_40px_rgba(255,0,0,0.4)]">
        <div className="flex justify-between items-center mb-6 border-b pb-3 border-red-500/50">
          <h2 className="text-3xl font-bold text-red-400 flex items-center gap-2">
            <ExpenseIcon className="w-6 h-6" />
            Expense Tracker
          </h2>
          <button
            onClick={onClose}
            className="text-red-300 hover:text-white transition-colors p-2 rounded-full hover:bg-red-800/50"
            data-testid="button-close-expense-panel"
          >
            <MinusCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6 p-4 rounded-xl bg-red-900/40 border border-red-500/50">
          <p className="text-sm text-red-300">Total Expenses</p>
          <p className="text-3xl font-bold text-red-400 font-mono" data-testid="total-expenses">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            className="w-full mb-6 bg-red-600 hover:bg-red-500 text-white"
            data-testid="button-show-expense-form"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log New Expense
          </Button>
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-red-300">New Expense</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-red-400 hover:text-white"
                data-testid="button-cancel-expense"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="Expense name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/30 border-red-500/30 text-white placeholder:text-gray-500"
                data-testid="input-expense-name"
              />
              <Input
                type="number"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/30 border-red-500/30 text-white placeholder:text-gray-500"
                data-testid="input-expense-amount"
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-red-500 text-white"
                data-testid="button-submit-expense"
              >
                Add Expense
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-red-300">Recent Expenses</h3>
          {expenses.length === 0 ? (
            <p className="text-center text-red-400/60 py-8">No expenses logged yet</p>
          ) : (
            expenses.slice().reverse().map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-3 rounded-lg bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 transition-colors"
                data-testid={`expense-${expense.id}`}
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{expense.name}</p>
                  <p className="text-sm text-red-300">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-400 font-bold font-mono">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    data-testid={`button-delete-expense-${expense.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
