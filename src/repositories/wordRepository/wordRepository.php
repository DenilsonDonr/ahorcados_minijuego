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
        $sql = "SELECT palabra, json_images FROM palabras ORDER BY RAND() LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
    
        // Obtenemos la fila
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // Extraemos la palabra
        $palabra = $row['palabra'];
    
        // Decodificamos el JSON en un array
        $imagenes = json_decode($row['json_images'], true); // true convierte el JSON en array
    
        // Retornamos la palabra y el array de nombres de las imágenes
        return [
            'palabra' => $palabra,
            'imagenes' => $imagenes // Array de nombres de las imágenes
        ];
    }
    
}
