/* ============================================================
   RAYHAI Engine v4 — Premium+
   - Mini-LLM local (pattern-based) — offline-capable (option C)
   - Intent detection
   - Hybrid tone (pro + humain)
   - Persona-aware (uses /ai/persona.json)
   - No persistent memory (as requested)
   - Online fallback if API key provided
   - Designed to be pasted into /ai/engine.js
   ============================================================ */

(function () {
  "use strict";

  // ---------- Internal state ----------
  let PERSONA = null;
  let READY = false;
  let _API_KEY = null;

  // ---------- Utilities ----------
  const clean = (s) => String(s || "").toLowerCase().trim();
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const safeJoin = (arr, sep = ", ") => (Array.isArray(arr) ? arr.join(sep) : "");

  // ---------- Load persona ----------
  async function loadPersona() {
    try {
      const res = await fetch("./ai/persona.json", { cache: "no-store" });
      if (!res.ok) throw new Error("persona.json non trouvé");
      PERSONA = await res.json();
    } catch (e) {
      console.warn("RayhAI: impossible de charger persona.json", e);
      PERSONA = {}; // degrade gracefully
    } finally {
      READY = true;
      return PERSONA;
    }
  }

  // Expose persona getter
  window.RayhaiPersona = {
    get: async () => {
      if (!PERSONA) await loadPersona();
      return PERSONA;
    }
  };

  // Load persona at boot (non-blocking)
  loadPersona();

  // ---------- Intent detection (simple, rule-based) ----------
  function detectIntent(q) {
    const t = clean(q);

    const intents = [
      { name: "greeting", patterns: [/^(salut|bonjour|hello|hey|yo)/] },
      { name: "how_are_you", patterns: [/ça va|ca va|comment tu vas|tu vas bien/] },
      { name: "who_are_you", patterns: [/qui es tu|tu es qui|t'es qui|présente toi|comment tu t'appelles|quel est ton nom/] },
      { name: "ask_age", patterns: [/âge|age|ans/], },
      { name: "ask_skills", patterns: [/compétence|skill|skills|niveau|technologie|web|dev/], },
      { name: "ask_projects", patterns: [/projet|portfolio|travaux/], },
      { name: "ask_objective", patterns: [/objectif|avenir|bts|objectif pro/], },
      { name: "ask_languages", patterns: [/langue|parle|languages|anglais|français/], },
      { name: "joke", patterns: [/blague|mdr|rigole|ptdr/], },
      { name: "weather", patterns: [/météo|temps|il fait/], },
      { name: "motivation", patterns: [/motivation|motivé|découragé|démotivé/], },
      { name: "help", patterns: [/aide|aide moi|aide-moi|conseil|conseils/], },
      { name: "explain", patterns: [/explique|c'est quoi|c’est quoi|cest quoi|signifie/], },
      { name: "code_help", patterns: [/html|css|js|javascript|code|bug|erreur|dev/], },
      { name: "emotion_sad", patterns: [/(triste|mal|déprimé|déprime|down)/] },
      { name: "emotion_angry", patterns: [/(énervé|agacé|furieux|rage|colère)/] },
      { name: "emotion_stressed", patterns: [/(stress|angoisse|pression|inquiet)/] },
      { name: "emotion_lonely", patterns: [/(seul|seule|personne|solitude)/] },
      { name: "fallback", patterns: [/.*/] } // default fallback
    ];

    for (const intent of intents) {
      for (const p of intent.patterns) {
        if (p.test(t)) return intent.name;
      }
    }
    return "fallback";
  }

  // ---------- Mini-LLM / Pattern Engine ----------
  // Purpose: provide rich, context-aware answers offline using patterns + persona data.
  // It is NOT a neural model but a sophisticated rule-and-template engine.
  function miniLLM(prompt) {
    const t = clean(prompt);
    const persona = PERSONA || {};
    const user = persona.identity?.user_profile || {};
    const name = persona.name || user.prenom || "RayhAI";

    // Priority intents
    const intent = detectIntent(prompt);

    // Helpers to build persona-based answers
    const personaSkills = (() => {
      const web = persona.skills?.web || [];
      const tech = persona.skills?.tech || [];
      const ai = persona.skills?.ai_support || [];
      return { web, tech, ai };
    })();

    // Templates
    const templates = {
      greeting: [
        `Salut — je suis ${name}. Comment puis-je t'aider aujourd’hui ?`,
        `Bonjour. RayhAI à ton service. Que souhaites-tu faire ?`
      ],
      how_are_you: [
        "Je vais très bien, merci ! Et toi ?",
        "Toujours prête à aider. Comment tu vas ?"
      ],
      who_are_you: [
        `Je suis RayhAI, l'assistante intégrée à ce site. Je guide, j'explique et j'aide à améliorer le portfolio.`,
        `RayhAI — assistante personnelle. Je t'aide à corriger, expliquer et optimiser.`
      ],
      ask_age: [
        user.age ? `${user.prenom || persona.name} a ${user.age} ans.` : `L'âge n'est pas renseigné dans le persona.`
      ],
      ask_skills: [
        () => {
          const web = personaSkills.web.length ? `Web: ${personaSkills.web.join(", ")}` : "";
          const tech = personaSkills.tech.length ? `Tech: ${personaSkills.tech.join(", ")}` : "";
          const ai = personaSkills.ai.length ? `IA: ${personaSkills.ai.join(", ")}` : "";
          const parts = [web, tech, ai].filter(Boolean).join(" — ");
          return parts ? `Compétences : ${parts}.` : "Aucune compétence listée dans le persona.";
        }
      ],
      ask_projects: [
        persona.projects && persona.projects.length ? `Projets : ${persona.projects.join(" • ")}.` : "Aucun projet listé."
      ],
      ask_objective: [
        persona.objectives?.pro ? `Objectif: ${persona.objectives.pro}.` : "Aucun objectif professionnel renseigné."
      ],
      ask_languages: [
        persona.languages && persona.languages.length ? `${persona.name || ""} parle : ${persona.languages.join(", ")}.` : "Aucune langue renseignée."
      ],
      joke: [
        "Pourquoi les développeurs n’aiment pas la nature ? Trop de bugs.",
        "Blague courte : Pourquoi le JavaScript traverse la route ? Pour rejoindre l'autre callback."
      ],
      weather: [
        "Je n'ai pas accès à la météo ici, mais je peux t'aider à ajouter une API météo si tu veux."
      ],
      motivation: [
        "Une petite action aujourd'hui vaut mieux que dix idées demain. On décompose ensemble ?",
        "Commence par une tâche de 15 minutes — souvent, c'est tout ce qu'il faut."
      ],
      help: [
        "Dis-moi précisément ce que tu veux faire (corriger du code ? améliorer le design ?). Je donne un plan clair.",
        "Je peux te proposer une checklist actionnable. Dis-moi le contexte."
      ],
      explain: [
        (subject) => `Voici une explication simple pour "${subject}" : ... (réponds avec plus de détails pour approfondir).`
      ],
      code_help: [
        "Envoie ton extrait de code et j'identifierai les erreurs et proposerai une correction précise.",
        "Je peux optimiser ton JS/CSS/HTML : colle le code et j'analyse."
      ],
      emotion_sad: [
        "Je suis désolé que tu te sentes comme ça. Tu veux en parler ou préfères des actions concrètes pour te sentir mieux ?"
      ],
      emotion_angry: [
        "Je sens la frustration. On souffle un bon coup et on attaque le problème pas à pas — raconte-moi ce qu'il se passe."
      ],
      emotion_stressed: [
        "On va décomposer la charge. Quel est le sujet le plus urgent ?"
      ],
      emotion_lonely: [
        "Je suis là pour écouter. Dis-moi ce qui te pèse."
      ],
      fallback: [
        "Je ne suis pas certain d’avoir saisi. Peux-tu préciser ?",
        "Donne-moi un peu plus de contexte et je te réponds de façon précise."
      ]
    };

    // ---------- Pattern-based matching for "explain c'est quoi X" ----------
    // If the user asked "c'est quoi X" or "explique X", try to capture X and produce template
// Robust explain capture: prefer text after ':' or after the first blank line (selection),
// and ignore short noise words like "simplement" when no real subject is present.
const explainMatch =
  t.match(/^c('?est)? ?quoi (.+)/) ||
  t.match(/^explique(?:-moi)?(?: )?(.+)/);

if (explainMatch) {
  // raw capture (group 2 for "c'est quoi", group 1 for "explique")
  let raw = (explainMatch[2] || explainMatch[1] || "").trim();

  // If prompt contains a colon, prefer text after the first colon
  if (raw.includes(":")) {
    const afterColon = raw.split(":").slice(1).join(":").trim();
    if (afterColon) raw = afterColon;
  }

  // If prompt contains an explicit blank line (selection follows), prefer the part after the blank line
  // (handles cases where askEngine("Explique simplement :\n\n<selection>") was used)
  if (raw.includes("\n")) {
    const parts = raw.split(/\n+/).map(s => s.trim()).filter(Boolean);
    if (parts.length > 1) {
      // usually the selection is after the blank line -> pick last non-empty part
      raw = parts.slice(-1)[0];
    } else {
      raw = parts[0] || raw;
    }
  }

  // Remove obvious noise words if the subject is overly short
  const cleaned = raw.replace(/^[\s\W]+|[\s\W]+$/g, "").replace(/^simplement\b/i, "").trim();

  // If after cleaning we still have a short/informal token (<=2 chars), treat as missing
  if (!cleaned || cleaned.length <= 2) {
    // don't invent: ask the user for the subject
    return "Je peux expliquer quelque chose pour toi — précise ce que tu veux que j'explique.";
  }

  // limit subject length
  const subject = cleaned.length > 200 ? cleaned.slice(0, 200) + "…" : cleaned;
  return templates.explain[0](subject);
}


    // Intent-driven reply
    switch (intent) {
      case "greeting": return pick(templates.greeting);
      case "how_are_you": return pick(templates.how_are_you);
      case "who_are_you": return pick(templates.who_are_you);
      case "ask_age": return (typeof templates.ask_age[0] === "function") ? templates.ask_age[0]() : templates.ask_age[0];
      case "ask_skills": return (typeof templates.ask_skills[0] === "function") ? templates.ask_skills[0]() : templates.ask_skills[0];
      case "ask_projects": return templates.ask_projects[0];
      case "ask_objective": return templates.ask_objective[0];
      case "ask_languages": return templates.ask_languages[0];
      case "joke": return pick(templates.joke);
      case "weather": return templates.weather[0];
      case "motivation": return pick(templates.motivation);
      case "help": return pick(templates.help);
      case "code_help": return pick(templates.code_help);
      case "explain": // handled earlier; fallback to templates
        return pick(templates.explain).replace(/\{subject\}/, "");
      case "emotion_sad": return pick(templates.emotion_sad);
      case "emotion_angry": return pick(templates.emotion_angry);
      case "emotion_stressed": return pick(templates.emotion_stressed);
      case "emotion_lonely": return pick(templates.emotion_lonely);
      default:
        // Attempt fuzzy persona match (improved and safe)
        const identityBlock = /(qui es tu|t'es qui|tu es qui|quel est ton nom|comment tu t'appelles|présente toi)/;
        const shortOrSocial = /(ça va|ca va|salut|bonjour|hey|yo)/;
        if (!identityBlock.test(t) && !shortOrSocial.test(t)) {
          // Search persona keys for informative matches
          const keys = ["passions", "projects", "skills", "languages"];
          for (const k of keys) {
            if (!persona[k]) continue;
            const data = (Array.isArray(persona[k]) ? persona[k].join(" ") : JSON.stringify(persona[k])).toLowerCase();
            const words = t.split(/\s+/).filter(w => w.length > 2);
            if (words.some(w => data.includes(w))) {
              // build preview
              const preview = data.split(/\s+/).slice(0, 12).join(" ");
              return `Je peux te donner plus d'infos sur "${t}". Par exemple : ${preview}... Veux-tu un détail précis ?`;
            }
          }
        }
        // Default fallback
        return pick(templates.fallback);
    }
  } // end miniLLM

  // ---------- Local responder (short & emotional replies) ----------
  // This handles micro-conversations, quick replies, and emotional detection.
  function localResponder(q) {
    if (!q) return null;
    if (!PERSONA) return "Chargement du système…";

    const t = clean(q);
    const persona = PERSONA || {};
    const user = persona.identity?.user_profile || {};
    const name = persona.name || user.prenom || "RayhAI";

    // Emotions detection (fine-grained)
    const tone = {
      happy: /(super|génial|trop bien|content|heureux|parfait|cool|nice)/.test(t),
      sad: /(triste|mal|déprimé|fatigué|déçu|down|chagrin)/.test(t),
      angry: /(énervé|agacé|furieux|rage|colère|jpp|cassé|chiant)/.test(t),
      confused: /(comprends pas|bloqué|j'arrive pas|c compliqué|je galère|perdu)/.test(t),
      stressed: /(stress|angoisse|peur|inquiet|pression|overthink)/.test(t),
      lonely: /(seul|solitude|personne|parle|besoin de parler)/.test(t)
    };

    if (tone.happy) return pick([
      "Belle énergie — on continue ?",
      "Super ! Tu veux qu’on avance sur un projet ?"
    ]);
    if (tone.sad) return pick([
      "Je suis là si tu veux parler. Tu veux en discuter ou préfères des actions concrètes ?",
      "Pas simple… dis-moi ce qui te pèse et on fait un plan."
    ]);
    if (tone.angry) return pick([
      "Je sens la frustration. On décortique ensemble ce qui pose problème.",
      "Respire. Décris-moi ce qui t’a mis en rage, on solutionne."
    ]);
    if (tone.confused) return "Pas d’inquiétude — on va clarifier ça ensemble. Explique-moi le blocage.";
    if (tone.stressed) return "Calme et méthode : quel est l’élément le plus urgent ?";
    if (tone.lonely) return "Je t’écoute. Dis-moi ce que tu ressens.";

    // Quick intents via miniLLM for robust but fast answers
    const intent = detectIntent(q);
    const quickIntents = new Set([
      "greeting","how_are_you","who_are_you","ask_age","ask_skills",
      "ask_projects","ask_objective","ask_languages","joke","weather","motivation","help"
    ]);
    if (quickIntents.has(intent)) {
      return miniLLM(q);
    }

    // Short conversational fallbacks
    if (/merci/.test(t)) return "Avec plaisir.";
    if (/ok|d'accord|parfait/.test(t)) return "Parfait. On continue ?";
    if (/météo|temps/.test(t)) return "Je n'ai pas la météo ici, mais je peux t'aider à intégrer une API si tu veux.";
    if (/blague|mdr|rigole/.test(t)) return miniLLM("blague");
    if (/html|css|js|javascript|code|bug|erreur|dev/.test(t)) return "Envoie ton code et j'analyse rapidement.";
    if (t.length <= 3) return "Je t'écoute — précise un peu s'il te plaît.";

    // Fallback to miniLLM for richer answer
    return miniLLM(q);
  }

  // ---------- OpenAI fallback (optional) ----------
  function setApiKey(key, persist = false) {
    _API_KEY = key ? String(key).trim() : null;
    if (persist && _API_KEY) {
      try { localStorage.setItem("RAYHAI_API_KEY", _API_KEY); } catch (e) {}
    }
    return _API_KEY;
  }

  // load persisted key if any
  try {
    const saved = localStorage.getItem("RAYHAI_API_KEY");
    if (saved) _API_KEY = saved;
  } catch (e) {}

  async function openAIRequest(prompt) {
    if (!_API_KEY) throw new Error("OpenAI API key not set");
    const persona = PERSONA || {};
    const system = `You are RayhAI, assistant for ${persona.name || "a user"}. Answer in French. Be concise, professional and friendly.`;
    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      temperature: 0.25,
      max_tokens: 700
    };
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer " + _API_KEY
      },
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error("OpenAI error: " + resp.status + " " + txt);
    }
    const data = await resp.json();
    return data?.choices?.[0]?.message?.content || null;
  }

  // ---------- Public API: ask() ----------
  async function ask(text) {
    if (!READY) await loadPersona(); // ensure persona loaded
    // 1) quick local responder (ultra-fast)
    try {
      const localQuick = localResponder(text);
      if (localQuick && typeof localQuick === "string") {
        // If the localQuick looks like a fallback generic short prompt, we still return it (fast UX)
        return localQuick;
      }
    } catch (e) {
      console.warn("RayhAI local quick error", e);
    }

    // 2) miniLLM deeper attempt (pattern engine)
    try {
      const deep = miniLLM(text);
      if (deep && typeof deep === "string") {
        return deep;
      }
    } catch (e) {
      console.warn("RayhAI miniLLM error", e);
    }

    // 3) Online fallback (if API key configured)
    if (_API_KEY) {
      try {
        const remote = await openAIRequest(text);
        if (remote) return remote;
      } catch (e) {
        console.warn("RayhAI openAI error", e);
      }
    }

    // 4) Final fallback
    return "Désolé, je n'ai pas de réponse complète pour ça en local. Reformule ou demande un autre sujet.";
  }

  // ---------- Export ----------
  window.RayhaiEngine = {
    ask,
    setApiKey,
    loadPersona,
    _internal: { miniLLM, localResponder, detectIntent }
  };

  // init
  // ensure persona loaded
  loadPersona().then(() => {
    READY = true;
    console.info && console.info("RayhAI Engine v4 ready (Premium+)");
  }).catch(() => { READY = true; });

})(); // end engine v4
