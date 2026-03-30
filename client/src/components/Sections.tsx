import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, Code, Briefcase, Lightbulb, Zap, Award, Target, Flame } from 'lucide-react';

// Section Profil - Enrichie
export function ProfilSection() {
  const stats = [
    { label: 'Stages Réalisés', value: '3', icon: Briefcase },
    { label: 'Projets Personnels', value: '2', icon: Code },
    { label: 'Certifications', value: '2', icon: Award },
    { label: 'Années d\'Expérience', value: '5 mois', icon: Flame },
  ];

  const competences_principales = [
    'Python', 'JavaScript/TypeScript', 'React', 'Tailwind CSS', 'SQL', 'Linux', 'Git', 'Docker'
  ];

  return (
    <section className="py-32 bg-background relative">
      <div className="container max-w-6xl section-enter">
        {/* En-tête */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Rayhan <span className="text-gradient">MAOUACI</span>
          </h1>
          <p className="text-2xl text-cyan-400 font-medium mb-2">
            Développeur & Passionné d'IA
          </p>
          <p className="text-gray-400 text-lg max-w-3xl">
            Étudiant en Terminale CIEL, je construis mon avenir entre sécurité, développement et projets concrets. 
            En recherche d'alternance BTS SIO SLAM à Ynov Aix-en-Provence.
          </p>
        </div>

        {/* Bio complète */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="card-premium p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">À Propos</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Enchanté, je suis Rayhan — passionné par la technologie depuis le lycée. Fort de 3 stages en infrastructure 
                  et électronique (Préfecture du Var, MT Fiber, CTV Électronique), j'ai développé une expertise solide en 
                  systèmes, réseaux et diagnostic matériel.
                </p>
                <p>
                  Développeur autodidacte avec deux projets personnels à mon actif (portfolio et assistant IA), je maîtrise 
                  Python, JavaScript et React. Certifié Pix et habilité électrique, je recherche une alternance BTS SIO SLAM 
                  pour transformer ma passion en expertise professionnelle.
                </p>
                <p>
                  Rigueur, discipline et mentalité d'apprentissage constant — voilà ce qui me définit. Mobilité assurée, 
                  disponibilité immédiate.
                </p>
              </div>
            </div>
          </div>

          {/* Infos clés */}
          <div className="space-y-4">
            <div className="card-premium p-6 rounded-xl">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Infos Clés</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase">Âge</p>
                  <p className="text-white font-semibold">18 ans</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase">Formation</p>
                  <p className="text-white font-semibold">Terminale Bac Pro CIEL</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase">École</p>
                  <p className="text-white font-semibold">Lycée Georges Cisson</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase">Localisation</p>
                  <p className="text-white font-semibold">Toulon, France</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase">Mobilité</p>
                  <p className="text-white font-semibold">Permis AM (BSR)</p>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 rounded-xl">
              <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">Langues</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-white font-semibold text-sm">Français</p>
                  <p className="text-gray-400 text-xs">Courant</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Anglais</p>
                  <p className="text-gray-400 text-xs">Technique</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-box">
                <Icon className="text-blue-400 mx-auto mb-3" size={28} />
                <div className="stat-number mb-2">{stat.value}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Compétences principales */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Compétences Principales</h2>
          <div className="flex flex-wrap gap-3">
            {competences_principales.map((comp, idx) => (
              <span key={idx} className="badge-tech">
                {comp}
              </span>
            ))}
          </div>
        </div>

        {/* Centres d'intérêt */}
        <div className="card-premium p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Au-delà du Code</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-cyan-400 font-bold mb-2">💪 Sport & Discipline</p>
              <p className="text-gray-400 text-sm">Musculation, football et boxe pour l'endurance et la discipline qu'ils exigent.</p>
            </div>
            <div>
              <p className="text-purple-400 font-bold mb-2">🔧 Bricolage Tech</p>
              <p className="text-gray-400 text-sm">Monter et configurer du matériel informatique me fascine autant que de coder.</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold mb-2">🚀 Nouvelles Technologies</p>
              <p className="text-gray-400 text-sm">Curiosité constante pour les innovations et les tendances technologiques.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section Compétences
export function CompetencesSection() {
  const competences = [
    {
      icon: Code,
      titre: 'Programmation',
      items: ['Python', 'JavaScript/TypeScript', 'Java', 'C/C++', 'SQL'],
    },
    {
      icon: Briefcase,
      titre: 'Web Development',
      items: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'HTML/CSS'],
    },
    {
      icon: Lightbulb,
      titre: 'Intelligence Artificielle',
      items: ['Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow'],
    },
    {
      icon: Code,
      titre: 'Cybersécurité',
      items: ['Pentesting', 'Cryptographie', 'Réseaux', 'Linux'],
    },
    {
      icon: Briefcase,
      titre: 'Outils & Plateformes',
      items: ['Git/GitHub', 'Docker', 'AWS', 'Jupyter'],
    },
    {
      icon: Lightbulb,
      titre: 'Soft Skills',
      items: ['Résolution de problèmes', 'Travail en équipe', 'Communication'],
    },
  ];

  return (
    <section className="py-20 bg-background section-enter">
      <div className="container max-w-6xl">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">
          Compétences
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competences.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div
                key={idx}
                className="card-premium p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-blue-400" size={24} />
                  <h3 className="text-lg font-bold text-white">{comp.titre}</h3>
                </div>
                <ul className="space-y-2">
                  {comp.items.map((item, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Section Stages
export function StagesSection() {
  const stages = [
    {
      periode: 'Janvier 2026 – 1 mois',
      entreprise: 'Préfecture du Var, Toulon',
      poste: 'Technicien Systèmes et Réseaux (SIDSIC)',
      icon: Zap,
      taches: [
        'Support technique aux utilisateurs (Préfecture et DDI)',
        'Maintenance du parc informatique et installation de postes',
        'Gestion des incidents et des droits d\'accès',
        'Application des procédures de sécurité des SI de l\'État',
      ],
    },
    {
      periode: 'Octobre 2025 – 1 mois',
      entreprise: 'MT Fiber, La Garde',
      poste: 'Technicien Fibre',
      icon: Zap,
      taches: [
        'Tirage, raccordement et tests de fibre optique',
        'Installation et mise en service de box Internet',
        'Assistance technique et résolution d\'incidents sur site',
        'Application des normes de sécurité et procédures',
      ],
    },
    {
      periode: 'Juin 2024 – 3 mois',
      entreprise: 'CTV Électronique, Toulon',
      poste: 'Assistant Technicien',
      icon: Zap,
      taches: [
        'Diagnostic et maintenance d\'équipements électroniques',
        'Installation et configuration de réseaux de caméras de surveillance',
        'Tests qualité avant expédition',
        'Support technique en atelier et sur site',
        'Dépannage matériel (cartes électroniques, alimentations, multimètre)',
      ],
    },
  ];

  return (
    <section className="py-20 bg-background section-enter">
      <div className="container max-w-6xl">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">
          Expériences Professionnelles
        </h2>

        <div className="space-y-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="card-premium p-8 rounded-xl timeline-item"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Icon className="text-blue-400 mt-1" size={24} />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{stage.poste}</h3>
                        <p className="text-cyan-400 font-medium">{stage.entreprise}</p>
                      </div>
                      <p className="text-gray-400 text-sm whitespace-nowrap">{stage.periode}</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-8">
                  {stage.taches.map((tache, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      {tache}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Section Projets
export function ProjetsSection() {
  const projets = [
    {
      annee: '2025',
      titre: 'Mon Portfolio',
      description: 'Conception et développement complet de mon portfolio professionnel pour présenter mon parcours, mes compétences et mes projets techniques. Site vitrine moderne et évolutif avec design contemporain et animations fluides.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Design'],
      icon: '🌐',
    },
    {
      annee: '2025',
      titre: 'Développement IA (RayhAI)',
      description: 'Conception complète d\'un assistant IA avancé intégré directement au portfolio. Interface moderne avec bulle intelligente et panel dynamique, intégration de l\'API Claude pour des interactions en temps réel.',
      technologies: ['JavaScript', 'API Claude', 'UI/UX', 'IA'],
      icon: '🤖',
    },
  ];

  return (
    <section className="py-20 bg-background section-enter">
      <div className="container max-w-6xl">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">
          Projets Personnels
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projets.map((projet, idx) => (
            <div
              key={idx}
              className="card-premium rounded-xl overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <span className="text-6xl">{projet.icon}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-bold">{projet.annee}</span>
                  <span className="text-gray-600">•</span>
                  <h3 className="text-lg font-bold text-white">
                    {projet.titre}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{projet.description}</p>
                <div className="flex flex-wrap gap-2">
                  {projet.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="badge-tech"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section Mindset
export function MindsetSection() {
  return (
    <section className="py-20 bg-background section-enter">
      <div className="container max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Mindset & Philosophie
        </h2>

        <div className="space-y-8">
          <div className="card-premium p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ma Philosophie
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Je suis passionné par l'innovation technologique et l'intelligence artificielle. Je crois que la technologie peut résoudre les problèmes complexes et améliorer la vie des gens. Mon objectif est de devenir un expert en IA et en cybersécurité.
            </p>
          </div>

          <div className="card-premium p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Ce qui me Drive
            </h3>
            <ul className="space-y-3">
              {[
                'Apprendre continuellement et maîtriser de nouvelles technologies',
                'Résoudre des problèmes complexes avec des solutions élégantes',
                'Contribuer à des projets qui ont un impact positif',
                'Collaborer avec des personnes passionnées et innovantes',
              ].map((item, idx) => (
                <li key={idx} className="text-gray-300 flex items-start gap-3">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {['Excellence', 'Innovation', 'Intégrité'].map((val, idx) => (
              <div
                key={idx}
                className="card-premium rounded-xl p-6 text-center"
              >
                <p className="text-blue-400 font-bold text-lg">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Section Contact
export function ContactSection() {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Charger EmailJS dynamiquement
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js';
      script.onload = async () => {
        // @ts-ignore
        window.emailjs.init('53Rv3ywF7wqL1UDru');
        
        // @ts-ignore
        await window.emailjs.send('service_contact', 'template_contact', {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'rayhan.maouaci@gmail.com',
        });

        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Erreur d\'envoi:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background section-enter">
      <div className="container max-w-2xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Contact
        </h2>

        <div className="card-premium p-8 rounded-xl mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Envoyez-moi un message
          </h3>

          {submitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
              ✅ Message envoyé avec succès ! Je vous répondrai bientôt.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-input border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-input border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-input border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>

        {/* Liens de Contact */}
        <div className="flex justify-center gap-8">
          <a
            href="mailto:rayhan.maouaci@gmail.com"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            title="Email"
          >
            <Mail size={24} />
          </a>
          <a
            href="https://github.com/RayhanMAOUACI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            title="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/rayhanmaouaci/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
