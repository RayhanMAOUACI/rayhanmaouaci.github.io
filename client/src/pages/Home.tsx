import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import RayhAI from '@/components/RayhAI';
import WelcomeSplash from '@/components/WelcomeSplash';
import {
  ProfilSection,
  CompetencesSection,
  StagesSection,
  ProjetsSection,
  MindsetSection,
  ContactSection,
} from '@/components/Sections';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('profil');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Si l'utilisateur n'a pas encore accédé au portfolio, afficher la page de splash
  if (!hasEntered) {
    return <WelcomeSplash onEnter={() => setHasEntered(true)} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profil':
        return <ProfilSection />;
      case 'competences':
        return <CompetencesSection />;
      case 'stages':
        return <StagesSection />;
      case 'projets':
        return <ProjetsSection />;
      case 'mindset':
        return <MindsetSection />;
      case 'contact':
        return <ContactSection />;
      case 'rayhai':
        return (
          <section className="py-20 bg-background section-enter">
            <div className="container max-w-2xl text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                RayhAI Assistant
              </h2>
              <p className="text-gray-400 mb-8">
                L'assistant IA personnel de Rayhan est disponible en bas à droite de l'écran.
              </p>
              <div className="card-premium rounded-lg p-8">
                <p className="text-blue-400 text-lg font-medium">
                  💬 Cliquez sur le bouton pour poser vos questions!
                </p>
              </div>
            </div>
          </section>
        );
      default:
        return <ProfilSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Fond animé */}
      <div className="animated-bg" />

      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className={`relative z-10 ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-card border-t border-blue-900 py-8">
        <div className="container text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Rayhan MAOUACI. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Portfolio développé avec React et Tailwind CSS.
          </p>
        </div>
      </footer>

      <RayhAI />
    </div>
  );
}
