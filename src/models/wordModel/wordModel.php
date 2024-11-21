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

    /**
     * Constructor de la clase wordModel.
     * 
     * Inicializa un nuevo objeto wordModel. Actualmente, no se pasan parámetros.
     */
    public function __construct() {
        // El constructor está vacío, ya que el ID se establecerá mediante el setter
    }

    // Getters y setters

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
