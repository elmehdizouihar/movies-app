<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ajouter la route Sanctum ici

    'allowed_methods' => ['*'], // Permet toutes les méthodes (GET, POST, etc.)

    'allowed_origins' => [
        'http://localhost:3000',  // Permet uniquement localhost:3000 (votre frontend React)
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permet tous les headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,  // Cela permet l'envoi de cookies (très important pour CSRF)
];
