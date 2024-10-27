<?php

namespace Jay\core;

use Jay\core\Database;

class Model
{
  protected $db;
  private $Numer = 2;
  public function __construct()
  {
    $this->db = Database::getInstance();
  } 

  // Optimizar las consultas a la db
  public function query(string $query)
  {
    return $this->db->getConnection()->query($query);
  }
  public function prepare(string $query)
  {

    return $this->db->getConnection()->prepare($query);
  }
  public function close()
  {
    $this->db = null;
  }
}
