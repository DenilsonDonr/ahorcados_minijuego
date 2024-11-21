<?php

namespace Jay\controllers\word;

use Jay\core\Database;
use Jay\models\wordModel\wordModel;
use Jay\repositories\wordRepository\WordRepository;

/**
 * Controlador para gestionar las palabras y el puntaje de un juego.
 */
class WordController
{
    /**
     * Repositorio encargado de las operaciones relacionadas con las palabras.
     * 
     * @var WordRepository
     */
    private $wordRepository;

    /**
     * Instancia de la base de datos.
     * 
     * @var Database
     */
    private $Model;

    /**
     * Constructor de la clase WordController.
     * 
     * Inicializa la conexión a la base de datos y el repositorio de palabras.
     */
    public function __construct()
    {
        // Instanciamos la conexión a la base de datos
        $this->Model = Database::getInstance();

        // Instanciamos el repositorio de palabras
        $this->wordRepository = new WordRepository($this->Model->getConnection());
    }

    /**
     * Obtiene una palabra aleatoria del repositorio y el número total de palabras.
     * 
     * @return void
     */
    public function getWord()
    {
        // Obtenemos una palabra aleatoria desde el repositorio
        $word = $this->wordRepository->getRandomWord();

        // Obtenemos el número total de palabras en la base de datos
        $total = $this->wordRepository->getMaximumNumberOfRows();

        // Devolvemos la palabra y el total como respuesta en formato JSON
        echo json_encode([$word, $total]);
    }

    /**
     * Guarda una jugada (palabra) en la base de datos.
     * 
     * Recibe un JSON con el ID de la palabra y lo almacena en la base de datos.
     * 
     * @return void
     */
    public function addPlay()
    {
        // Leer el cuerpo de la solicitud (JSON)
        $json = file_get_contents('php://input');

        // Decodificar el JSON a un array asociativo
        $data = json_decode($json, true);

        // Crear un modelo de palabra con el ID recibido
        $wordModel = new wordModel();
        $wordModel->setId($data['id']);
        $wordModel->setIntento($data['intento']);

        // Intentamos insertar la jugada (palabra) en la base de datos
        $response = $this->wordRepository->addPlay($wordModel);

        // Si la jugada se guarda correctamente, respondemos con un mensaje de éxito
        if ($response)
        {
            echo json_encode(['success' => 'Jugada guardada']);
        }
        else
        {
            // Si ocurrió un error al guardar, respondemos con un mensaje de error
            echo json_encode(['error' => 'Error al guardar la jugada']);
        }
    }

    /**
     * Obtiene el puntaje actual del juego.
     * 
     * @return void
     */
    public function getScore()
    {
        // Obtener el puntaje actual desde el repositorio
        $response = $this->wordRepository->getScore();

        // Devolver el puntaje en formato JSON
        echo json_encode(["score" => $response]);
    }
}
?>
