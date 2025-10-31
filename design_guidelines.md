# Design Guidelines: Themed Savings Tracker

## Design Approach
**Reference-Based with Playful Enhancement**: Drawing inspiration from gamified productivity apps like Habitica and Duolingo, combined with the clean card-based layouts of modern fintech apps like Mint and YNAB. The design balances utility-focused savings tracking with delightful, theme-driven visual experiences.

## Core Design Principles
1. **Thematic Immersion**: Each theme (Spooky, Spring, Summer) creates a complete atmospheric experience through coordinated colors, icons, and animations
2. **Playful Gamification**: Visual rewards (confetti, progress animations) celebrate user achievements
3. **Clear Information Hierarchy**: Despite the playful aesthetics, financial data remains easily scannable
4. **Seasonal Flexibility**: Design system accommodates multiple themes without code duplication

## Typography

**Font Stack**: Google Fonts via CDN
- Primary: Inter (400, 500, 600, 700) - clean, modern readability for financial data
- Display/Numbers: JetBrains Mono (500, 700) - monospaced for currency amounts and statistics

**Hierarchy**:
- Page Title: text-2xl font-bold (theme-specific header colors)
- Section Headers: text-xl font-bold (theme-specific colors)
- Goal Names: text-lg font-semibold
- Body Text: text-base font-medium
- Labels/Secondary: text-sm font-medium
- Financial Amounts: text-2xl font-bold (JetBrains Mono)
- Calendar Day Numbers: text-xs font-medium

## Layout System

**Spacing Units**: Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16, 20
- Component padding: p-4 to p-8
- Card spacing: p-6
- Section gaps: gap-4 to gap-8
- Margin between major sections: mt-8 to mt-12

**Container Structure**:
- Main container: min-h-screen with theme gradient background
- Content wrapper: max-w-6xl mx-auto px-4 py-8
- Card max-width: max-w-sm to max-w-2xl depending on content
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for goal cards

## Theme System

**Theme Switcher**:
- Fixed position top-right of header
- Pill-shaped container with rounded-full
- Each theme button shows emoji icon + name
- Active state: bg-white/90 with shadow-lg
- Inactive: text-white/70 with hover:bg-white/20
- Smooth transitions between all states

**Background Gradients** (applied to body/main container):
- Spooky: Black to deep purple (#000000 → #301934 → #6A0DAD)
- Spring: Light cyan to turquoise (#E0F7FA → #B2EBF2 → #80DEEA)
- Summer: Cream to golden yellow (#FFECB3 → #FFD54F → #FFC107)

## Component Library

### Header
- Full-width with backdrop-blur-sm
- Contains: App title, theme icon, theme switcher
- Height: h-20
- Shadow: shadow-lg with theme-specific shadow color
- Border-bottom: border-2 with theme-specific border color

### Goal Cards
- Rounded-xl borders with border-2
- Backdrop-blur-sm with theme-specific background opacity (bg-black/40 or bg-white/60)
- Shadow-lg with theme-specific shadow colors
- Padding: p-6
- Completed goals: Pulsing green border glow (shadow-[0_0_25px_rgba(16,185,129,0.5)])

### Progress Bars
- Full-width container with rounded-full bg-gray-700/30
- Inner bar: h-3 rounded-full with theme-specific progress color
- Smooth transition-all duration-500
- Percentage text: Positioned top-right of container

### Calendar Component
- Grid: grid-cols-7 for weekday layout
- Day cells: aspect-square with rounded-lg
- Today indicator: border-4 border-yellow-300 with scale-105
- Activity states shown via emoji + border colors
- Legend at bottom with border-t separator

### Buttons
**Add Goal Button** (primary CTA):
- Large: px-8 py-4
- Gradient background (theme-specific dual-color gradient)
- Rounded-xl with shadow-xl
- Icon + text combination
- Hover: Slightly lighter gradient shades

**Custom Log/Action Buttons**:
- Medium: px-6 py-3
- Solid theme-specific color
- Rounded-lg with shadow-md
- Hover: Slightly lighter shade
- Disabled state: opacity-50 cursor-not-allowed

**Delete/Remove Buttons**:
- Small icon buttons: p-2
- Transparent with hover:bg-red-500/20
- Red icon color (text-red-400)
- Rounded-lg

### Input Fields
- Rounded-lg borders with border-2
- Theme-specific border colors
- Padding: px-4 py-3
- Background: bg-white/10 backdrop-blur-sm
- Focus state: ring-2 with theme-specific ring color
- Placeholder: placeholder-gray-400

### Empty States
- Centered content with theme-specific emoji icon (large text-6xl)
- Descriptive text below icon
- Muted colors for secondary text
- Padding: py-12

## Animations

**Confetti System** (used sparingly for goal completion):
- Canvas-based particle system
- Theme-specific emoji confetti pieces
- Physics-based falling animation with rotation
- Auto-dismiss after 3-4 seconds
- Does not block user interaction

**Floating Background** (ambient, subtle):
- 30-40 themed emoji elements
- Slow upward float animation (30-60s duration)
- Low opacity (0.2-0.6)
- Random positioning and delays
- Does not interfere with readability

**State Transitions**:
- Button hovers: transition-all duration-200
- Card appearances: fade-in with transition-opacity duration-300
- Progress bar fills: transition-all duration-500
- Theme switches: Smooth gradient and color transitions

## Images

No photographic images needed. The app relies entirely on:
- Emoji icons for thematic elements
- Lucide React icon components for UI actions
- Gradient backgrounds for atmosphere
- SVG-based progress indicators

This creates a lightweight, performant experience where visual interest comes from color, animation, and iconography rather than image assets.