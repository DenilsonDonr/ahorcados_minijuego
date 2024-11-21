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

    // Validar login

    public function authenticateUser()
    {
         // Leer el cuerpo de la solicitud
        $json = file_get_contents('php://input');

        // Decodificar JSON a un array asociativo
        $data = json_decode($json, true);
        $user = new UserModel();
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);

        $response = $this->userRepository->auth($user);

        if($response)
        {
            if($user->verifyPassword($response['contrasena']))
            {
                // iniciamos la sesion
                session_start();
                $_SESSION['user'] = $user->getEmail();
                $_SESSION['status'] = true;
               
                // guardamos el ID
                $_SESSION['id'] = $response['id'];
                
                echo json_encode(['success' => 'Usuario autenticado']);
            }
            else
            {
                echo json_encode(['error' => 'Usuario o contraseña incorrecta']);
            }
        }
        else
        {
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
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
        
        // Hash password
        $user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));

        $response = $this->userRepository->registerUser($user);
        if(!$response)
        {
            echo json_encode(['error' => $response]);
            exit;
        }
        echo json_encode(['success' => 'Registrado exitosamente!']);
    }


    // logout

    public function logout()
    {
        session_start();
        
        session_destroy();
        echo json_encode(['success' => 'Sesion cerrada']);
    }
}