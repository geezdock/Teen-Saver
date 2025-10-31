import { useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher';
import type { ThemeKey } from '@/lib/themeConfig';

export default function ThemeSwitcherExample() {
  const [theme, setTheme] = useState<ThemeKey>('spooky');

  return (
    <div className="p-8 bg-gradient-to-b from-purple-900 to-black min-h-screen flex items-center justify-center">
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
    </div>
  );
}
