# GAUL - Groupe Aérospatial de l'Université Laval

![GAUL Banner](src/assets/img/page-home/logo-full.webp)

## Guide de développement du site web

URL : https://gaulspace.web.app

### Téléchargements et installations nécessaires

- NodeJS: https://nodejs.org/en/
- Git: https://git-scm.com/
- Angular CLI:

```bash
npm install -g @angular/cli
```

- Firebase CLI:

```bash
npm install -g firebase-tools
```

### Cloner et travailler sur un serveur local

```bash
git clone https://github.com/ul-gaul/website.git
```

```bash
cd website
```

```bash
npm install
```

```bash
ng serve --open
```

### Déployer sur Firebase

L'application web est hébergée sur [Google Firebase](https://firebase.google.com/products/hosting). Le compte Google du GAUL (groupe.aerospatial.ul@gmail.com) ou le compte personnel de Guillaume Landry sont utilisés pour l'accès à l'hébergement.

```bash
firebase login
```

```bash
ng build --configuration production
```

```bash
firebase deploy
```


### Images (Assets)

- Importer des images en format ".webp".
- Les logos de partenaires sont de dimension 800 x 450 pixels.
- Classer les images dans les différents sous-dossiers de "Assets".
- Nomenclature des images: nom évocateur, lettres minuscules, mots séparés d'un "-". (Pour les logos, toujours ajouter "logo-" comme préfixe)

### Concernant la manipulation d'images

- Converstion de fichier et redimensionnement: https://www.iloveimg.com/fr
- Équivalent en ligne de Photoshop: https://www.photopea.com/

## Crédits

Repo principal: [ul-gaul/website](https://github.com/ul-gaul/website)

Généré avec [Angular CLI](https://github.com/angular/angular-cli)

Basé sur le template [Paper Kit 2](https://www.creative-tim.com/product/paper-kit-2-angular) par [Creative Tim](https://www.creative-tim.com/)
