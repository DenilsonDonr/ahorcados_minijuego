<?php
// Patrón de diseño Singleton: Asegura que solo exista una instancia de la clase Database.

namespace Jay\core;

use PDO;
use PDOException;

/**
 * Clase Database
 * 
 * Esta clase maneja la conexión a la base de datos utilizando el patrón de diseño Singleton.
 * Se encarga de establecer y gestionar la conexión a la base de datos, y proporciona métodos 
 * para obtener la conexión y realizar consultas.
 */
class Database implements DatabaseInterface
{
    /**
     * @var Database|null $instance Instancia única de la clase Database (Singleton).
     */
    private static $instance = null;

    /**
     * @var PDO $connection Instancia de la conexión PDO con la base de datos.
     */
    private $connection;

    /**
     * @var string $host Dirección del host de la base de datos.
     */
    private $host;

    /**
     * @var string $db Nombre de la base de datos.
     */
    private $db;

    /**
     * @var string $user Usuario de la base de datos.
     */
    private $user;

    /**
     * @var string $password Contraseña del usuario de la base de datos.
     */
    private $password;

    /**
     * @var string $charset Codificación de caracteres para la conexión.
     */
    private $charset;

    /**
     * Constructor de la clase Database.
     * 
     * Inicializa las propiedades de la clase con los valores configurados en el archivo .env
     * y establece la conexión a la base de datos.
     */
    public function __construct()
    {
        $this->host = $_ENV['HOST'];
        $this->db = $_ENV['DB'];
        $this->user = $_ENV['USER'];
        $this->password = $_ENV['PASSWORD'];
        $this->charset = $_ENV['CHARSET'];

        $this->connect();
    }

    /**
     * Obtiene la instancia única de la clase Database.
     * 
     * Si la instancia no existe, la crea. Esto garantiza que solo haya una conexión
     * a la base de datos en toda la aplicación.
     * 
     * @return Database La instancia única de la clase Database.
     */
    public static function getInstance(): Database
    {
        if (!self::$instance) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    /**
     * Establece la conexión a la base de datos utilizando PDO.
     * 
     * Si la conexión falla, se registra el error y se termina la ejecución del script.
     * 
     * @return void
     */
    public function connect(): void
    {
        try {
            $connectionString = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
            $options = [
                PDO::ATTR_PERSISTENT => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->connection = new PDO($connectionString, $this->user, $this->password, $options);
        } catch (PDOException $e) {
            error_log('Database::connect() -> ' . $e->getMessage());
            die('Database connection failed: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene la conexión PDO a la base de datos.
     * 
     * @return PDO La instancia de la conexión PDO.
     */
    public function getConnection(): PDO
    {
        return $this->connection;
    }

    /**
     * Obtiene el último ID insertado en la base de datos.
     * 
     * Esto es útil para obtener el ID de un registro recién insertado.
     * 
     * @return string El ID del último registro insertado.
     */
    public function lastInsertId(): string
    {
        return $this->connection->lastInsertId();
    }

    /**
     * Previene la clonación de la instancia de la clase Database (parte del patrón Singleton).
     * 
     * Este método está vacío para garantizar que la instancia no pueda ser clonada.
     */
    private function __clone() {}
}

/**
 * Interface para la clase Database.
 * 
 * Define los métodos esenciales que deben implementarse en cualquier clase que actúe como
 * gestor de la conexión a la base de datos.
 */
interface DatabaseInterface
{
    /**
     * Establece la conexión a la base de datos.
     * 
     * @return void
     */
    public function connect(): void;

    /**
     * Obtiene la instancia única de la clase.
     * 
     * @return Database La instancia única de la clase.
     */
    static public function getInstance(): Database;
}
