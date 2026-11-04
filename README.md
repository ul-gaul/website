# GAUL - Groupe Aérospatial de l'Université Laval

![GAUL Banner](src/assets/img/page-home/logo-full.webp)

## Guide de développement du site web

URL : https://gaulspace.web.app

## Modifier le contenu sans coder

Les textes, liens, images et données courantes peuvent être modifiés sans ouvrir les fichiers Angular (`.ts`, `.html` ou `.scss`). Les emplacements importants sont :

- Configuration générale, liens, images fixes, footer, carrousel et modèles 3D : [src/assets/site-content.jsonc](src/assets/site-content.jsonc)
- Textes français : [src/assets/i18n/fr.json](src/assets/i18n/fr.json)
- Textes anglais : [src/assets/i18n/en.json](src/assets/i18n/en.json)
- Membres et équipes : [src/assets/docs/members.csv](src/assets/docs/members.csv)
- Fusées et spécifications : [src/assets/docs/rockets.csv](src/assets/docs/rockets.csv)
- Événements : [src/assets/docs/events.csv](src/assets/docs/events.csv)
- Partenaires : [src/assets/docs/parteners.csv](src/assets/docs/parteners.csv)
- Produits Merch : [src/assets/data/products.csv](src/assets/data/products.csv)
- Variantes, prix et disponibilités Merch : [src/assets/data/product-variants.csv](src/assets/data/product-variants.csv)
- Configuration des commandes Merch et du paiement Interac : [src/assets/site-content.jsonc](src/assets/site-content.jsonc), section `emailjs`
- Documents PDF : [src/assets/docs](src/assets/docs)
- Images partagées et images des pages : [src/assets/img](src/assets/img)
- Images d'en-tête de chaque page : clés `images.<page>Header` dans [src/assets/site-content.jsonc](src/assets/site-content.jsonc) (`homeHeader`, `fuseeHeader`, `spaceHeader`, `stratosHeader`, `teamsHeader`, `showcaseHeader`, `eventsHeader`, `partenairesHeader`, `merchHeader`)
- Images des produits Merch : [src/assets/img/page-merch/inventory](src/assets/img/page-merch/inventory)
- Images du carrousel : [src/assets/img/page-home/carousel](src/assets/img/page-home/carousel)

### Modifier un lien ou une image fixe

Ouvrir `site-content.jsonc`, chercher le commentaire qui décrit le champ, puis modifier uniquement la valeur entre guillemets. Pour une nouvelle image, la déposer dans le dossier approprié sous `src/assets/img`, puis remplacer le chemin dans le champ correspondant. Les commentaires `//` expliquent chaque champ et doivent être conservés.

### Modifier une liste

Ouvrir le CSV concerné dans le dossier indiqué dans la liste ci-dessus. Une ligne représente généralement un élément affiché sur le site : une personne, une fusée, un événement, un partenaire, un produit Merch ou une variante Merch. Ajouter une ligne ajoute un élément, modifier une ligne le met à jour et supprimer une ligne le retire. Pour les fichiers sous `src/assets/docs`, les chemins d'images commencent par `./assets/img/`; pour les fichiers Merch sous `src/assets/data`, ils commencent par `assets/img/`.

### Modifier un texte

Modifier la même clé dans `fr.json` et `en.json`. La clé doit rester identique dans les deux fichiers; seule la valeur traduite change. Les titres du carrousel et de la vitrine 3D se trouvent plutôt dans `site-content.jsonc`.

### Parcours recommandé

1. Modifier le fichier de contenu approprié.
2. Ajouter ou remplacer les images dans le dossier prévu.
3. Double-cliquer sur [update-dependencies-site.cmd](update-dependencies-site.cmd) pour mettre à jour les dépendances du site.
4. Double-cliquer sur [test-site.cmd](test-site.cmd) pour vérifier le résultat localement.
5. Double-cliquer sur [publish-site.cmd](publish-site.cmd) pour construire et publier le site.

## Scripts Windows

- Double-cliquer sur [update-dependencies-site.cmd](update-dependencies-site.cmd) pour installer les dépendances et appliquer les correctifs de sécurité npm.
- Double-cliquer sur [test-site.cmd](test-site.cmd) pour lancer le site localement et visualiser les changements avant la publication.
- Double-cliquer sur [publish-site.cmd](publish-site.cmd) pour construire puis publier le site sur Firebase.
- Les scripts PowerShell correspondants sont [test-site.ps1](test-site.ps1), [publish-site.ps1](publish-site.ps1) et [update-site.ps1](update-site.ps1).

