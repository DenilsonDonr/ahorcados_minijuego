<?php
namespace Jay\core;

use PDO;
use PDOException;


class Database implements DatabaseInterface
{
    private static $instance = null;
    private $connection;
    private $host;
    private $db;
    private $user;
    private $password;
    private $charset;

    public function __construct()
    {
        $this->host = $_ENV['HOST'];
        $this->db = $_ENV['DB'];
        $this->user = $_ENV['USER'];
        $this->password = $_ENV['PASSWORD'];
        $this->charset = $_ENV['CHARSET'];

        $this->connect();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    public function connect()
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

    public function getConnection()
    {
        return $this->connection;
    }

    public function lastInsertId()
    {
        return $this->connection->lastInsertId();
    }

    private function __clone() {}
}

# Interface for Database class
interface DatabaseInterface {
    public function connect(); 
    static function getInstance();
}

