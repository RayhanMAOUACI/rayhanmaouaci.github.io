
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

/* ==================================================
   RAYHAI – IA PERSONNALISÉE
   Sans image, moderne, rapide
   ================================================== */

const aiBox = document.querySelector(".rayhai-chatbox");
const aiInput = document.querySelector(".rayhai-input");
const aiSend = document.querySelector(".rayhai-send");

/* PERSONNALITÉ IA CONFIG */
const profile = {
    name: "RayhAI",
    owner: "Rayhan",
    age: 18,
    study: "Bac Pro CIEL – Terminale",
    interests: [
        "Informatique",
        "Cybersécurité",
        "Réseau",
        "Musculation",
        "Valorant"
    ],
    quality: "Aim, gamesense, structure et logique",
    defaultDescription:
        "Assistant — Infos publiques : Je suis RayhAI, l’assistant personnel de Rayhan. Je fournis des informations générales le concernant, son parcours, ses compétences et ses centres d’intérêt."
};

/* Fonction générer bulle */
function addMessage(content, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("rayhai-msg", sender === "user" ? "user-msg" : "bot-msg");
    msg.textContent = content;
    aiBox.appendChild(msg);

    aiBox.scrollTop = aiBox.scrollHeight;
}

/* IA SIMPLE + RÉPONSES STRUCTURÉES */
function generateAIResponse(userText) {

    const input = userText.toLowerCase();

    // Questions info personnelles
    if (input.includes("qui est rayhan") || input.includes("présente rayhan")) {
        return `Rayhan, 18 ans, étudiant en ${profile.study}. Passionné par ${profile.interests.join(", ")}. Très bon joueur Valorant.`;
    }

    if (input.includes("age") || input.includes("a quel âge")) {
        return `Rayhan a ${profile.age} ans.`;
    }

    if (input.includes("étude") || input.includes("formation")) {
        return `Il est actuellement en ${profile.study}.`;
    }

    if (input.includes("centres") || input.includes("intérêt")) {
        return `Ses centres d’intérêt incluent : ${profile.interests.join(", ")}.`;
    }

    if (input.includes("jeu") || input.includes("valorant")) {
        return `Sur Valorant, Rayhan possède un niveau global très solide, notamment grâce à son aim et son sens du jeu.`;
    }

    // Réponse générique
    return `Je suis RayhAI. Je peux fournir des informations concernant Rayhan, ses études, ses compétences ou ses centres d’intérêt.`;
}

/* EVENT – ENVOI MESSAGE */
function sendAI() {
    const text = aiInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");

    aiInput.value = "";

    setTimeout(() => {
        const response = generateAIResponse(text);
        addMessage(response, "bot");
    }, 350);
}

aiSend.addEventListener("click", sendAI);
aiInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendAI();
});

/* =========================================
   OUVERTURE / FERMETURE DE LA BULLE IA
   ========================================= */

const bubble = document.getElementById("rayhaiBubble");
const popup = document.getElementById("rayhaiPopup");
const closeBtn = document.getElementById("closeRayhai");

bubble.addEventListener("click", () => {
    popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});


window.addEventListener("scroll", handleHeaderShrink);
window.addEventListener("load", handleHeaderShrink);

animate();