Si Firebase n'est pas encore connecté, le script de publication ouvre automatiquement la page de connexion dans le navigateur. Cette étape est faite une seule fois par ordinateur. Laissez la console s'executer et appuyer sur une touche lorsque indiqué.

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
npm start
```

```bash
npm run deploy
```

## Gérer les données (Membres / Fusées / Événements / Carousel / Merch)

Les listes dynamiques du site sont stockées sous forme de CSV dans `src/assets/docs` et `src/assets/data`. Après modification, les changements sont immédiatement visibles après un redéploiement.

Fichiers principaux :
- Membres : [src/assets/docs/members.csv](src/assets/docs/members.csv)  
- Fusées : [src/assets/docs/rockets.csv](src/assets/docs/rockets.csv)  
- Événements : [src/assets/docs/events.csv](src/assets/docs/events.csv)  
- Produits Merch : [src/assets/data/products.csv](src/assets/data/products.csv)
- Variantes, prix et disponibilités Merch : [src/assets/data/product-variants.csv](src/assets/data/product-variants.csv)

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

### Carousel — Ajouter / Modifier / Supprimer
- Éditez le contenu du dossier [src/assets/img/page-home/carousel](src/assets/img/page-home/carousel).
- Modifiez les fichiers et les titres dans [src/assets/site-content.jsonc](src/assets/site-content.jsonc), section `carousel`.

---

## Boutique Merch — Ajouter / Modifier / Supprimer

La page Merch affiche le catalogue, permet d'ajouter des articles au panier et envoie les commandes par courriel via EmailJS. Les données du catalogue sont chargées depuis :

- Produits : [src/assets/data/products.csv](src/assets/data/products.csv)
- Variantes, prix et stocks : [src/assets/data/product-variants.csv](src/assets/data/product-variants.csv)
- Configuration EmailJS et informations de paiement : [src/assets/site-content.jsonc](src/assets/site-content.jsonc), section `emailjs`

### Produits

Éditez [src/assets/data/products.csv](src/assets/data/products.csv). L'en-tête est :

```
id,name,type,description,image,available
```

Règles :

- `id` : identifiant unique du produit; il doit être réutilisé dans `product_id` du fichier des variantes.
- `name` : nom affiché du produit.
- `type` : catégorie affichée, par exemple `vêtement` ou `accessoire`.
- `description` : description courte affichée dans le catalogue. Entourer de guillemets les valeurs contenant une virgule.
- `image` : chemin de l'image depuis `src`, par exemple `assets/img/shared/logo-small.webp`.
- `available` : `true` pour afficher le produit comme disponible, `false` pour désactiver ses boutons d'ajout.

### Variantes, prix et disponibilités

Éditez [src/assets/data/product-variants.csv](src/assets/data/product-variants.csv). L'en-tête est :

```
id,product_id,label,size,price,currency,available
```

Règles :

- `id` : identifiant unique de la variante.
- `product_id` : valeur de `id` du produit parent.
- `label` : libellé affiché, par exemple `Noir - M`.
- `size` : taille ou format transmis dans le courriel de commande.
- `price` : prix numérique, sans symbole monétaire.
- `currency` : code de devise ISO, généralement `CAD`.
- `available` : `true` pour permettre l'ajout, `false` pour désactiver la variante.

Pour ajouter un article, ajoutez d'abord une ligne dans `products.csv`, puis une ou plusieurs lignes correspondantes dans `product-variants.csv`. Pour retirer temporairement un article ou une variante, mettez `available` à `false`. La quantité commandée est saisie par le client et n'est pas limitée par un inventaire dans le CSV; vérifiez donc la disponibilité réelle avant de confirmer la commande.

### Images de produits

Les images générales utilisées par la page Merch doivent être placées dans [src/assets/img/page-merch](src/assets/img/page-merch). Les photos des objets vendus (hoodie, t-shirt, gourde, etc.) doivent être placées dans [src/assets/img/page-merch/inventory](src/assets/img/page-merch/inventory). Utilisez un chemin relatif dans la colonne `image` de `products.csv`, par exemple `assets/img/page-merch/inventory/hoodie-gaul.webp`, et privilégiez le format WebP. Vérifiez que le chemin commence par `assets/img/`; il ne doit pas commencer par `./assets/` dans ces CSV.

### Parcours de commande

- Le panier est conservé localement dans le navigateur sous la clé `gaul-merch-cart`.
- Le nom et le courriel sont obligatoires; le téléphone, le montant de soutien et les commentaires sont facultatifs.
- Le numéro de téléphone accepte exactement 10 chiffres.
- Le montant de soutien est compris entre 0 et 10 000 CAD et est ajouté au total.
- La case d'accord doit être cochée avant l'envoi.
- Une commande ne peut être envoyée que si le panier contient au moins un article.
- Après l'envoi, le client reçoit un numéro de commande `GAUL-XXXX` et les instructions de paiement et de récupération.

Le paiement n'est pas automatisé. L'équipe doit vérifier manuellement le dépôt Interac à l'adresse indiquée dans `site-content.jsonc`, comparer le numéro de commande, le nom et le montant, puis confirmer le paiement avant de remettre la commande. Les coordonnées de récupération affichées proviennent de la section `footer` du même fichier.

### EmailJS

La section `emailjs` de [src/assets/site-content.jsonc](src/assets/site-content.jsonc) contient la clé publique, le service, le modèle, l'adresse administrative et l'adresse Interac utilisés par la boutique. La clé publique EmailJS peut être exposée dans l'application cliente; ne placez jamais de clé privée ou de secret dans ce fichier. Si le service ou le modèle EmailJS change, mettez à jour les identifiants correspondants et vérifiez que le modèle conserve les variables envoyées par la page (`order_number`, `customer_name`, `order_items`, `order_total`, `interac_email`, etc.).

Après toute modification de la boutique, lancez [test-site.cmd](test-site.cmd), testez l'ajout d'une variante, la modification de quantité, la suppression d'une ligne et l'envoi d'une commande de test avant de publier avec [publish-site.cmd](publish-site.cmd).

### Validation manuelle d'un virement Interac

L'équipe du GAUL doit comparer le numéro de commande reçu par courriel, le nom du client et le montant avec le dépôt automatique reçu dans le compte Interac. Après confirmation du montant, marquez la commande comme payée dans votre suivi interne et communiquez au client le moment et le lieu de récupération. Ne remettez pas de matériel avant que le dépôt soit confirmé; le courriel de commande reste à l'état « En attente de paiement » jusqu'à cette vérification humaine.

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
- Placer les images dans le dossier de la page concernée sous `src/assets/img/...`.
- Dans les CSV sous `src/assets/docs`, utiliser des chemins relatifs commençant par `./assets/img/...`.
- Dans les CSV Merch sous `src/assets/data`, utiliser des chemins commençant par `assets/img/...`; les photos des produits vont dans `src/assets/img/page-merch/inventory`.
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
