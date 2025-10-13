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

## Gérer les données (Membres / Fusées / Événements)

Les listes dynamiques du site sont stockées sous forme de CSV dans le dossier `src/assets/docs`. Après modification, les changements sont immédiatement visibles après un redéploiement.

Fichiers principaux :
- Membres : [src/assets/docs/members.csv](src/assets/docs/members.csv)  
- Fusées : [src/assets/docs/rockets.csv](src/assets/docs/rockets.csv)  
- Événements : [src/assets/docs/events.csv](src/assets/docs/events.csv)  

---

### Membres — Ajouter / Modifier / Supprimer
- Éditez [src/assets/docs/members.csv](src/assets/docs/members.csv).  
- Format (en-tête) :  
  ```
  section,subsection,titleKey,name,role,photo,linkedin,lead
  ```
- Exemple d’une ligne :
  ```
  fusee,propulsion,fusee.title,Émilien Bolduc,Co-Directeur Propulsion • Lead Igniter,./assets/img/page-teams/rocket/emilien.webp,https://www.linkedin.com/in/emilien/,
  ```
- Règles :
  - `section` doit correspondre à la clé de la section (`director`, `fusee`, `espace` ou `stratos`).
  - `subsection` doit correspondre à la clé de la sous-section (`aerostructure`, `avionique`, `propulsion`, `payload` ou `marketing`) - peut être vide.
  - `titleKey` : clé de traduction pour le titre de la section (ex. `fusee.title`) affichée via le système i18n.
  - `name` : nom complet du membre.
  - `role` : rôle affiché sous le nom (ex. “Directeur Aérostructure • Lead Simulation”).  
  - `photo` : chemin relatif de la photo dans `src/assets/img/...` au format `.webp`.  
    - Ajouter la photo correspondante dans le répertoire `src/assets/img/page-teams/<section>/` (`rocket/`, `space/`, `stratos/` selon la section).  
    - Nom du fichier recommandé : prénom.webp (tout en minuscules, sans espace ni accent).  
  - `linkedin` : URL du profil LinkedIn (laisser vide si absent).
  - `lead` : champ optionnel de texte d’introduction ou lead pour la section (utilisé comme paragraphe d’accroche).
    
  - Supprimer une ligne => suppression du membre.
  - Ajouter une ligne => ajout du nouveau membre.
  - Modifier une ligne => modification des informations du membre.
---

### Fusées — Ajouter / Modifier / Supprimer
- Éditez [src/assets/docs/rockets.csv](src/assets/docs/rockets.csv).  
- En-tête visible dans le fichier :  
  ```
  id,name,year,image,competition,category,ranking,altitude,showDetails,description,specs
  ```
- Exemple minimal (ligne) :
  ```
  nova,Nova,2026,./assets/img/page-fusee/nova.webp,LC,Basic,1,"12 000'",true,"Launch Canada 2026","{""fusee"":{""dimensions"":""...""},""avionique"":{""ground"":""...""},""payload"":{""text"":""...""}}"
  ```
- Règles :
  - `id` : identifiant unique court (sans espaces) utilisé pour référencer la fusée.  
  - `name` : nom affiché de la fusée.  
  - `year` : année de développement / lancement.  
  - `image` : chemin relatif vers la vignette dans `src/assets/img/...` au format `.webp`.  
    - Ajouter la vignette correspondante dans le répertoire `src/assets/img/page-fusee/`.  
    - Nom du fichier recommandé : nom-de-la-fusee.webp (tout en minuscules, sans espace ni accent).  
  - `competition` : compétition associée (ex. `LC`, `IREC`, `SAC`) ou `N/A`.  
  - `category` : catégorie / classe de la fusée (ex. `Basic`, `Double - 30k COTS`).  
  - `ranking` : classement obtenu (ou `N/A`).  
  - `altitude` : altitude réelle atteinte (ex. `"12 030'"`).  
  - `showDetails` : `true` / `false` — contrôle l’affichage par défaut des détails sur la carte de la fusée.  
  - `description` : texte court résumé ou libellé (ex. nom d’un concours).  
  - `specs` : JSON sérialisé contenant les sous-sections (`fusee`, `avionique`, `payload`, …). Doit être un JSON valide inscrit dans la cellule.
    
  - Supprimer une ligne => suppression du fusée.
  - Ajouter une ligne => ajout de la nouvelle fusée.
  - Modifier une ligne => modification des informations de la fusée.

---

### Événements — Ajouter / Modifier / Supprimer
- Éditez [src/assets/docs/events.csv](src/assets/docs/events.csv).  
- En-tête :
  ```
  start_date,end_date,title,desc,link
  ```
- Exemple :
  ```
  2026-06-20,2026-07-04,IREC,"Compétition IREC 2026 - Lancement Fusée 45k",https://www.soundingrocket.org/
  ```
- Règles :
  - `start_date` : date de début au format ISO `YYYY-MM-DD` (utilisé pour placer l’événement sur le calendrier).  
  - `end_date` : date de fin au format ISO `YYYY-MM-DD` (si l'évènement est sur une seule journée, `end_date` => `start_date`).  
  - `title` : titre affiché de l’événement.  
  - `desc` : description courte de l’événement.  
  - `link` : URL optionnelle vers l'évènement ou pour plus d'informations (laisser vide si non applicable ; sera normalisée si nécessaire).
    
  - Supprimer une ligne => l’événement disparait du calendrier.
  - Ajouter une ligne => l'évènement apparaît dans le calendrier.
  - Modifier une ligne => l’événement est modifié au calendrier.

---

## Traductions — Ajouter / Modifier / Supprimer

Fichiers de traduction :
- Français : [src/assets/i18n/fr.json](src/assets/i18n/fr.json)  
- Anglais : [src/assets/i18n/en.json](src/assets/i18n/en.json)  

Procédure pour modifier une clé
1. Modifier la clé aux 2 emplacements en respectant la structure JSON (imbriquer par section). Exemple :
  - fr.json ([src/assets/i18n/fr.json](src/assets/i18n/fr.json)
   ```
   {
     "teams": {
       "label": "Mon libellé modifié"
     }
   }
   ```
   - en.json [src/assets/i18n/en.json](src/assets/i18n/en.json))
   ```
   {
     "teams": {
       "label": "My modified label"
     }
   }
   ```
2. Redéployer le serveur et vérifier l’affichage.

---

### Images (Assets)
- Placer les images dans `src/assets/img/...` et utiliser les chemins relatifs dans les CSV (`./assets/img/...`).
- Préférer le format WebP pour taille et performance.
- Tailles recommandées :
  - Photos membres : ~300×300 (carré), compressées.
  - Logos partenaires : 800×450 (comme indiqué).
- Visualiser les images locales avec `ng serve`.

### Concernant la manipulation d'images

- Converstion de fichier et redimensionnement: https://www.iloveimg.com/fr
- Équivalent en ligne de Photoshop: https://www.photopea.com/

---

## Crédits

Repo principal: [ul-gaul/website](https://github.com/ul-gaul/website)

Généré avec [Angular CLI](https://github.com/angular/angular-cli)

Basé sur le template [Paper Kit 2](https://www.creative-tim.com/product/paper-kit-2-angular) par [Creative Tim](https://www.creative-tim.com/)
