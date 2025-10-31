import { THEME_CONFIG, type ThemeKey } from '@/lib/themeConfig';

interface ThemeSwitcherProps {
  currentTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const themes: ThemeKey[] = ['spooky', 'spring', 'summer', 'winter'];

  return (
    <div className="flex gap-1 p-1 bg-black/30 rounded-full" data-testid="theme-switcher">
      {themes.map((themeKey) => {
        const theme = THEME_CONFIG[themeKey];
        const isSelected = currentTheme === themeKey;
        return (
          <button
            key={themeKey}
            onClick={() => onThemeChange(themeKey)}
            title={theme.name}
            data-testid={`button-theme-${themeKey}`}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
              isSelected ? 'bg-white/90 text-black shadow-lg' : 'text-white/70 hover:bg-white/20'
            }`}
          >
            <span className="text-base">{theme.icon}</span>
            <span className={isSelected ? 'block' : 'hidden sm:block'}>{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
}
