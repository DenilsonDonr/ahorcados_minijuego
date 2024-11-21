<?php

namespace Jay\controllers\login;

use Jay\models\loginModel\UserModel;
use Jay\repositories\loginRepository\LoginRepository;

/**
 * Controlador encargado de gestionar la autenticación, registro y cierre de sesión de los usuarios.
 */
class LoginController
{
    /**
     * Repositorio para manejar las operaciones relacionadas con el usuario.
     * 
     * @var LoginRepository
     */
    private LoginRepository $userRepository;

    /**
     * Constructor de la clase LoginController.
     * Instancia el repositorio que maneja la lógica de acceso a datos de los usuarios.
     */
    public function __construct()
    {
        // Instanciamos el repositorio que nos permitirá acceder a los datos del usuario
        $this->userRepository = new LoginRepository();
    }

    /**
     * Autentica al usuario utilizando su correo electrónico y contraseña.
     * 
     * @return void
     */
    public function authenticateUser(): void
    {
        // Leer el cuerpo de la solicitud (JSON)
        $json = file_get_contents('php://input');

        // Decodificar el JSON a un array asociativo
        $data = json_decode($json, true);

        // Crear un nuevo modelo de usuario y asignar los datos recibidos
        $user = new UserModel();
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);

        // Verificamos si el usuario existe en la base de datos usando el repositorio
        $response = $this->userRepository->auth($user);

        // Si el usuario existe
        if ($response)
        {
            // Verificamos que la contraseña proporcionada coincida con la almacenada en la base de datos
            if ($user->verifyPassword($response['contrasena']))
            {
                // Iniciamos la sesión del usuario
                session_start();

                // Guardamos los datos del usuario en la sesión
                $_SESSION['user'] = $response['usuario'];
                $_SESSION['status'] = true;

                // Guardamos el ID del usuario para futuras referencias
                $_SESSION['id'] = $response['id'];

                // Enviamos una respuesta de éxito
                echo json_encode(['success' => 'Usuario autenticado']);
            }
            else
            {
                // Si la contraseña no coincide, respondemos con un error
                echo json_encode(['error' => 'Usuario o contraseña incorrecta']);
            }
        }
        else
        {
            // Si el usuario no existe, respondemos con un error
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    }

    /**
     * Registra un nuevo usuario en el sistema.
     * 
     * @return void
     */
    public function registerUser(): void
    {
        // Leer el cuerpo de la solicitud (JSON)
        $json = file_get_contents('php://input');

        // Decodificar el JSON a un array asociativo
        $data = json_decode($json, true);
        
        // Crear un nuevo modelo de usuario y asignar los datos recibidos
        $user = new UserModel();
        $userV = $user->cleanStrip_tags($data['user']);
        $user->setName($userV);

        $emailV = $user->cleanStrip_tags($data['email']);

        // validar email
        if(!$user->validateEmail($emailV))
        {
            // Enviamos una respuesta con el error
            echo json_encode(['error' => 'Envia el correo en un formato correcto']);
            exit;
        }
        // establecer
        $user->setEmail($emailV);
        // Encriptar la contraseña utilizando password_hash
        $user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));

        // Intentamos registrar al nuevo usuario en la base de datos
        $response = $this->userRepository->registerUser($user);

        // Si hubo un error al registrar al usuario
        if (!$response)
        {
            // Enviamos una respuesta con el error
            echo json_encode(['error' => $response]);
            exit;
        }

        // Si el registro fue exitoso, respondemos con un mensaje de éxito
        echo json_encode(['success' => 'Registrado exitosamente!']);
    }

    /**
     * Cierra la sesión del usuario.
     * 
     * @return void
     */
    public function logout(): void
    {
        // Iniciamos la sesión
        session_start();

        // Destruimos la sesión del usuario
        session_destroy();

        // Respondemos con un mensaje de éxito indicando que la sesión fue cerrada
        echo json_encode(['success' => 'Sesion cerrada']);
    }
}
?>
