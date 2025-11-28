
/* =========================================
   ANNÉE DYNAMIQUE
========================================= */
document.getElementById("year").textContent = new Date().getFullYear();


/* =========================================
   THEME CLAIR / SOMBRE
========================================= */
const body = document.body;
const toggleBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  body.setAttribute("data-theme", theme);
  toggleBtn.textContent = theme === "dark" ? "🌙 Mode sombre" : "☀️ Mode clair";
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

toggleBtn.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});


/* =========================================
   ANIMATION AU SCROLL
========================================= */
const revealElements = document.querySelectorAll('.reveal');

function handleScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);


/* =========================================
   FOND ANIMÉ – POINTS CONNECTÉS (CANVAS)
========================================= */

// Canvas
const canvas = document.getElementById("bg-particles");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 80;     
const connectDistance = 150;

// Ajuste la taille aux dimensions de la fenêtre
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// Classe Particule
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.7;
    this.vy = (Math.random() - 0.5) * 0.7;
    this.radius = 2;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Rebonds
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(56,189,248,0.9)"; // Cyan
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(56,189,248,1)";
    ctx.fill();
  }
}


// Initialisation
function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}
initParticles();


// Animation principale
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Lignes entre particules proches
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56,189,248, ${1 - dist / connectDistance})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Mouvements + dessin
  particles.forEach(p => {
    p.move();
    p.draw();
  });

  requestAnimationFrame(animate);
}

document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("header nav a");

function updateActiveLink() {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}



/* ============================================
   EFFET RIPPLE NEON — VERSION ULTRA FIABLE
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", function (e) {

            // Supprimer les anciens ripple
            const oldRipple = this.querySelector(".ripple");
            if (oldRipple) oldRipple.remove();

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            // Animation auto-clean
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        });
    });
});


/* =========================================
   HEADER – SHRINK ON SCROLL
========================================= */

const header = document.querySelector("header");

function handleHeaderShrink() {
  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
}

// script.js — RayhAI (version robuste & corrigée)
// Attendre que le DOM soit prêt, protéger contre éléments manquants,
// typing effect asynchrone, ripple safe, fallbacks et logs utiles.

