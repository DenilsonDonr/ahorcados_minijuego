<?php 

namespace Jay\repositories\wordRepository;

use PDO;
use PDOException;

/**
 * Clase WordRepository
 * 
 * Esta clase gestiona las operaciones relacionadas con las palabras en la base de datos,
 * como obtener una palabra aleatoria, obtener el número máximo de palabras, agregar jugadas y 
 * obtener el puntaje total de un usuario. Implementa la interfaz WordInterface.
 */
class WordRepository implements WordInterface 
{
    /**
     * @var PDO $db Objeto de conexión a la base de datos.
     */
    private $db;

    /**
     * Constructor de la clase WordRepository.
     * 
     * Se recibe la conexión a la base de datos a través de inyección de dependencias.
     * 
     * @param PDO $db Objeto de la conexión a la base de datos.
     */
    public function __construct(PDO $db) 
    {
        $this->db = $db;
    }

    /**
     * Obtiene una palabra aleatoria de la base de datos.
     * 
     * Este método selecciona aleatoriamente una palabra y su JSON de imágenes desde la base de datos.
     * 
     * @return array Un arreglo con la palabra, las imágenes (en formato de array) y el ID de la palabra.
     */
    public function getRandomWord(): array 
    {
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

        // Retornamos la palabra, el array de imágenes y el ID de la palabra
        return [
            'palabra' => $palabra,
            'imagenes' => $imagenes, // Array de nombres de las imágenes
            'id_palabra' => $idPalabra
        ]; 
    }

    /**
     * Obtiene el número total de palabras en la base de datos.
     * 
     * Este método ejecuta una consulta SQL para contar el número de palabras disponibles en la base de datos.
     * 
     * @return int El número total de palabras en la base de datos.
     */
    public function getMaximumNumberOfRows(): int
    {
        // Consulta para contar las palabras en la base de datos
        $sql = "SELECT COUNT(id_palabra) as total FROM palabras LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        // Obtenemos el resultado
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Retornamos el número total de palabras
        return (int)$row['total'];
    }

    /**
     * Inserta una jugada en la base de datos.
     * 
     * Este método inserta los datos de una jugada (puntaje, palabra y usuario) en la base de datos. 
     * Asegura que el ID del usuario esté disponible en la sesión antes de realizar la operación.
     * 
     * @param object $wordModel Objeto que representa el modelo de la palabra.
     * 
     * @return bool `true` si la jugada se insertó correctamente, `false` en caso contrario.
     */
    public function addPlay($wordModel): bool 
    {
        session_start(); // Asegúrate de que la sesión esté iniciada

        // Verifica si el ID del usuario está en la sesión
        if (!isset($_SESSION['id'])) {
            // Si no existe, retorna false
            return false;
        }

        $userId = $_SESSION['id']; // Obtiene el ID del usuario desde la sesión

        try {
            // Prepara la consulta SQL para insertar una jugada
            $sql = "INSERT INTO jugadas (puntaje,intento, id_palabra, id_usuario) VALUES (10,:intento ,:id_palabra, :id_usuario)";
            $stmt = $this->db->prepare($sql);
            
            // Vincula los parámetros
            $stmt->bindParam(':intento', $wordModel->getIntento());
            $stmt->bindParam(':id_palabra', $wordModel->getId());
            $stmt->bindParam(':id_usuario', $userId);
            
            // Ejecuta la consulta
            $stmt->execute();
            
            // Si la ejecución es exitosa, retorna true
            return true;
        } catch (PDOException $e) {
            // Registra el error y retorna false en caso de fallo
            error_log("Error al insertar la jugada: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Obtiene el puntaje total acumulado de un usuario.
     * 
     * Este método calcula la suma total de puntajes del usuario en función de las jugadas registradas.
     * 
     * @return int|false El puntaje total del usuario o `false` si ocurre un error.
     */
    public function getScore()
    {
        session_start(); // Asegúrate de que la sesión esté iniciada

        // Verifica si el ID del usuario está en la sesión
        if (!isset($_SESSION['id'])) {
            // Si no existe, retorna false
            return false;
        }

        $userId = $_SESSION['id']; // Obtiene el ID del usuario desde la sesión
        
        try {
            // Consulta SQL para obtener la suma de los puntajes del usuario
            $sql = "SELECT sum(puntaje) as score FROM ahorcados_senati.jugadas WHERE id_usuario = :id_user";
            $stmt = $this->db->prepare($sql);

            // Vincula el parámetro
            $stmt->bindParam(':id_user', $userId);

            // Ejecuta la consulta
            $stmt->execute();

            // Obtiene el resultado
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Retorna el puntaje total
            return (int)$row['score'];
        } catch (PDOException $e) {
            // Registra el error y retorna false si ocurre un fallo
            error_log("Error al obtener el puntaje: " . $e->getMessage());
            return false;
        }
    }
}
