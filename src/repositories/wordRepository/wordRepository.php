<?php

namespace Jay\repositories\wordRepository;


use PDO;


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
    public function addPlay($wordModel) {
        session_start();
        // Obtener el ID del usuario desde la sesión
        $userId = $_SESSION['id'];

        // Insertamos la jugada en la base de datos
        $sql = "INSERT INTO jugadas (id_palabra, id_usuario) VALUES (:id_palabra, :id_usuario)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id_palabra', $wordModel->getId());
        $stmt->bindParam(':id_usuario', $userId);
        $stmt->execute();
    }
}
