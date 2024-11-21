<?php

namespace Jay\controllers\word;

use Jay\core\Database;
use Jay\models\wordModel\wordModel;
use Jay\repositories\wordRepository\WordRepository;

class WordController
{
    private $wordRepository;

    private $Model;

    public function __construct()
    {
        // instanciamos el repositorio
        $this->Model = Database::getInstance();
        $this->wordRepository = new WordRepository($this->Model->getConnection());
    }

    public function getWord()
    {
        // Obtenemos una palabra aleatoria desde el repositorio
        $word = $this->wordRepository->getRandomWord();
        $total = $this->wordRepository->getMaximumNumberOfRows();
        
        echo json_encode([$word, $total]);
    }

    // guardamos la palabra
    public function addPlay()
    {
        // Leer el cuerpo de la solicitud
        $json = file_get_contents('php://input');

        // Decodificar JSON a un array asociativo
        $data = json_decode($json, true);

        $wordModel = new wordModel();
        $wordModel->setId($data['id']);

        // Insertar la palabra en la base de datos
        $response = $this->wordRepository->addPlay($wordModel);
        error_log(json_encode($response));
        if($response)
        {
            echo json_encode(['success' => 'Jugada guardada']);
        }
        else
        {
            echo json_encode(['error' => 'Error al guardar la jugada']);
        }
    }

    public function getScore()
    {
        $response = $this->wordRepository->getScore();
        echo json_encode(["score" => $response]);
    }
}