<?php

use Jay\controllers\home\HomeController;
use Jay\controllers\login\LoginController;
use Jay\controllers\word\WordController;

require_once __DIR__ . '/../middleware/login.php';

$router = new \Bramus\Router\Router();
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../config/');
$dotenv->load();

/**
 * Configuración de rutas principales.
 * 
 * Aquí se definen las rutas básicas y las rutas específicas de la API.
 */
$router->get('/', function () {
    $controller = new HomeController();
    // Llama al controlador de la página de inicio, pero no realiza ninguna acción aquí.
});

/**
 * 
 * Se manejan los procesos de registro, autenticación y cierre de sesión del usuario.
 */
$router->mount('/usuario/login', function () use ($router) {

    /**
     * Ruta para registrar un nuevo usuario.
     * 
     * @route POST /usuario/login/register
     * @return void
     */
    $router->post('/register', function () {
        $user = new LoginController();
        $user->registerUser();
    });

    /**
     * Ruta para autenticar a un usuario (verificación de usuario y contraseña).
     * 
     * @route POST /usuario/login/authenticate
     * @return void
     */
    $router->post('/authenticate', function () {
        $user = new LoginController();
        $user->authenticateUser();
    });

    /**
     * Ruta para cerrar la sesión del usuario.
     * 
     * @route GET /usuario/login/logout
     * @return void
     */
    $router->get('/logout', function () {
        $user = new LoginController();
        $user->logout();
    });
});

/**
 * Rutas relacionadas con el juego de palabras.
 * 
 * Aquí se gestionan las operaciones como obtener una palabra, guardar jugadas y obtener el puntaje.
 */
$router->mount('/word', function () use ($router) {

    /**
     * Ruta para obtener una palabra aleatoria del juego.
     * 
     * @route GET /word/getWord
     * @return void
     */
    $router->get('/getWord', function () {
        $word = new WordController();
        $word->getWord();
    });

    /**
     * Ruta para registrar una nueva jugada en el juego.
     * 
     * @route POST /word/addPlay
     * @return void
     */
    $router->post('/addPlay', function () {
        $word = new WordController();
        $word->addPlay();
    });

    /**
     * Ruta para obtener el puntaje actual del juego.
     * 
     * @route GET /word/getScore
     * @return void
     */
    $router->get('/getScore', function () {
        $word = new WordController();
        $word->getScore();
    });
});

/**
 * Ejecuta el enrutador para manejar las rutas definidas.
 * 
 * Este método permite que el enrutador procese las solicitudes HTTP entrantes y las dirija
 * a los controladores correspondientes según las rutas definidas.
 */
$router->run();
