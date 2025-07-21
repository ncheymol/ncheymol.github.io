# Blog personnel avec Jekyll

Bienvenue sur mon blog personnel, construit avec [Jekyll](https://jekyllrb.com/) et le thème Minima.  
Retrouvez des articles, des astuces et des ressources sur le développement web.

![Aperçu du blog](docs/assets/demo-home.png)

## Fonctionnalités

- Blog statique généré avec Jekyll
- Thème Minima personnalisable
- Articles au format Markdown
- Support des pages statiques (About, 404, etc.)
- Intégration de PDF et de ressources externes

## Structure du projet

```
.
├── index.html
├── docs/
│   ├── _config.yml
│   ├── about.markdown
│   ├── index.markdown
│   ├── _posts/
│   │   └── 2025-04-26-welcome-to-jekyll.markdown
│   └── ...
├── Avis d’expert – Comment adopter une stratégie Anywhere Anytime Anydevice, tout en assurant la conformité et la sécurité des données.html
├── Avis d’expert – Comment adopter une stratégie Anywhere Anytime Anydevice, tout en assurant la conformité et la sécurité des données.pdf
└── How to deploy ConfigMgr client using Intune and Autopilot.pdf
```

## Aperçu

Page d’accueil personnalisée :

![Accueil](docs/assets/demo-index.png)

Affichage intégré de PDF :

![Lecteur PDF](docs/assets/demo-pdf.png)

## Démarrer en local

1. Installe [Ruby](https://www.ruby-lang.org/fr/) et [Bundler](https://bundler.io/)
2. Va dans le dossier `docs` :
   ```sh
   cd docs
   bundle install
   bundle exec jekyll serve
   ```
3. Ouvre [http://localhost:4000](http://localhost:4000) dans ton navigateur.

## Personnalisation

- Modifie le thème ou les couleurs dans [`_config.yml`](docs/_config.yml)
- Ajoute des articles dans [`_posts/`](docs/_posts/)
- Personnalise la page d’accueil dans [`index.html`](index.html)

---

© 2025 Ton Nom
