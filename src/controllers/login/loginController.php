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

    public function loginUser()
{
    // Leer el cuerpo de la solicitud
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $username = $data['user'];
    $password = $data['password'];

    $user = $this->userRepository->loginUser($username, $password);

    if ($user) {
        // Iniciar la sesión y almacenar los datos del usuario
        $session = new \Jay\core\Session();
        $session->setUser($user);

        echo json_encode(['message' => 'Login exitoso', 'user' => $user]);
    } else {
        echo json_encode(['message' => 'Credenciales inválidas']);
    }
}



}