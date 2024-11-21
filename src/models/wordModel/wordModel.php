<?php


namespace Jay\models\wordModel;

class wordModel {

    private $id;
    private $intento;
    public function __construct() {
       
    }

    // getters y setters
    public function getId() { return $this->id; }
    public function setId($id) { $this->id = $id; }

    public function getIntento() { return $this->intento; }
    public function setIntento($intento) { return $this->intento = $intento; }
}