document.addEventListener("DOMContentLoaded", () => {
  // ----- Helpers -----
  const log = (...args) => console.log("[RayhAI]", ...args);
  const warn = (...args) => console.warn("[RayhAI]", ...args);

  function safeGet(id) {
    const el = document.getElementById(id);
    if (!el) warn(`Element with id "${id}" not found in DOM.`);
    return el;
  }

  const bubble = safeGet("rayhai-toggle") || safeGet("rayhai-bubble") || document.querySelector(".rayhai-floating-btn") || null;
  const windowEl = safeGet("rayhai-window") || safeGet("rayhai-panel") || document.querySelector(".rayhai-window") || null;
  const messagesBox = safeGet("rayhai-messages") || document.querySelector(".rayhai-messages") || null;
  const input = safeGet("rayhai-input") || document.querySelector("#rayhai-input") || safeGet("rayhai-text") || null;
  const sendBtn = safeGet("rayhai-send") || document.querySelector("#rayhai-send") || null;
  const closeBtn = safeGet("rayhai-close") || safeGet("rayhai-collapse") || null;
  const typingIndicator = safeGet("rayhai-typing") || null;

  if (!bubble) {
    warn("Bubble not found — creating a minimal bubble in the DOM.");
    // Create minimal bubble if missing (so nothing crashes)
    const b = document.createElement("button");
    b.id = "rayhai-toggle";
    b.className = "rayhai-floating-btn";
    b.innerHTML = "💬";
    document.body.appendChild(b);
    // reassign
    bubble = b;
  }

  // If windowEl not found, create a simple panel so rest can work
  if (!windowEl) {
    warn("Panel not found — creating a minimal panel in the DOM.");
    const panel = document.createElement("div");
    panel.id = "rayhai-window";
    panel.className = "rayhai-window";
    panel.innerHTML = `
      <div class="rayhai-header">
        <h2>RayhAI</h2>
        <p>Assistant — Infos publiques</p>
        <button id="rayhai-close">×</button>
      </div>
      <div id="rayhai-messages" class="rayhai-messages"></div>
      <div class="rayhai-input-zone">
        <input id="rayhai-input" type="text" placeholder="Écris ta question..." />
        <button id="rayhai-send">Envoyer</button>
      </div>
    `;
    document.body.appendChild(panel);
    // re-query
    windowEl = panel;
    messagesBox = panel.querySelector("#rayhai-messages");
    input = panel.querySelector("#rayhai-input");
    sendBtn = panel.querySelector("#rayhai-send");
    closeBtn = panel.querySelector("#rayhai-close");
  }

  // final sanity check
  if (!messagesBox || !input || !sendBtn) {
    warn("Certains éléments essentiels manquent encore : messagesBox / input / sendBtn. Le widget fonctionnera partiellement.");
  }

  // ----- UI helpers -----
  function createRipple(el, clientX, clientY) {
    try {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "rayhai-ripple";
      const size = Math.max(rect.width, rect.height) * 1.8;
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (clientX - rect.left) + "px";
      ripple.style.top = (clientY - rect.top) + "px";
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    } catch (e) {
      // if something fails (e.g. el is null), don't break everything
      warn("createRipple failed:", e);
    }
  }

  // add message (user or ai). typing = true => animate typing (returns promise)
  let currentTypingAbort = null;
  function addMessage(text, sender = "ai", { typing = false } = {}) {
    if (!messagesBox) return;
    const wrapper = document.createElement("div");
    wrapper.className = `rayhai-msg ${sender === "user" ? "user" : "ai"}`;
    messagesBox.appendChild(wrapper);

    // typing behavior: letter by letter
    if (typing) {
      // cancel previous typing if asked
      if (currentTypingAbort && typeof currentTypingAbort.cancel === "function") {
        currentTypingAbort.cancel();
      }
      let cancelled = false;
      currentTypingAbort = { cancel: () => { cancelled = true; } };

      return new Promise((resolve) => {
        const speed = 18; // ms per char
        let i = 0;
        const interval = setInterval(() => {
          if (cancelled) {
            clearInterval(interval);
            wrapper.textContent = text;
            messagesBox.scrollTop = messagesBox.scrollHeight;
            resolve();
            return;
          }
          wrapper.textContent = text.slice(0, i);
          i++;
          messagesBox.scrollTop = messagesBox.scrollHeight;
          if (i > text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    } else {
      wrapper.textContent = text;
      messagesBox.scrollTop = messagesBox.scrollHeight;
      return Promise.resolve();
    }
  }

  // quick helper to append user and ai reply
  async function userSends(text) {
    if (!input) return;
    await addMessage(text, "user");
    pushMem("user", text);
    input.value = "";
    // small delay, then AI reply
    setTimeout(async () => {
      const reply = generateReply(text);
      pushMem("ai", reply);
      await addMessage(reply, "ai", { typing: true });
    }, 220);
  }

  // ----- small memory -----
  const MEMORY = [];
  function pushMem(who, text) { MEMORY.push({who, text, ts: Date.now()}); if (MEMORY.length > 50) MEMORY.shift(); }

  // ----- NLU / response generator (robuste) -----
  function norm(s = "") { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s]/g," ").replace(/\s+/g," ").trim(); }

  const PROFILE = {
    name: "Rayhan",
    age: "18 ans",
    city: "Toulon",
    studies: "Bac Pro CIEL - Terminale",
    interests: ["Informatique","Cybersécurité","Réseau","Musculation"],
    favouriteGames: ["Valorant"],
    gamingLevel: "Très bon de manière générale",
    defaultDescription: "Rayhan, 18 ans, étudiant en Terminale CIEL. Passionné par l'informatique, la cybersécurité et les réseaux."
  };

  function detectIntent(text) {
    const s = norm(text);
    if (!s) return { id: "empty" };
    if (/\b(salut|bonjour|hey|yo)\b/.test(s)) return { id: "greeting" };
    if (/\b(ca va|ça va|comment vas|tu vas)\b/.test(s)) return { id: "howareyou" };
    if (/\b(qui est|qui es|c'est qui|présente)\b/.test(s)) return { id: "who" };
    if (/\b(age|ans|quel age|quel âge)\b/.test(s)) return { id: "age" };
    if (/\b(toulon|ville|habite|ou vit)\b/.test(s)) return { id: "location" };
    if (/\b(bac|terminale|ciel|etude|formation)\b/.test(s)) return { id: "studies" };
    if (/\b(competen|competence|skill|html|css|js|python|reseau|cyber)\b/.test(s)) return { id: "skills" };
    if (/\b(projet|portfolio|bot|automation|script)\b/.test(s)) return { id: "projects" };
    if (/\b(valorant|jeu|jeux|niveau|aim)\b/.test(s)) return { id: "games" };
    return { id: "fallback" };
  }

  function generateReply(raw) {
    const s = norm(raw);
    if (!s) return "Pose-moi une question.";
    // privacy check (example)
    if (/\b(adresse|numero|telephone|iban|mdp|mot de passe|email privé)\b/.test(s)) return "Désolé, je ne peux pas divulguer cette information.";

    const intent = detectIntent(s);
    switch (intent.id) {
      case "greeting": return `Salut ! ${PROFILE.defaultDescription.split(".")[0]}.`;
      case "howareyou": return "Je vais bien, merci — prêt à t'aider.";
      case "who": return PROFILE.defaultDescription;
      case "age": return `Il a ${PROFILE.age}.`;
      case "location": return `Il vit à ${PROFILE.city}.`;
      case "studies": return PROFILE.studies;
      case "skills": return `Compétences : ${PROFILE.interests.join(", ")}.`;
      case "projects": return `Projets : portfolio perso, bots, scripts réseaux.`;
      case "games": return `Jeux favoris : ${PROFILE.favouriteGames.join(", ")} — niveau : ${PROFILE.gamingLevel}.`;
      default:
        if (s.includes("rayhan")) return PROFILE.defaultDescription;
        if (/\b(que fais|tu fais|travaille)\b/.test(s)) return "Rayhan réalise des projets web, automatise des tâches et travaille la cybersécurité.";
        return "Je n'ai pas compris précisément — peux-tu reformuler ? (ex: 'âge', 'études', 'compétences')";
    }
  }

  // ----- events binding (safe) -----
  bubble.addEventListener("click", (ev) => {
    try {
      createRipple(bubble, ev.clientX, ev.clientY);
      const opened = windowEl.classList.toggle("visible");
      windowEl.setAttribute("aria-hidden", String(!opened));
      if (opened && input) input.focus();
      if (opened && messagesBox && messagesBox.children.length === 0) {
        const welcome = "Bonjour — je suis RayhAI. Pose une question sur Rayhan (ex: 'Quel est son parcours ?').";
        pushMem("ai", welcome);
        addMessage(welcome, "ai", { typing: true });
      }
    } catch (e) {
      warn("Erreur lors du click sur la bulle :", e);
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", () => { windowEl.classList.remove("visible"); windowEl.setAttribute("aria-hidden","true"); });

  if (sendBtn) sendBtn.addEventListener("click", () => { if (input) userSends(input.value); });
  if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") userSends(input.value); });

  // expose for debug
  window.RayhAI = {
    PROFILE,
    MEMORY,
    pushMem,
    detectIntent,
    generateReply,
    addMessage,
    userSends
  };

  log("RayhAI initialized (robust mode).");
}); // end DOMContentLoaded


window.addEventListener("scroll", handleHeaderShrink);
window.addEventListener("load", handleHeaderShrink);

animate();