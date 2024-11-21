<?php

namespace Jay\core;

use Jay\core\Database;

/**
 * Clase Model
 * 
 * Esta clase gestiona las operaciones relacionadas con la base de datos, como ejecutar consultas
 * y preparar sentencias. Utiliza una instancia de la clase Database para interactuar con la conexión
 * a la base de datos.
 */
class Model
{
    /**
     * @var Database $db Instancia de la clase Database para gestionar la conexión a la base de datos.
     */
    protected $db;

    /**
     * @var int $Numer Valor numérico utilizado en algunas operaciones, por ahora con un valor por defecto de 2.
     */
    private $Numer = 2;

    /**
     * Constructor de la clase Model.
     * 
     * Inicializa la conexión a la base de datos al obtener la instancia de la clase Database.
     */
    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Ejecuta una consulta SQL.
     * 
     * @param string $query Consulta SQL a ejecutar.
     * @return mixed El resultado de la ejecución de la consulta.
     */
    public function query(string $query)
    {
        return $this->db->getConnection()->query($query);
    }

    /**
     * Prepara una sentencia SQL para su ejecución posterior.
     * 
     * @param string $query Consulta SQL a preparar.
     * @return \PDOStatement Una instancia de \PDOStatement que representa la consulta preparada.
     */
    public function prepare(string $query): \PDOStatement
    {
        return $this->db->getConnection()->prepare($query);
    }

    /**
     * Cierra la conexión a la base de datos.
     * 
     * Este método establece la propiedad `$db` a null, liberando la conexión a la base de datos.
     * 
     * @return void
     */
    public function close(): void
    {
        $this->db = null;
    }
}
