<?php

namespace Jay\controllers\login;

use Jay\models\loginModel\UserModel;
use Jay\repositories\loginRepository\LoginRepository;

class LoginController
{
    private $userRepository;

    public function __construct()
    {
        // instanciamos el repositorio
        $this->userRepository = new LoginRepository();
    }

    public function registerUser()
    {
        // Leer el cuerpo de la solicitud
        $json = file_get_contents('php://input');

        // Decodificar JSON a un array asociativo
        $data = json_decode($json, true);

        $user = new UserModel();
        $user->setName($data['user']);
        // Validar email, en caso sea si, pasamos
        // if(!$user->validateEmail($_POST['email']))
        // {
        //     echo json_encode(['message' => 'Email invalido']);
        // }
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);

        $response = $this->userRepository->registerUser($user);
        if(!$response)
        {
            echo json_encode(['error' => $response]);
            exit;
        }
        echo json_encode(['success' => '¡Registro exitoso! Bienvenido']);
    }
}