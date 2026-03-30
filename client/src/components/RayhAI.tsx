import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'rayhan';
  timestamp: Date;
}

export default function RayhAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Suggestions de questions
  const suggestions = [
    { text: 'Qui es-tu ?', emoji: '👤' },
    { text: 'Parle-moi de tes projets', emoji: '💻' },
    { text: 'Tes compétences ?', emoji: '🛠️' },
    { text: 'Tu cherches une alternance ?', emoji: '🔍' },
  ];

  // Base de connaissances enrichie avec ton naturel et authentique
  const knowledgeBase: Record<string, string> = {
    // Salutations informelles
    'salut': 'Salut ! Ça va ? Bienvenue sur mon portfolio ! 👋',
    'hello': 'Yo ! Ça va bien ? Je suis Rayhan. Tu veux en savoir plus sur moi ?',
    'coucou': 'Coucou ! Merci de passer par là. Comment je peux t\'aider ?',
    'ça va': 'Ouais ça va bien merci ! Et toi ? Tu viens checker mon portfolio ?',
    'comment ça va': 'Franchement ça va bien ! Je suis en train de bosser sur mes projets et ma recherche d\'alternance. Et toi, ça roule ?',

    // Qui es-tu ?
    'qui es tu': 'Je suis Rayhan MAOUACI, étudiant en Terminale Bac Pro CIEL à Toulon. Passionné par la cybersécurité et le développement. Je prépare un BTS SIO option SLAM pour 2026 et je recherche une alternance. C\'est cool que tu passes !',
    'qui suis je': 'Tu es sur mon portfolio ! Je suis Rayhan, développeur en herbe et passionné d\'IA. 😄',
    'rayhan': 'Ouais c\'est moi ! Enchanté. T\'as des questions ?',

    // Âge et localisation
    'age': 'J\'ai 18 ans. Je suis encore jeune mais déjà bien motivé pour la tech !',
    'quel age': 'J\'ai 18 ans. Pourquoi, tu pensais que j\'étais plus vieux ? 😄',
    'toulon': 'Ouais, je suis basé à Toulon. C\'est pas la capitale de la tech, mais y\'a de bonnes opportunités ici !',
    'd\'où': 'Je suis de Toulon, dans le sud. Mais je suis ouvert à une alternance n\'importe où, surtout à Aix-en-Provence pour Ynov !',

    // Formation
    'formation': 'Je suis en Terminale Bac Pro CIEL (Cybersécurité, Informatique, Électronique & Réseaux) au lycée Georges Cisson. C\'est une formation bien complète qui me prépare bien pour le BTS SIO SLAM.',
    'bac pro': 'Ouais, je suis en Bac Pro CIEL. C\'est une formation qui couvre la cybersécurité, l\'informatique, l\'électronique et les réseaux. Vraiment cool pour avoir une vue d\'ensemble !',
    'bts': 'Je vise un BTS SIO option SLAM à Ynov Aix-en-Provence à partir de septembre 2026. C\'est du 2 jours de cours / 3 jours en entreprise, donc je cherche une alternance.',
    'ynov': 'Ynov Aix-en-Provence, ouais ! C\'est là que je veux faire mon BTS SIO SLAM en alternance. T\'as des infos sur Ynov ?',

    // Compétences
    'competences': 'Je maîtrise Python, JavaScript, React, Tailwind CSS, SQL, Linux, Git et Docker. Mais franchement, ce qui me plaît le plus c\'est d\'apprendre de nouvelles choses. Les langages, c\'est cool, mais la mentalité c\'est plus important.',
    'python': 'Ouais, Python c\'est mon langage préféré pour les projets perso. C\'est puissant et flexible. T\'utilises Python aussi ?',
    'javascript': 'JavaScript, c\'est mon truc pour le web. React surtout, c\'est vraiment cool pour construire des interfaces. Mon portfolio est fait avec React d\'ailleurs !',
    'react': 'React c\'est dingue pour le frontend. J\'adore la réactivité et la modularité. Mon portfolio utilise React avec Tailwind CSS.',
    'cybersecurite': 'La cybersécurité, c\'est une vraie passion pour moi. Pas juste un truc d\'école. Je fais de la veille active, j\'essaie de comprendre comment les systèmes peuvent être compromis.',
    'dev': 'Le développement c\'est ma passion. Construire quelque chose qui fonctionne vraiment, c\'est satisfaisant. Surtout quand c\'est utile.',
    'tes competences': 'Je maîtrise Python, JavaScript, React, Tailwind CSS, SQL, Linux, Git et Docker. Mais franchement, ce qui me plaît le plus c\'est d\'apprendre de nouvelles choses. Les langages, c\'est cool, mais la mentalité c\'est plus important.',

    // Projets
    'projets': 'J\'ai réalisé deux projets perso en 2025 : mon portfolio (que tu visites en ce moment !) et RayhAI, un assistant IA intégré au portfolio. Les deux m\'ont appris pas mal de trucs.',
    'portfolio': 'C\'est celui-ci ! J\'ai conçu et développé mon portfolio pour présenter mon parcours, mes compétences et mes projets. Design moderne, animations fluides, tout ça. C\'est du HTML/CSS/JavaScript avec React.',
    'rayhai': 'RayhAI, c\'est moi qui parle en ce moment ! 😄 C\'est un assistant IA intégré au portfolio. J\'ai travaillé sur l\'interface et la base de connaissances pour que ce soit cool et utile.',
    'ai': 'L\'IA c\'est un domaine qui m\'intéresse vraiment. Pas juste pour faire du hype, mais vraiment comprendre comment ça fonctionne. C\'est pour ça que j\'ai créé RayhAI.',
    'parle moi de tes projets': 'J\'ai réalisé deux projets perso en 2025 : mon portfolio (que tu visites en ce moment !) et RayhAI, un assistant IA intégré au portfolio. Les deux m\'ont appris pas mal de trucs.',

    // Stages
    'stages': 'J\'ai fait 3 stages entre 2024 et 2026 : Préfecture du Var (janvier 2026), MT Fiber (octobre 2025) et CTV Électronique (juin 2024). Chacun m\'a appris des trucs différents.',
    'prefecture': 'À la Préfecture du Var en janvier 2026, j\'ai fait du support technique, maintenance informatique et gestion des incidents. C\'était dans un environnement de sécurité d\'État, donc très rigoureux.',
    'mt fiber': 'Chez MT Fiber en octobre 2025, j\'ai travaillé sur le déploiement de fibre optique. Tirage, raccordement, tests. C\'était du terrain, c\'était cool.',
    'ctv': 'Chez CTV Électronique en juin 2024, j\'ai fait du diagnostic et maintenance d\'équipements, installation de systèmes de surveillance. C\'est là que j\'ai vraiment compris l\'importance de la rigueur.',

    // Alternance
    'alternance': 'Je recherche une alternance pour mon BTS SIO SLAM à partir de septembre 2026. Rythme : 2 jours de cours / 3 jours en entreprise. Je cherche une boîte où je peux vraiment progresser et contribuer.',
    'recherche': 'Ouais, je recherche activement une alternance pour 2026. Si tu connais une entreprise intéressée, je suis ouvert à discuter !',
    'entreprise': 'Je cherche une entreprise qui peut m\'accueillir en alternance BTS SIO SLAM. Idéalement quelque chose en lien avec le dev ou la cybersécurité, mais je suis ouvert à apprendre.',
    'tu cherches une alternance': 'Ouais, je recherche activement une alternance pour 2026. Si tu connais une entreprise intéressée, je suis ouvert à discuter !',

    // Motivations
    'motivation': 'Ce qui me drive, c\'est la résolution de problèmes complexes et la création de trucs qui ont du sens. Pas juste du code pour du code, mais du code qui améliore les choses.',
    'passion': 'Ma passion c\'est la tech, franchement. Depuis le lycée, j\'ai toujours voulu comprendre comment les systèmes fonctionnent. C\'est pour ça que je fais des stages, des projets perso, et que je maintiens une veille active.',
    'pourquoi': 'Pourquoi quoi ? 😄 Si tu me demandes pourquoi je fais de la tech, c\'est parce que j\'aime ça. C\'est simple mais vrai.',

    // Personnalité
    'sport': 'Je fais de la musculation, du football et de la boxe. Pas juste pour être fit, mais parce que la discipline physique renforce la discipline mentale. C\'est important pour moi.',
    'loisirs': 'À part la tech, je fais du sport (musculation, football, boxe), du bricolage informatique (monter des machines, configurer des réseaux), et je suis toujours curieux des nouvelles technologies.',
    'bricolage': 'Ouais, j\'aime bien bricoler avec du matériel informatique. Monter une machine, configurer un réseau, c\'est satisfaisant. Ça m\'aide à mieux comprendre comment tout fonctionne.',

    // Philosophie
    'excellence': 'L\'excellence n\'est pas un acte, c\'est une habitude. C\'est ma philosophie. Je vise pas la perfection, mais l\'amélioration constante.',
    'habitude': 'Ouais, c\'est ça. Chaque jour, je me demande : suis-je meilleur qu\'hier ? Pas en termes absolus, mais en progression.',
    'valeurs': 'Mes valeurs : excellence, rigueur, curiosité et intégrité. C\'est ce qui me guide dans tout ce que je fais.',

    // Questions générales
    'comment': 'Ça dépend de ta question ! 😄 Pose-la et je vais essayer de t\'aider du mieux que je peux.',
    'quoi': 'Quoi ? Tu peux être plus précis ? 😄',
    'pourquoi pas': 'Bonne question ! Mais tu peux être plus spécifique ?',

    // Contact et alternance
    'contact': 'Tu peux me contacter via le formulaire sur le portfolio, par email ou sur LinkedIn. Je réponds vite et je suis toujours ouvert à discuter.',
    'email': 'Tu peux m\'envoyer un email via le formulaire de contact sur le portfolio. Je vais te répondre rapidement !',
    'linkedin': 'Ouais, je suis sur LinkedIn ! Tu peux me trouver en tant que Rayhan MAOUACI. Connecte-toi, ça serait cool !',
    'recruter': 'Ouais, je suis intéressé ! 😄 Si tu as une opportunité d\'alternance pour 2026, contacte-moi. Je suis sérieux dans mon engagement professionnel.',

    // Réponses générales
    'merci': 'De rien ! Y\'a autre chose que tu veux savoir ?',
    'cool': 'Ouais c\'est vrai ! T\'as d\'autres questions ?',
    'ok': 'Cool ! Autre chose ?',
    'yes': 'Ouais ! 😄 T\'as d\'autres questions ?',
  };

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase().trim();
    
    // Cherche une correspondance dans la base de connaissances
    for (const [key, answer] of Object.entries(knowledgeBase)) {
      if (lowerQuestion.includes(key)) {
        return answer;
      }
    }
    
    // Réponses génériques si pas de correspondance
    const genericResponses = [
      'Franchement, je suis pas sûr de bien comprendre ta question. Tu peux reformuler ? 😄',
      'Bonne question ! Mais je préfère qu\'on en parle directement. Contacte-moi via le formulaire !',
      'Hmm, c\'est une question intéressante. Je vais y réfléchir et on peut en discuter si tu veux !',
      'Je sais pas trop comment répondre à ça. Mais si tu veux en discuter, je suis là !',
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Salut ! Bienvenue sur mon portfolio ! 👋 Je suis Rayhan. T\'as des questions sur moi, mes projets ou mon alternance ? Je suis là pour discuter !',
        sender: 'rayhan',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const answer = findAnswer(messageText);
      const rayhaiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: 'rayhan',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, rayhaiMessage]);
      setIsLoading(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all smooth-transition"
          title="Ouvrir le chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-card border border-blue-900 flex flex-col rounded-lg shadow-xl section-enter">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-900 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                RM
              </div>
              <div>
                <h3 className="font-bold text-sm">Rayhan MAOUACI</h3>
                <p className="text-xs text-blue-100">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-3">👋</div>
                <p className="text-white font-semibold mb-4">Bienvenue !</p>
                <p className="text-gray-400 text-sm mb-6">Pose-moi une question ou clique sur une suggestion ci-dessous</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-secondary text-gray-300'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary px-4 py-2 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="px-4 py-3 border-t border-blue-900 bg-secondary">
              <div className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion.text)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-card hover:bg-blue-900 border border-blue-900 hover:border-blue-700 text-gray-300 hover:text-white transition-all text-sm flex items-center gap-2"
                  >
                    <span>{suggestion.emoji}</span>
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          {messages.length > 0 && (
            <div className="p-4 border-t border-blue-900 bg-secondary rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pose une question..."
                  className="flex-1 bg-input border border-blue-900 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
