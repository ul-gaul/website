# GAUL - Groupe Aérospatial de l'Université Laval

![GAUL Banner](src/assets/general-gaul/logo-gaul.png)

## Guide de développement du site web

### Téléchargements et installations nécessaires
* NodeJS: https://nodejs.org/en/
* Git: https://git-scm.com/
* IDE Visual Studio Code (optionnel, mais recommandé): https://code.visualstudio.com/
* Angular CLI: Dans la console, 
```
npm install -g @angular/cli
```

### Cloner la destination pour effectuer des changements localement
(Pour en apprendre d'avantage sur l'utilisation de git avec github: https://guides.github.com/)

Ouvrir la console, puis entrer en ordre les commandes suivantes:
```
git clone https://github.com/GuillaumeLandry/GAUL.git
```
```
cd GAUL
```
```
npm install
```
Vous pouvez alors travailler localement sur le projet. Pour voir les changements en direct sur un serveur local dans le navigateur web:
```
ng serve --open
```

### "Pusher" les changements effectués dans la destination sur github
```
git pull
```
```
git add .
```
```
git commit -m " Court texte mentionnant les modifications apportées "
```
```
git push
```

### Images (Assets)
* Toujours importer des images ".PNG".
* Les logos de partenaires sont de dimension 800 x 450 pixels.
* Bien classer les images dans les différents sous-dossiers de "Assets".
* Nomenclature des images: nom évocateur, lettres minuscules, mots séparés d'un "-". (Pour les logos, toujours ajouter "logo-" comme préfixe)

### Conernant la manipulation d'images
* Converstion de fichier et redimensionnement: https://www.iloveimg.com/fr
* Équivalent en ligne de Photoshop: https://www.photopea.com/

## Crédits
Généré avec [Angular CLI](https://github.com/angular/angular-cli).
Basé sur un template par [Creative Tim](https://www.creative-tim.com/).