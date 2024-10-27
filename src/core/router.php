<?php

use Jay\controllers\home\HomeController;
use Jay\controllers\login\LoginController;
use Jay\controllers\word\WordController;

require_once __DIR__ . '/../middleware/login.php';

$router = new \Bramus\Router\Router();
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../config/');
$dotenv->load();


$router->get('/', function () {
    $controller = new HomeController();

});

// Aplicar middleware a la ruta 2protegida, Ejemplo
// $router->before('GET', '/protected', 'authMiddleware');

// $router->get('/protected', function() {
//     echo "Bienvenido a la sección protegida.";
// });

# Api de login
$router->mount('/usuario/login', function () use ($router) {
 
    # Register, registra el usuario
    $router->post('/register', function () {
        $user = new LoginController();
        $user->registerUser();
    });

    # Authenticate, valida el usuario y password
    $router->get('/authenticate', function () {
        // session_start();
        // $_SESSION['user'] = 'usuario'; // Simulación de inicio de sesión
        echo "Has iniciado sesión. Ahora puedes acceder a la sección protegida.";
    });

    # Logout, cierra la sesion
    $router->get('/logout', function () {
        // session_destroy();
        echo 'logout';
    });
});

# Rutas de word

$router->mount('/word', function () use ($router) {
    $router->get('/getWord', function () {
        $word = new WordController();
        $word->getWord();
    });
});

$router->run();