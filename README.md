# Blog de Nicolas CHEYMOL - Site Optimisé

Ce repository contient le blog personnel de Nicolas CHEYMOL, expert Modern Workplace & Sécurité. Le site a été entièrement optimisé pour les performances, l'accessibilité et le SEO.

## 🚀 Optimisations Implémentées

### Performance
- **CSS externalisé** : Tous les styles sont maintenant dans `/assets/css/main.css`
- **JavaScript modulaire** : Code JS organisé en classes dans `/assets/js/main.js`
- **Lazy loading** : Images chargées à la demande
- **Service Worker** : Fonctionnement offline et cache intelligent
- **Compression** : Fichiers CSS/JS minifiés et compressés
- **Preload** : Ressources critiques préchargées

### SEO
- **Métadonnées enrichies** : Open Graph, Twitter Cards, Schema.org
- **Sitemap automatique** : Généré par Jekyll
- **robots.txt optimisé** : Instructions de crawl améliorées
- **URLs canoniques** : Évite le contenu dupliqué
- **Structured Data** : Données structurées pour les moteurs de recherche

### Accessibilité
- **Navigation clavier** : Support complet du clavier
- **ARIA labels** : Attributs d'accessibilité
- **Skip links** : Navigation rapide pour lecteurs d'écran
- **Contraste optimisé** : Respect des standards WCAG
- **Mode sombre** : Support automatique du thème système

### PWA (Progressive Web App)
- **Manifest.json** : Installation sur appareils
- **Service Worker** : Fonctionnement offline
- **Cache intelligent** : Ressources mises en cache
- **Thème cohérent** : Couleurs et icônes optimisées

### Sécurité
- **Headers de sécurité** : Protection XSS, clickjacking, etc.
- **HTTPS forcé** : Redirection automatique
- **Permissions Policy** : Contrôle des APIs sensibles

## 📁 Structure des Fichiers

```
ncheymol.github.io/
├── _layouts/           # Templates Jekyll
│   ├── default.html    # Layout principal optimisé
│   ├── home.html       # Page d'accueil
│   └── post.html       # Articles individuels
├── assets/             # Ressources statiques
│   ├── css/
│   │   └── main.css    # Styles centralisés
│   └── js/
│       └── main.js     # JavaScript modulaire
├── _includes/          # Composants réutilisables
├── _posts/             # Articles du blog
├── _sources/           # Images et médias
├── manifest.json       # Configuration PWA
├── sw.js              # Service Worker
├── .htaccess          # Configuration serveur
├── robots.txt         # Instructions crawl
└── _config.yml        # Configuration Jekyll
```

## 🛠️ Technologies Utilisées

- **Jekyll** : Générateur de site statique
- **CSS3** : Variables CSS, Flexbox, Grid
- **JavaScript ES6+** : Classes, modules, async/await
- **Service Workers** : Cache et offline
- **PWA** : Manifest, installation native

## 🚀 Installation et Développement

1. **Cloner le repository**
   ```bash
   git clone https://github.com/ncheymol/ncheymol.github.io.git
   cd ncheymol.github.io
   ```

2. **Installer les dépendances**
   ```bash
   bundle install
   ```

3. **Lancer le serveur de développement**
   ```bash
   bundle exec jekyll serve
   ```

4. **Accéder au site**
   ```
   http://localhost:4000
   ```

## 📊 Métriques de Performance

Le site est optimisé pour atteindre d'excellents scores sur :
- **Lighthouse** : Performance, Accessibilité, SEO, PWA
- **PageSpeed Insights** : Vitesse de chargement
- **WebPageTest** : Métriques détaillées

## 🔧 Configuration

### Variables CSS
Les couleurs et styles sont centralisés dans les variables CSS :
```css
:root {
  --primary: #007acc;
  --primary-light: #4fc3f7;
  --accent: #e3f2fd;
  --bg: #f9f9f9;
  --text: #222;
  /* ... */
}
```

### Configuration Jekyll
Le fichier `_config.yml` contient :
- Paramètres SEO
- Optimisations de performance
- Configuration des plugins
- Métadonnées du site

## 📱 Fonctionnalités

### Page d'Accueil
- **Recherche en temps réel** : Filtrage instantané des articles
- **Filtres par langue** : Français/English
- **Filtres par tags** : Sélection multiple
- **Design responsive** : Adapté à tous les écrans

### Articles
- **Navigation entre articles** : Précédent/Suivant
- **Tags interactifs** : Liens vers articles similaires
- **Boutons de copie** : Code facilement copiable
- **Sidebar rétractable** : Plus d'espace de lecture

### Accessibilité
- **Navigation clavier** : Tab, Enter, Espace
- **Lecteurs d'écran** : ARIA labels et skip links
- **Contraste élevé** : Mode sombre automatique
- **Réduction de mouvement** : Respect des préférences utilisateur

## 🌐 Déploiement

Le site est automatiquement déployé sur GitHub Pages à chaque push sur la branche `main`.

### Prérequis
- Compte GitHub
- Repository public
- Branche `main` configurée

### Processus
1. Push du code sur `main`
2. GitHub Actions build automatique
3. Déploiement sur `https://ncheymol.github.io`

## 📈 Monitoring

### Analytics
- **Google Analytics 4** : Suivi des visiteurs
- **Console de performance** : Métriques de chargement
- **Service Worker** : Cache et offline tracking

### Métriques Clés
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le repository
2. Créer une branche feature
3. Implémenter les changements
4. Tester les performances
5. Soumettre une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Nicolas CHEYMOL**
- Architecte & Practice Leader
- Expert Modern Workplace & Sécurité
- Formateur & Conférencier

- [LinkedIn](https://www.linkedin.com/in/ncheymol/)
- [GitHub](https://github.com/ncheymol)
- [Sessionize](https://sessionize.com/nicolas-cheymol/)

---

*Dernière mise à jour : {{ site.time | date: "%B %Y" }}* 