import type { ThemeConfig } from '@/lib/themeConfig';

interface DailyActivity {
  saved: number;
  spent: number;
}

interface SavingsCalendarProps {
  dailyActivities: Record<string, DailyActivity>;
  theme: ThemeConfig;
}

export default function SavingsCalendar({ dailyActivities, theme }: SavingsCalendarProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarTheme = theme.calendar;
  const colors = theme.colors;
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays: Array<{
    type: 'empty' | 'day';
    day?: number;
    emoji?: string;
    className?: string;
    isToday?: boolean;
  }> = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ type: 'empty' });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const activity = dailyActivities[dateKey];
    
    let emoji = calendarTheme.none;
    let className = 'text-gray-500';

    if (activity) {
      const hasSaved = activity.saved > 0;
      const hasSpent = activity.spent > 0;

      if (hasSaved && hasSpent) {
        emoji = calendarTheme.both;
        className = 'text-yellow-400 bg-purple-900/50 border-yellow-400';
      } else if (hasSaved) {
        emoji = calendarTheme.saved;
        className = 'text-orange-400 bg-green-900/50 border-orange-400';
      } else if (hasSpent) {
        emoji = calendarTheme.spent;
        className = 'text-red-400 bg-red-900/50 border-red-400';
      }
    }
    
    calendarDays.push({ 
      type: 'day', 
      day, 
      emoji, 
      className,
      isToday: day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()
    });
  }

  return (
    <div 
      className={`${colors.calendarBg} backdrop-blur-sm p-4 rounded-xl border-2 ${colors.calendarBorder} shadow-lg ${colors.calendarShadow} w-full max-w-sm mx-auto`}
      data-testid="calendar-container"
    >
      <h3 className={`text-xl font-bold ${colors.calendarHeader} text-center mb-3`}>
        {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Tracker
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((d, i) => (
          <div key={i} className={`text-sm font-semibold ${colors.calendarDayHeader}`}>
            {d}
          </div>
        ))}
        {calendarDays.map((cell, index) => (
          <div key={index} className="aspect-square flex flex-col justify-center items-center text-sm p-0 rounded-lg">
            {cell.type === 'day' ? (
              <div 
                className={`w-full h-full flex flex-col items-center justify-center rounded-lg border-2 transition-all duration-200 ${cell.className} ${
                  cell.isToday ? 'border-4 border-yellow-300 scale-105 shadow-xl' : 'border-transparent hover:scale-105'
                }`}
                title={cell.isToday ? "Today" : `Day ${cell.day}`}
                data-testid={cell.isToday ? 'calendar-today' : `calendar-day-${cell.day}`}
              >
                <span className="text-base leading-none">{cell.emoji}</span>
                <span className="text-xs font-medium leading-none mt-0.5">{cell.day}</span>
              </div>
            ) : (
              <div className="w-full h-full rounded-lg bg-transparent"></div>
            )}
          </div>
        ))}
      </div>
      <div className={`mt-3 pt-2 border-t ${colors.calendarLegendBorder} text-xs ${colors.calendarLegendText} flex flex-wrap justify-center gap-x-4 gap-y-1`}>
        <p><span className="text-base">{calendarTheme.saved}</span> Saved</p>
        <p><span className="text-base">{calendarTheme.spent}</span> Spent</p>
        <p><span className="text-base">{calendarTheme.both}</span> Saved & Spent</p>
        <p><span className="text-base">{calendarTheme.none}</span> No Activity</p>
      </div>
    </div>
  );
}
