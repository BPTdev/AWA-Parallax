# Effet Parallaxe
## Qu'est-ce que le Parallaxe ?
- **Définition :**
  - Le parallaxe est une technique de design et de programmation utilisée pour créer une illusion de profondeur dans une scène 2D. 
  - Il s'agit d'un effet visuel où les objets placés à différentes distances se déplacent à des vitesses différentes lors du défilement ou du mouvement de la souris.

## Non utilisation de bibliothèques 
Pour réaliser cet effet, nous avons décidé de ne pas utiliser de bibliothèques.
Cela permet de pouvoir comprendre le fonctionnement de l'effet et de pouvoir le modifier plus facilement.  
L'inconvénient est que cela demande plus de temps pour le réaliser.
Mais une fois fonctionnel il est aisé de l'utiliser avec les éléments de notre projet.

## Explications des Fonctions JavaScript pour l'Effet Parallaxe

### 1. Fonction `start()`
- **Paramètres :** Aucun.
- **Description :**
  - Appelée lorsque le DOM est complètement chargé.
  - Récupère les données depuis 'planets.json'.
  - Stocke ces données dans la variable `planets`.
  - Appelle la fonction `setupMouseMove()`.

### 2. Fonction `setupMouseMove()`
- **Paramètres :** Aucun.
- **Description :**
  - Configure un écouteur d'événements pour les mouvements de la souris.
  - Calcule les valeurs de déplacement basées sur la position de la souris.
  - Applique ces valeurs aux planètes pour créer l'effet de parallaxe.
  
- **Effet :**
  - Lorsque la souris se déplace vers la droite, les planètes se déplacent vers la gauche.
  - Lorsque la souris se déplace vers le haut, les planètes se déplacent vers le bas.
  - Lorsque la souris se déplace vers la gauche, les planètes se déplacent vers la droite.
  - Lorsque la souris se déplace vers le bas, les planètes se déplacent vers le haut.
  - De l'inertie est ajoutée pour créer un effet de "glissement".
  - Les planètes les plus proches du point d'observation se déplacent plus rapidement que les planètes plus éloignées.

### 3. Fonction `applyEffects(elements, mousePos, baseSpeed)`
- **Paramètres :**
  - `elements` : Tableau d'éléments (planètes) à déplacer.
  - `mousePos` : Position actuelle de la souris.
  - `baseSpeed` : Vitesse de base pour le mouvement parallaxe.
- **Description :**
  - Parcourt chaque élément du tableau `elements`.
  - Applique un effet de mouvement basé sur la position de la souris.
  - Utilise les vitesses spécifiques de chaque élément.
### 4. Fonction `moveObjects(element, mousePos, speedX, speedY)`
- **Paramètres :**
  - `element` : Élément HTML (planète) à déplacer.
  - `mousePos` : Position actuelle de la souris.
  - `speedX`, `speedY` : Vitesses de déplacement en X et Y.
- **Description :**
  - Calcule le déplacement en X et Y basé sur la position de la souris et les vitesses.
  - Applique ce déplacement à l'élément donné pour créer l'effet de parallaxe.

## Stockage des Données relatives aux Planètes

- Les données relatives aux planètes sont stockées dans un fichier JSON.
- Ce fichier est chargé par le script JavaScript au démarrage.
- Les données stockée dans un JSON permettent de facilement ajouter ou supprimer des planètes et modifier leurs vitesses et placements.

# Scroll & Autres animations

## Découpage
Notre application est découpée en plusieurs sections. La première section comprend le système solaire implémentant l'effet Parallaxe. Les autres sections sont dédiées aux informations sur les planètes. Notre application est donc sur une seule page.

## Scroll
Pour ajouter la gestion du scroll dans notre projet, nous avons intégré un Scroll Snap sur toutes les sections, donnant un effet de "slides". Un petit mouvement de scroll et la section suivante apparaît. Nous avons également ajouté une propriété CSS `scroll-behavior: smooth` et un header de navigation pour se rendre directement à une section de l'application

## Autres animations et détails
Pour ajouter un peu plus de dynamisme à notre application, nous avons ajouté quelques petites animations avec la librairie **GSAP**.

## Explications de code
Pour ajouter le Scroll Snap, nous avons englobé les sections dans une div, sur laquelle on applique du CSS `scroll-snap-type: y mandatory` et sur chaque section `scroll-snap-align: start`.

Nous utilisons également un `IntersectionObserver` afin de savoir quelle section est affichée et permettre d'appliquer les animations dynamiquement sur les éléments de la section. Les sections sont composées d'une partie description avec des informations et des chiffres concernant les planètes et une seconde partie avec une image.

- Check si l'ID de la section actuellement affichée est celui du système solaire.
- Récupération des éléments de la section
  - `img` : Partie image de la planète
  - `txt`: Partie description
  - `planet` : Elément du DOM représentant l'image de la planète
  - `description` : Elément du DOM représentatn la description de la planète
- Check si la section est affichée à l'écran (est interceptée par l'`IntersectionObserver`
  - Si elle ne l'est pas, cacher les éléments : `style.visibility = 'hidden'`
- **Afin d'éviter certains problèmes tels qu'un double déplacement ou effet de clignotement**
  - Désactiver le Scroll Snap avec du CSS : `scroll-snap-type: none !important`
  - Afficher les éléments : `style.visibility = 'visible'`
- Petites animations
  - `gsap.fromTo` (Tween) pour l'image, se déplaçant depuis la droite de l'écran avec un effet d'opacité
    - Une fois complétée, réactiver le Scroll Snap
  - `gsap.fromTo` (Tween) pour la description, déplaçant depuis la gauche de l'écran avec un effet d'opacité
