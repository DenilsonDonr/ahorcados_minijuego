<?php

# Configuracion de zona horario
date_default_timezone_set('America/Lima');


# Configuracion por defecto para mostrar los errores
error_reporting(E_ALL);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', FALSE);
ini_set('log_errors', TRUE);
ini_set("error_log", 'debug.log');


# Es esencial para que funcione el proyecto
require_once 'vendor/autoload.php';


echo 'hola';
