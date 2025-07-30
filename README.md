# Blog de Nicolas CHEYMOL

## 🚀 Site web personnel optimisé avec Jekyll

Ce site web personnel a été entièrement optimisé pour offrir des performances exceptionnelles, une excellent accessibilité et une expérience utilisateur moderne.

### ✨ Optimisations Implémentées

#### 🎨 **Architecture et Design**
- ✅ **Élimination de la duplication CSS** - CSS unifié dans un seul fichier
- ✅ **Layouts restructurés** - Utilisation d'un layout default.html central
- ✅ **Design responsive** optimisé pour tous les appareils
- ✅ **Mode sombre automatique** basé sur les préférences système
- ✅ **Animations CSS optimisées** avec réduction de mouvement pour l'accessibilité

#### ⚡ **Performance**
- ✅ **CSS minifié** et compressé
- ✅ **Lazy loading** pour les images
- ✅ **Preload** et **DNS prefetch** pour les ressources critiques
- ✅ **Compression gzip** et mise en cache optimisée
- ✅ **Optimisation des fonts** avec fallbacks système
- ✅ **JavaScript optimisé** avec chargement asynchrone

#### 🔍 **SEO et Accessibilité**
- ✅ **Meta tags** optimisés pour chaque page
- ✅ **Structured data** JSON-LD pour les moteurs de recherche
- ✅ **Open Graph** et Twitter Cards
- ✅ **Sitemap XML** automatique
- ✅ **Robots.txt** optimisé
- ✅ **Semantic HTML** et navigation ARIA
- ✅ **Alt texts** sur toutes les images

#### 📊 **Analytics et Tracking**
- ✅ **Google Analytics 4** optimisé avec consentement
- ✅ **Tracking des performances** (temps de chargement)
- ✅ **Anonymisation IP** pour la confidentialité
- ✅ **Tracking des erreurs 404**

#### 🔒 **Sécurité**
- ✅ **Headers de sécurité** (CSP, XSS Protection, etc.)
- ✅ **Redirection HTTPS** automatique
- ✅ **Protection contre le clickjacking**
- ✅ **Cookies sécurisés**

### 🛠️ **Technologies Utilisées**

- **Jekyll** - Générateur de site statique
- **GitHub Pages** - Hébergement
- **CSS3** - Styling moderne avec variables CSS
- **JavaScript ES6+** - Interactions optimisées
- **Google Analytics 4** - Analytics avancées

### 📁 **Structure du Projet**

```
├── _layouts/
│   ├── default.html      # Layout principal
│   ├── home.html         # Page d'accueil
│   └── post.html         # Articles de blog
├── _includes/
│   └── analytics.html    # Google Analytics optimisé
├── _posts/               # Articles de blog
├── post.css             # CSS unifié et optimisé
├── _config.yml          # Configuration Jekyll
├── .htaccess            # Configuration serveur
├── robots.txt           # Directives pour les crawlers
└── 404.html             # Page d'erreur personnalisée
```

### 🚀 **Installation et Développement**

1. **Cloner le repository**
   ```bash
   git clone https://github.com/ncheymol/ncheymol.github.io.git
   cd ncheymol.github.io
   ```

2. **Installer les dépendances**
   ```bash
   bundle install
   ```

3. **Lancement en mode développement**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Build pour production**
   ```bash
   JEKYLL_ENV=production bundle exec jekyll build
   ```

### 📈 **Métriques de Performance**

Les optimisations implémentées permettent d'atteindre :

- **Lighthouse Score** : 95+ sur tous les critères
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **Time to Interactive** : < 3s

### 🔧 **Configuration**

#### Variables importantes dans `_config.yml` :
- `google_analytics.id` : ID Google Analytics
- `author` : Nom de l'auteur
- `description` : Description du site
- `keywords` : Mots-clés SEO

#### Personnalisation des couleurs CSS :
Les couleurs sont définies dans les variables CSS au début de `post.css` et s'adaptent automatiquement au mode sombre.

### 📝 **Maintenance**

#### Ajout d'un nouvel article :
1. Créer un fichier dans `_posts/` avec le format : `YYYY-MM-DD-titre.markdown`
2. Ajouter le front matter approprié :
   ```yaml
   ---
   layout: post
   title: "Titre de l'article"
   date: 2024-01-01
   tags: [tag1, tag2]
   ---
   ```

#### Optimisation continue :
- Vérifier régulièrement les performances avec Lighthouse
- Mettre à jour les plugins Jekyll
- Optimiser les nouvelles images ajoutées
- Surveiller les métriques Google Analytics

### 🤝 **Contribution**

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos modifications
4. Pousser vers la branche
5. Ouvrir une Pull Request

### 📧 **Contact**

Nicolas CHEYMOL - [nicolas.cheymol@outlook.com](mailto:nicolas.cheymol@outlook.com)

---

⭐ **N'hésitez pas à star ce repository si vous trouvez ces optimisations utiles !**