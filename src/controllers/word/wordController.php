<?php

namespace Jay\controllers\word;

use Jay\core\Database;
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

        echo json_encode($word);
    }
}