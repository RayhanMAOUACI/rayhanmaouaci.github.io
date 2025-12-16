/* ============================================
   RAYHAI - INTERFACE UI
   Version optimisée - Production Ready
============================================ */

class RayhAI {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.engineReady = false;
    this.init();
  }

  async init() {
    await this.waitForEngine();
    this.createUI();
    this.attachEvents();
  }

  async waitForEngine() {
    let attempts = 0;
    while (!window.RayhaiEngine && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    this.engineReady = !!window.RayhaiEngine;
  }

  createUI() {
    const html = `
      <div class="rayhai-bubble" id="rayhai-bubble" role="button" aria-label="Ouvrir l'assistant RayhAI" aria-expanded="false" tabindex="0">
        <div class="rayhai-bubble-icon" aria-hidden="true">🤖</div>
      </div>

      <div class="rayhai-panel" id="rayhai-panel" role="dialog" aria-labelledby="rayhai-title" aria-modal="true" aria-hidden="true" style="display: none;">
        <div class="rayhai-header">
          <div class="rayhai-header-left">
            <div class="rayhai-avatar" aria-hidden="true">🤖</div>
            <div class="rayhai-info">
              <h3 id="rayhai-title">RayhAI</h3>
              <div class="rayhai-status">
                <span class="rayhai-status-dot" aria-hidden="true"></span>
                <span>Assistant Personnel</span>
              </div>
            </div>
          </div>
          <button class="rayhai-close" id="rayhai-close" aria-label="Fermer l'assistant" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="rayhai-body" id="rayhai-body" role="log" aria-live="polite" aria-atomic="false">
          <div class="rayhai-welcome">
            <div class="rayhai-welcome-icon" aria-hidden="true">👋</div>
            <div>
              <h2>Bienvenue !</h2>
              <p>Je suis Rayhan en version IA. Pose-moi des questions sur mes projets, compétences ou parcours !</p>
            </div>
            <div class="rayhai-suggestions">
              <button class="rayhai-suggestion" data-text="Qui es-tu ?" type="button">Qui es-tu ?</button>
              <button class="rayhai-suggestion" data-text="Tes projets ?" type="button">Tes projets ?</button>
              <button class="rayhai-suggestion" data-text="Tes compétences ?" type="button">Tes compétences ?</button>
            </div>
          </div>
        </div>

        <div class="rayhai-footer">
          <div class="rayhai-input-wrapper">
            <textarea 
              class="rayhai-input" 
              id="rayhai-input" 
              placeholder="Écris un message..."
              rows="1"
              aria-label="Champ de saisie du message"
            ></textarea>
            <button class="rayhai-send" id="rayhai-send" aria-label="Envoyer le message" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
          <div class="rayhai-powered" aria-hidden="true">Propulsé par RayhAI Engine</div>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  attachEvents() {
    this.bubble = document.getElementById('rayhai-bubble');
    this.panel = document.getElementById('rayhai-panel');
    this.closeBtn = document.getElementById('rayhai-close');
    this.input = document.getElementById('rayhai-input');
    this.sendBtn = document.getElementById('rayhai-send');
    this.body = document.getElementById('rayhai-body');

    this.bubble.addEventListener('click', () => this.toggle());
    this.bubble.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });

    this.closeBtn.addEventListener('click', () => this.close());
    this.sendBtn.addEventListener('click', () => this.send());
    
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.send();
      }
    });

    this.input.addEventListener('input', () => {
      this.input.style.height = 'auto';
      this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('rayhai-suggestion')) {
        const text = e.target.getAttribute('data-text');
        this.input.value = text;
        this.send();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.panel.contains(e.target) && 
          !this.bubble.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.panel.style.display = 'flex';
    this.panel.offsetHeight;
    this.panel.classList.add('open');
    this.bubble.classList.add('active');
    this.bubble.setAttribute('aria-expanded', 'true');
    this.panel.removeAttribute('aria-hidden');
    
    setTimeout(() => this.input.focus(), 100);
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

close() {
  this.isOpen = false;

  // 🔧 Retirer le focus AVANT aria-hidden
  if (this.panel.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  this.panel.classList.remove('open');
  this.bubble.classList.remove('active');
  this.bubble.setAttribute('aria-expanded', 'false');
  this.panel.setAttribute('aria-hidden', 'true');

  setTimeout(() => {
    this.panel.style.display = 'none';
  }, 400);
}


  // Filtre pour questions trop simples
  isSimpleQuestion(text) {
    const lowerText = text.toLowerCase().trim();
    
    // Liste de questions trop simples à bloquer
    const simplePatterns = [
      /^(ca|ça) va\??$/,
      /^comment (tu )?vas\??$/,
      /^(tu vas|vous allez) bien\??$/,
      /^quoi de neuf\??$/,
      /^salut\??$/,
      /^hey\??$/,
      /^hello\??$/,
      /^bonjour\??$/,
      /^coucou\??$/,
      /^yo\??$/,
      /^ok\??$/,
      /^d'accord\??$/,
      /^oui\??$/,
      /^non\??$/,
      /^merci\??$/,
      /^lol$/,
      /^mdr$/,
      /^ptdr$/,
      /^cool$/,
      /^nice$/,
      /^super$/
    ];

    // Vérifier si c'est trop court (moins de 3 caractères)
    if (lowerText.length < 3) return true;

    // Vérifier les patterns
    return simplePatterns.some(pattern => pattern.test(lowerText));
  }

  async send() {
    if (this.isTyping) return;

    const text = this.input.value.trim();
    if (!text) return;

    // Bloquer les questions trop simples
    if (this.isSimpleQuestion(text)) {
      this.input.value = '';
      this.input.style.height = 'auto';
      
      // Message d'encouragement à poser une vraie question
      const welcome = this.body.querySelector('.rayhai-welcome');
      if (welcome) {
        welcome.style.opacity = '0';
        setTimeout(() => welcome.remove(), 300);
      }
      
      this.addMessage('user', text);
      
      setTimeout(() => {
        const responses = [
          "Pose-moi plutôt une vraie question ! Par exemple : mes projets, mes compétences, mon parcours... 😊",
          "J'aimerais bien discuter, mais je suis là pour t'aider sur mon portfolio ! Demande-moi quelque chose de concret 💼",
          "Hey ! Je préfère répondre à des questions sur mes projets, compétences ou expériences. Vas-y ! 🚀"
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage('assistant', response);
      }, 800);
      
      return;
    }

    this.input.disabled = true;
    this.sendBtn.disabled = true;
    this.input.value = '';
    this.input.style.height = 'auto';

    const welcome = this.body.querySelector('.rayhai-welcome');
    if (welcome) {
      welcome.style.opacity = '0';
      welcome.style.transform = 'translateY(-20px)';
      setTimeout(() => welcome.remove(), 300);
    }

    this.addMessage('user', text);
    this.showTyping();
    this.isTyping = true;

    try {
      let response;

      if (this.engineReady && window.RayhaiEngine) {
        response = await window.RayhaiEngine.ask(text);
      } else {
        await this.delay(1000);
        response = "Le moteur IA n'est pas encore chargé. Réessaie dans quelques secondes.";
      }

      this.hideTyping();
      this.addMessage('assistant', response);
      
    } catch (error) {
      this.hideTyping();
      this.addMessage('assistant', "Oups, j'ai eu un bug. Réessaye ? 😅");
    } finally {
      this.isTyping = false;
      this.input.disabled = false;
      this.sendBtn.disabled = false;
      this.input.focus();
    }
  }

  addMessage(role, content) {
    const time = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const formattedContent = this.formatMessage(content);

    const messageHTML = `
      <div class="rayhai-message ${role}">
        <div class="rayhai-message-avatar" aria-hidden="true">${role === 'user' ? '👤' : '🤖'}</div>
        <div>
          <div class="rayhai-message-content">${formattedContent}</div>
          <div class="rayhai-message-time" aria-hidden="true">${time}</div>
        </div>
      </div>
    `;

    this.body.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
    this.messages.push({ role, content, time });
  }

  formatMessage(text) {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return escaped
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/• /g, '• ');
  }

  showTyping() {
    const typingHTML = `
      <div class="rayhai-message assistant">
        <div class="rayhai-message-avatar" aria-hidden="true">🤖</div>
        <div class="rayhai-typing" id="rayhai-typing" aria-label="Rayhan est en train d'écrire">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
    `;
    this.body.insertAdjacentHTML('beforeend', typingHTML);
    this.scrollToBottom();
  }

  hideTyping() {
    const typing = this.body.querySelector('.rayhai-message:has(#rayhai-typing)');
    if (typing) typing.remove();
  }

  scrollToBottom() {
    this.body.scrollTo({
      top: this.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetConversation() {
    if (window.RayhaiEngine) {
      window.RayhaiEngine.resetSession();
    }
    this.messages = [];
    this.body.innerHTML = '';
    this.createWelcomeMessage();
  }

  createWelcomeMessage() {
    const welcomeHTML = `
      <div class="rayhai-welcome">
        <div class="rayhai-welcome-icon" aria-hidden="true">👋</div>
        <div>
          <h2>Bienvenue !</h2>
          <p>Je suis Rayhan en version IA. Pose-moi des questions sur mes projets, compétences ou parcours !</p>
        </div>
        <div class="rayhai-suggestions">
          <button class="rayhai-suggestion" data-text="Qui es-tu ?" type="button">Qui es-tu ?</button>
          <button class="rayhai-suggestion" data-text="Tes projets ?" type="button">Tes projets ?</button>
          <button class="rayhai-suggestion" data-text="Tes compétences ?" type="button">Tes compétences ?</button>
        </div>
      </div>
    `;
    this.body.insertAdjacentHTML('beforeend', welcomeHTML);
  }
}

// Initialisation silencieuse
document.addEventListener('DOMContentLoaded', async () => {
  window.rayhAI = new RayhAI();
});