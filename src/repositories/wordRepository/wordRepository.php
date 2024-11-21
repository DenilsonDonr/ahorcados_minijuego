<?php

namespace Jay\repositories\wordRepository;


use PDO;
use PDOException;

class WordRepository implements WordInterface {
    private $db;

    // Inyeccion de dependencia
    public function __construct(PDO $db) {
        $this->db = $db;
    }

    // Agregar usuario a la base de datos
    public function getRandomWord() {
        // Seleccionamos la palabra y el JSON de las imágenes
        $sql = "SELECT id_palabra, palabra, json_images FROM palabras ORDER BY RAND() LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
    
        // Obtenemos la fila
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // Extraemos la palabra
        $palabra = $row['palabra'];
    
        // Decodificamos el JSON en un array
        $imagenes = json_decode($row['json_images'], true); // true convierte el JSON en array
    
        // Extraemos el ID de la palabra
        $idPalabra = $row['id_palabra'];

        // Retornamos la palabra y el array de nombres de las imágenes
        return [
            'palabra' => $palabra,
            'imagenes' => $imagenes, // Array de nombres de las imágenes
            'id_palabra' => $idPalabra
        ]; 
    }
    // Método estático que devuelve el número máximo de palabras en la base de datos
    public function getMaximumNumberOfRows()
    {
        // Usamos la misma conexión de base de datos que se pasa como argumento
        $sql = "SELECT COUNT(id_palabra) as total FROM palabras limit 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        // Obtenemos el resultado
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Devolvemos el número total de palabras
        return $row['total'];
    }

    // insertamos la jugada
    public function addPlay($wordModel): bool 
    {
        session_start(); // Asegúrate de que la sesión está iniciada

        // Verifica si el ID del usuario existe en la sesión
        if (!isset($_SESSION['id'])) {
            // Si no existe el ID del usuario en la sesión, se devuelve false
            return false;
        }

        $userId = $_SESSION['id']; // Obtener el ID del usuario desde la sesión

        try {
            // Prepara la consulta SQL
            $sql = "INSERT INTO jugadas (puntaje,id_palabra, id_usuario) VALUES (10,:id_palabra, :id_usuario)";
            $stmt = $this->db->prepare($sql);
            
            // Enlaza los parámetros
            $stmt->bindParam(':id_palabra', $wordModel->getId());
            $stmt->bindParam(':id_usuario', $userId);
            
            // Ejecuta la consulta
            $stmt->execute();
            
            // Si la ejecución fue exitosa, devuelve true
            return true;
        } catch (PDOException $e) {
            // Si hay un error, se puede registrar o manejar el error aquí
            // Log del error o mensaje personalizado
            error_log("Error al insertar la jugada: " . $e->getMessage());
            
            // Devuelve false si ocurrió un error
            return false;
        }
    }
    public function getScore()
    {
        session_start(); // Asegúrate de que la sesión está iniciada

        // Verifica si el ID del usuario existe en la sesión
        if (!isset($_SESSION['id'])) {
            // Si no existe el ID del usuario en la sesión, se devuelve false
            return false;
        }

        $userId = $_SESSION['id']; // Obtener el ID del usuario desde la sesión
        
        try {
            $sql = "SELECT sum(puntaje) as score FROM ahorcados_senati.jugadas WHERE id_usuario = :id_user";
            $stmt = $this->db->prepare($sql);

            // Enlazado los parametros
            $stmt->bindParam(':id_user', $userId);

            // Ejecuta la consulta
            $stmt->execute();

            // Obtenemos el resultado
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            return $row['score'];
        } catch (PDOException $e) {
            error_log("Error al obtener el puntaje: " . $e->getMessage());
            return false;
        }
    }
}
