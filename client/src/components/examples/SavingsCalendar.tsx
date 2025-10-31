import SavingsCalendar from '../SavingsCalendar';
import { THEME_CONFIG } from '@/lib/themeConfig';

export default function SavingsCalendarExample() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  
  const mockActivities = {
    [`${year}-${month}-05`]: { saved: 10, spent: 0 },
    [`${year}-${month}-10`]: { saved: 0, spent: 15 },
    [`${year}-${month}-15`]: { saved: 20, spent: 5 },
    [`${year}-${month}-${String(today.getDate()).padStart(2, '0')}`]: { saved: 25, spent: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 p-8 flex items-center justify-center">
      <SavingsCalendar 
        dailyActivities={mockActivities} 
        theme={THEME_CONFIG.spooky} 
      />
    </div>
  );
}
