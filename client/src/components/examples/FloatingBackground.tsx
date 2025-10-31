import FloatingBackground from '../FloatingBackground';

export default function FloatingBackgroundExample() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-purple-700 relative overflow-hidden">
      <FloatingBackground icons={['👻', '🎃', '🧛']} />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-white text-4xl font-bold">Floating Background Demo</div>
      </div>
    </div>
  );
}
