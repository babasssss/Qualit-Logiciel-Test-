#FR
# Node JS - Développement piloté par les tests 

Ce projet est réalisé à des fins pédagogiques.

# Initialisation de l'un des deux dossiers
1. cd CRUD users | cd bookings
2. Instalation des dépendences
    ```bash
    npm i
    ```
3. Test avec audit de couverture
    ```bash
    npm test
    ```
4. Développement piloté par les tests
    ```bash
    npm run tdd
    ```


## PARTIE 1 -  À faire  -> CRUD users
1. Ajoutez la classe User dans votre modèle
N’oubliez pas de l’importer dans l’index.js !

2. Créez le userRepo dans les référentiels
N’oubliez pas de l’importer dans l’index.js !

3. Ajoutez des simulations d’utilisateurs pour s’adapter à vos tests

3. Créez le CRUD /users
ASTUCE : Inspirez-vous avec le /books

IMPORTANT : Règles métier à prendre en compte
- L’identifiant, de type UUID, sera généré aléatoirement côté backend
- Date (format anglais uniquement) : AAAA-MM-DD
- Téléphone (français uniquement) : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres

## PARTIE 2 -  À faire  -> CRUD bookings
1. Ajoutez la classe Booking dans votre modèle
N’oubliez pas de l’importer dans l’index.js !

2. Créez le bookingRepo dans les référentiels
N’oubliez pas de l’importer dans l’index.js !

3. Ajoutez des simulations de réservations pour s’adapter à vos tests

4. Créez le /booking CRUD
CONSEILS:
- Laissez-vous inspirer par le /books
- Utiliser momentjs pour manipuler les dates

IMPORTANT : Règles métier à prendre en compte
- L’identifiant, de type UUID, sera généré aléatoirement côté backend
- Date de location / Date de retour (format anglais uniquement) : YYYY-MM-DD
- Lieu de la date < Date retour
- L’utilisateur doit être enregistré en BDD
- Un livre / film peut être loué uniquement s’il ne l’est pas déjà
