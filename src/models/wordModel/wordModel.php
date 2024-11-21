<?php

namespace Jay\models\wordModel;

/**
 * wordModel
 * 
 * Esta clase representa un modelo para las palabras. Actualmente, solo contiene un atributo
 * de ID que se utiliza para identificar de manera única a cada palabra.
 */
class wordModel {

    /**
     * @var int $id Identificador único para la palabra
     */
    private $id;
<<<<<<< HEAD
    private $intento;
=======

    /**
     * Constructor de la clase wordModel.
     * 
     * Inicializa un nuevo objeto wordModel. Actualmente, no se pasan parámetros.
     */
>>>>>>> 49ed9383ce1ec5ca021183e64cfc90b8093a3165
    public function __construct() {
        // El constructor está vacío, ya que el ID se establecerá mediante el setter
    }

<<<<<<< HEAD
    // getters y setters
    public function getId() { return $this->id; }
    public function setId($id) { $this->id = $id; }

    public function getIntento() { return $this->intento; }
    public function setIntento($intento) { return $this->intento = $intento; }
}
=======
    // Getters y setters
>>>>>>> 49ed9383ce1ec5ca021183e64cfc90b8093a3165

    /**
     * Obtener el ID de la palabra.
     * 
     * Este método devuelve el valor del ID de la palabra.
     * 
     * @return int El ID de la palabra
     */
    public function getId(): int { 
        return $this->id; 
    }

    /**
     * Establecer el ID de la palabra.
     * 
     * Este método asigna un valor al ID de la palabra.
     * 
     * @param int $id El ID a asignar
     * @return void
     */
    public function setId(int $id): void { 
        $this->id = $id; 
    }
}
