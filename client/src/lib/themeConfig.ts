import { 
  Ghost, Sparkles, Receipt,
  Flower, Wind, CloudRain,
  Sun, GlassWater,
  Snowflake, Zap, Coffee
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ThemeColors {
  headerText: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  primaryBorder: string;
  secondaryBorder: string;
  primaryBg: string;
  secondaryBg: string;
  addGoal: string;
  addGoalIcon: string;
  goalCardBorder: string;
  goalCardShadow: string;
  goalHeader: string;
  goalCompleteBorder: string;
  goalCompleteShadow: string;
  progressBar: string;
  buttonCustomLog: string;
  calendarBg: string;
  calendarBorder: string;
  calendarShadow: string;
  calendarHeader: string;
  calendarDayHeader: string;
  calendarLegendBorder: string;
  calendarLegendText: string;
}

export interface CalendarTheme {
  saved: string;
  spent: string;
  both: string;
  none: string;
}

export interface ThemeIcons {
  HeaderIcon: LucideIcon;
  SparkleIcon: LucideIcon;
  ExpenseIcon: LucideIcon;
}

export interface ThemeConfig {
  name: string;
  icon: string;
  headerTitle: string;
  IconComponents: ThemeIcons;
  gradient: string;
  floatingIcons: string[];
  confetti: string[];
  calendar: CalendarTheme;
  emptyGoalsIcon: string;
  colors: ThemeColors;
}

export type ThemeKey = 'spooky' | 'spring' | 'summer' | 'winter';

export const THEME_CONFIG: Record<ThemeKey, ThemeConfig> = {
  spooky: {
    name: 'Spooky',
    icon: '👻',
    headerTitle: 'Spooky Savings',
    IconComponents: {
      HeaderIcon: Ghost,
      SparkleIcon: Sparkles,
      ExpenseIcon: Receipt,
    },
    gradient: 'linear-gradient(to bottom, #000000 0%, #301934 50%, #6A0DAD 100%)',
    floatingIcons: ['👻', '🎃', '🧛'],
    confetti: ['💰', '✨', '💜', '🧡', '👻', '🎃'],
    calendar: {
      saved: '🎃',
      spent: '👻',
      both: '🧛',
      none: '💀',
    },
    emptyGoalsIcon: '🕸️',
    colors: {
      headerText: 'text-orange-500',
      primaryText: 'text-orange-300',
      secondaryText: 'text-orange-200',
      tertiaryText: 'text-purple-300',
      primaryBorder: 'border-orange-500/50',
      secondaryBorder: 'border-purple-500/50',
      primaryBg: 'bg-black/40',
      secondaryBg: 'bg-purple-900/50',
      addGoal: 'bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-500 hover:to-purple-500',
      addGoalIcon: 'text-orange-400',
      goalCardBorder: 'border-purple-500/50',
      goalCardShadow: 'shadow-purple-900/30',
      goalHeader: 'text-orange-300',
      goalCompleteBorder: 'border-green-500/70',
      goalCompleteShadow: 'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
      progressBar: 'bg-orange-500',
      buttonCustomLog: 'bg-orange-600 hover:bg-orange-500',
      calendarBg: 'bg-black/40',
      calendarBorder: 'border-orange-500/50',
      calendarShadow: 'shadow-orange-900/30',
      calendarHeader: 'text-orange-400',
      calendarDayHeader: 'text-purple-300',
      calendarLegendBorder: 'border-orange-600/50',
      calendarLegendText: 'text-orange-200',
    }
  },
  spring: {
    name: 'Spring',
    icon: '🌸',
    headerTitle: 'Spring Savings',
    IconComponents: {
      HeaderIcon: Flower,
      SparkleIcon: Wind,
      ExpenseIcon: CloudRain,
    },
    gradient: 'linear-gradient(to bottom, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)',
    floatingIcons: ['🌸', '🦋', '🌱', '🌷'],
    confetti: ['💰', '✨', '🌸', '🦋', '🌱', '🌷'],
    calendar: {
      saved: '🌷',
      spent: '🌧️',
      both: '🌈',
      none: '🌱',
    },
    emptyGoalsIcon: '🌼',
    colors: {
      headerText: 'text-green-700',
      primaryText: 'text-green-800',
      secondaryText: 'text-gray-700',
      tertiaryText: 'text-pink-600',
      primaryBorder: 'border-pink-400/50',
      secondaryBorder: 'border-green-500/50',
      primaryBg: 'bg-white/60',
      secondaryBg: 'bg-green-100/50',
      addGoal: 'bg-gradient-to-r from-pink-500 to-green-500 hover:from-pink-400 hover:to-green-400',
      addGoalIcon: 'text-green-600',
      goalCardBorder: 'border-green-500/50',
      goalCardShadow: 'shadow-green-900/20',
      goalHeader: 'text-green-700',
      goalCompleteBorder: 'border-green-500/70',
      goalCompleteShadow: 'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
      progressBar: 'bg-pink-500',
      buttonCustomLog: 'bg-pink-500 hover:bg-pink-400',
      calendarBg: 'bg-white/60',
      calendarBorder: 'border-pink-400/50',
      calendarShadow: 'shadow-pink-900/20',
      calendarHeader: 'text-green-700',
      calendarDayHeader: 'text-pink-600',
      calendarLegendBorder: 'border-pink-400/50',
      calendarLegendText: 'text-gray-700',
    }
  },
  summer: {
    name: 'Summer',
    icon: '☀️',
    headerTitle: 'Summer Savings',
    IconComponents: {
      HeaderIcon: Sun,
      SparkleIcon: Sparkles,
      ExpenseIcon: GlassWater,
    },
    gradient: 'linear-gradient(to bottom, #FFECB3 0%, #FFD54F 50%, #FFC107 100%)',
    floatingIcons: ['☀️', '🌴', '🍦', '🌊'],
    confetti: ['💰', '✨', '☀️', '🌴', '🍦', '🌊'],
    calendar: {
      saved: '🍦',
      spent: '💸',
      both: '🏖️',
      none: '☀️',
    },
    emptyGoalsIcon: '🍹',
    colors: {
      headerText: 'text-orange-700',
      primaryText: 'text-orange-800',
      secondaryText: 'text-gray-800',
      tertiaryText: 'text-blue-600',
      primaryBorder: 'border-blue-500/50',
      secondaryBorder: 'border-orange-500/50',
      primaryBg: 'bg-white/50',
      secondaryBg: 'bg-orange-100/50',
      addGoal: 'bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-400 hover:to-orange-400',
      addGoalIcon: 'text-orange-600',
      goalCardBorder: 'border-orange-500/50',
      goalCardShadow: 'shadow-orange-900/20',
      goalHeader: 'text-orange-700',
      goalCompleteBorder: 'border-green-500/70',
      goalCompleteShadow: 'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
      progressBar: 'bg-blue-500',
      buttonCustomLog: 'bg-blue-500 hover:bg-blue-400',
      calendarBg: 'bg-white/50',
      calendarBorder: 'border-blue-500/50',
      calendarShadow: 'shadow-blue-900/20',
      calendarHeader: 'text-orange-700',
      calendarDayHeader: 'text-blue-600',
      calendarLegendBorder: 'border-blue-500/50',
      calendarLegendText: 'text-gray-800',
    }
  },
  winter: {
    name: 'Winter',
    icon: '❄️',
    headerTitle: 'Winter Savings',
    IconComponents: {
      HeaderIcon: Snowflake,
      SparkleIcon: Zap,
      ExpenseIcon: Coffee,
    },
    gradient: 'linear-gradient(to bottom, #E3F2FD 0%, #90CAF9 50%, #42A5F5 100%)',
    floatingIcons: ['❄️', '⛄', '🎿', '🏂'],
    confetti: ['💰', '✨', '❄️', '⛄', '🎿', '🏂'],
    calendar: {
      saved: '⛄',
      spent: '🌨️',
      both: '🎿',
      none: '❄️',
    },
    emptyGoalsIcon: '⛷️',
    colors: {
      headerText: 'text-blue-700',
      primaryText: 'text-blue-800',
      secondaryText: 'text-gray-700',
      tertiaryText: 'text-cyan-600',
      primaryBorder: 'border-cyan-400/50',
      secondaryBorder: 'border-blue-500/50',
      primaryBg: 'bg-white/60',
      secondaryBg: 'bg-blue-100/50',
      addGoal: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400',
      addGoalIcon: 'text-blue-600',
      goalCardBorder: 'border-blue-500/50',
      goalCardShadow: 'shadow-blue-900/20',
      goalHeader: 'text-blue-700',
      goalCompleteBorder: 'border-green-500/70',
      goalCompleteShadow: 'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
      progressBar: 'bg-cyan-500',
      buttonCustomLog: 'bg-cyan-500 hover:bg-cyan-400',
      calendarBg: 'bg-white/60',
      calendarBorder: 'border-cyan-400/50',
      calendarShadow: 'shadow-cyan-900/20',
      calendarHeader: 'text-blue-700',
      calendarDayHeader: 'text-cyan-600',
      calendarLegendBorder: 'border-cyan-400/50',
      calendarLegendText: 'text-gray-700',
    }
  },
};
