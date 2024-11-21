<?php

namespace Jay\controllers\home;

/**
 * HomeController
 * 
 * Esta clase es responsable de manejar las acciones relacionadas con la vista de inicio.
 * En este caso, su única responsabilidad es cargar la vista principal de la página de inicio.
 */
class HomeController
{
    /**
     * Constructor del HomeController.
     * 
     * Aquí se incluye el archivo de la vista de la página de inicio para mostrarlo al usuario.
     * 
     * @return void
     */
    public function __construct()
    {
        // Se requiere el archivo de vista principal de inicio
        require_once __DIR__ . '/../../views/home/index.php';
    }
}
