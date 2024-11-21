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
    private $intento;

    public function __construct() {
        // El constructor está vacío, ya que el ID se establecerá mediante el setter
    }

    // getters y setters
    public function getId(): int { 
        return $this->id; 
    }

    public function setId(int $id): void { 
        $this->id = $id; 
    }

    public function getIntento() { 
        return $this->intento; 
    }

    public function setIntento($intento): void { 
        $this->intento = $intento; 
    }
}
