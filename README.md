# movies-app

**Description du projet**

Ce projet est une application full-stack avec  **Laravel** au backend, **React.j**s au frontend, et communique avec l'API TMDb pour afficher et mettre à jour les informations.

# Étapes d'Installation

## 1. Cloner le projet

Commencez par cloner ce dépôt Git sur votre machine locale à l'aide de la commande suivante :

git clone https://github.com/mehdifox/movies-app.git

## 2. Configurer le projet Laravel (Backend)

### 2.1. Naviguer dans le répertoire du projet Laravel

cd laravel

### 2.2. Installer les dépendances avec Composer

Assurez-vous d'avoir Composer installé sur votre machine. Puis, installez les dépendances du projet Laravel :

composer install

### 2.3. Copier le fichier .env.example

cp .env.example .env

### 2.4. Configurer les variables d'environnement

Ouvrez le fichier .env et choisissez un nom de base de données.

### 2.5. Générer la clé d'application Laravel

php artisan key:generate

### 2.6. Exécuter les migrations et remplir la base de données

php artisan migrate

### 2.7. Lancer le serveur Laravel

Enfin, démarrez le serveur local de Laravel avec la commande suivante. Votre application sera accessible à http://localhost:8000 :

php artisan serve

### 2.8. Récupérer les données des films et les stocker dans la base de données

Une fois que le serveur Laravel est lancé, vous devez récupérer les données des films à partir de l'API TMDb et les stocker dans la base de données. Pour cela, exécutez la commande suivante :

php artisan fetch:trending-movies

Cette commande va appeler l'API TMDb pour récupérer les films populaires et les enregistrer dans la base de données. Cela vous permet de commencer à travailler avec des données réelles de films dans l'application.

### 2.9. Configurer la mise à jour quotidienne des films

L'application peut être configurée pour mettre à jour automatiquement les informations des films chaque jour. Pour cela, exécutez la commande suivante :

php artisan schedule:run

si vous souhaitez que cette tâche se déclenche automatiquement tous les jours, vous devez configurer un cron job.

### 2.10. Créer un utilisateur (via l'API)

Après avoir lancé le serveur Laravel avec la commande `php artisan serve`, vous pouvez créer un utilisateur via l'API de votre application.

Pour ce faire, accédez à l'URL suivante dans votre navigateur ou via un outil comme **Postman** ou votre **navigateur** :"

http://localhost:8000/api/createUser


Cela vous permettra de créer un utilisateur avec les informations suivantes :

- **Email** : `admin@gmail.com`
- **Mot de passe** : `123456`


# 3. Configurer le projet React (Frontend)

## 3.1. Naviguer dans le répertoire du projet React

Accédez au dossier frontend de votre projet React :

cd reactJs

## 3.2. Installer les dépendances avec npm

Assurez-vous d'avoir Node.js et npm installés sur votre machine. Ensuite, installez les dépendances du projet React :

npm install

## 3.3. Démarrer le serveur de développement React

Une fois les dépendances installées, vous pouvez démarrer le serveur de développement React. Par défaut, l'application sera accessible à http://localhost:3000 :

L'application React se lancera dans votre navigateur.

# Fonctionnalités

**Mettre à jour les informations des films une fois par jour** : L'application récupère les informations des films depuis l'API TMDb et met à jour les films (ajout de nouveaux films et modification des informations des films existants en cas de changement) dans une base de données MySQL.

**Affichage et mise à jour** : Vous pouvez vous authentifier et accéder directement à la liste des films.

**Recherche** : Une barre de recherche est intégrée pour filtrer et trouver des films spécifiques (recherche par nom ou titre des films).

**Scroll infini** : L'application charge progressivement de nouveaux films lorsque vous faites défiler la page.

**Afficher les détails d'un film** : Affichage des détails d'un film ainsi qu'un lien vers son image.

**Modifier les informations d'un film** : Vous pouvez modifier les informations d'un film de manière simple.

**Suppression d'un film** : Vous pouvez supprimer un film et la liste sera mise à jour immédiatement.

# Technologies Utilisées

Backend : Laravel

Frontend : React.js

API externe : The Movie Database (TMDb)

Base de données : MySQL

Packages et Outils :Axios, Toastr, Bootstrap, React-confirm-alert, React-router-dom, Laravel Sanctum ...
