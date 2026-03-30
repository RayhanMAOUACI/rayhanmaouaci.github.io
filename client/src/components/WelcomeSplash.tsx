import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeSplashProps {
  onEnter: () => void;
}

export default function WelcomeSplash({ onEnter }: WelcomeSplashProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Fond animé */}
      <div className="animated-bg" />

      {/* Contenu */}
      <div className="relative z-10 container max-w-2xl text-center px-4 fade-in">
        {/* Avatar/Logo */}
        <div className="mb-8 inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
            RM
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Rayhan <span className="text-gradient">MAOUACI</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-2xl md:text-3xl text-cyan-400 font-medium mb-8">
          Développeur & Passionné d'IA
        </p>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Étudiant en Terminale CIEL • Cybersécurité & Développement
        </p>

        {/* Infos clés */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
          <div className="card-premium p-4 rounded-lg">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Localisation</p>
            <p className="text-white font-semibold">📍 Toulon</p>
          </div>
          <div className="card-premium p-4 rounded-lg">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Formation</p>
            <p className="text-white font-semibold">🎓 BTS SIO SLAM 2026</p>
          </div>
          <div className="card-premium p-4 rounded-lg">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Statut</p>
            <p className="text-white font-semibold">🔍 Alternance 2026</p>
          </div>
        </div>

        {/* CTA Principal */}
        <button
          onClick={handleEnter}
          disabled={isLoading}
          className="btn-premium inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold mb-8 group"
        >
          Accéder au Portfolio
          <ArrowRight
            size={20}
            className={`transition-transform ${isLoading ? 'translate-x-1' : 'group-hover:translate-x-1'}`}
          />
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-sm">
          <span className="text-gray-400 font-mono">23:28</span> • Bienvenue sur mon portfolio
        </p>
      </div>
    </div>
  );
}
