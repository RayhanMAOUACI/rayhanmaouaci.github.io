# 🚀 Guide de Déploiement sur GitHub Pages

Ce guide vous explique comment déployer votre portfolio sur **GitHub Pages**.

---

## 📋 Prérequis

- ✅ Un compte GitHub
- ✅ Git installé sur votre machine
- ✅ Node.js 18+ et pnpm installés
- ✅ Le repository cloné localement

---

## 🔧 Configuration Initiale

### 1. Créer un Repository GitHub

1. Allez sur [GitHub](https://github.com/new)
2. Créez un nouveau repository nommé `portfolio` (ou le nom de votre choix)
3. Initialisez-le avec un README
4. Clonez-le localement

### 2. Ajouter le Code du Portfolio

```bash
# Cloner votre repository
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Copier les fichiers du portfolio
# (Copiez tous les fichiers du projet ici)

# Installer les dépendances
pnpm install

# Vérifier que tout fonctionne en local
pnpm dev
```

---

## 🏗️ Configuration GitHub Pages

### 1. Activer GitHub Pages dans les Paramètres

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Allez dans la section **Pages** (à gauche)
4. Sous **Source**, sélectionnez **Deploy from a branch**
5. Choisissez la branche **main** et le dossier **docs**
6. Cliquez sur **Save**

### 2. Mettre à Jour le .gitignore

Le fichier `.gitignore` est déjà configuré. Décommentez la ligne pour ignorer le dossier `docs/` si nécessaire :

```
# GitHub Pages output
docs/
```

**OU** si vous voulez committer le dossier `docs/` (recommandé pour GitHub Pages) :

```
# GitHub Pages output
# docs/ is committed to GitHub Pages deployment
```

---

## 🚀 Déploiement

### Option 1 : Déploiement Manuel

```bash
# 1. Construire pour GitHub Pages
GITHUB_PAGES=true pnpm build

# 2. Ajouter les fichiers au git
git add docs/
git add .

# 3. Committer
git commit -m "Deploy to GitHub Pages"

# 4. Pousser vers GitHub
git push origin main
```

### Option 2 : Utiliser le Script de Déploiement

```bash
# Exécute build:github, ajoute docs/, committe et pousse
npm run deploy:github
```

### Option 3 : Déploiement Automatique avec GitHub Actions (Recommandé)

Créez un fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build for GitHub Pages
        run: GITHUB_PAGES=true pnpm build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

Puis commitez ce fichier et poussez. GitHub Actions déploiera automatiquement à chaque push sur `main`.

---

## ✅ Vérification du Déploiement

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** → **Pages**
3. Vous verrez un message comme : *"Your site is live at https://YOUR_USERNAME.github.io/portfolio/"*
4. Visitez cette URL pour vérifier que votre portfolio est en ligne

---

## 🔗 URL de Votre Portfolio

Une fois déployé, votre portfolio sera accessible à :

```
https://YOUR_USERNAME.github.io/portfolio/
```

Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub.

---

## 🐛 Dépannage

### Le portfolio ne s'affiche pas correctement

**Problème** : Les assets (CSS, images) ne se chargent pas

**Solution** : Vérifiez que la variable `GITHUB_PAGES=true` est définie lors du build. Cela configure la base URL correctement.

```bash
GITHUB_PAGES=true pnpm build
```

### Les liens internes ne fonctionnent pas

**Problème** : Les liens internes renvoient 404

**Solution** : Vérifiez que vous utilisez des chemins relatifs dans votre code. Wouter (le routeur) devrait gérer cela automatiquement avec la base URL configurée.

### Le dossier docs/ n'existe pas

**Problème** : Après le build, le dossier `docs/` n'est pas créé

**Solution** : Assurez-vous que la variable `GITHUB_PAGES=true` est définie :

```bash
GITHUB_PAGES=true pnpm build
```

---

## 📝 Mise à Jour du Portfolio

Pour mettre à jour votre portfolio après des modifications :

```bash
# 1. Faire vos modifications localement
# 2. Tester en local
pnpm dev

# 3. Construire pour GitHub Pages
GITHUB_PAGES=true pnpm build

# 4. Committer et pousser
git add docs/
git commit -m "Update portfolio"
git push origin main
```

Ou utilisez le script :

```bash
npm run deploy:github
```

---

## 🎯 Domaine Personnalisé (Optionnel)

Si vous voulez utiliser votre propre domaine :

1. Allez sur **Settings** → **Pages**
2. Sous **Custom domain**, entrez votre domaine
3. Suivez les instructions pour configurer les enregistrements DNS

---

## 📚 Ressources

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Configurer GitHub Pages avec un dossier docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Actions pour Pages](https://github.com/peaceiris/actions-gh-pages)

---

## ✨ Prochaines Étapes

Après le déploiement :

1. ✅ Testez tous les liens et fonctionnalités
2. ✅ Vérifiez que RayhAI fonctionne correctement
3. ✅ Partagez l'URL avec des recruteurs
4. ✅ Mettez à jour votre profil LinkedIn avec le lien

---

**Bon déploiement ! 🚀**
