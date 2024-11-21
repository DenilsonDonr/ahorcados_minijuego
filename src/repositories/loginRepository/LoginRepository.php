<?php

namespace Jay\repositories\loginRepository;

use Jay\core\Model;
use Jay\models\loginModel\UserModel;
use PDO;
use PDOException;

/**
 * Clase LoginRepository
 * 
 * Esta clase maneja las operaciones relacionadas con el login de los usuarios, como la autenticación
 * y el registro de nuevos usuarios. Hereda de la clase Model para interactuar con la base de datos.
 * Utiliza el patrón de repositorio para separar la lógica de acceso a datos de la lógica de negocio.
 */
class LoginRepository extends Model
{
    /**
     * Constructor de la clase LoginRepository.
     * 
     * Utiliza la inyección de dependencias para inicializar el modelo padre, 
     * lo que le permite acceder a la base de datos.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Método para autenticar a un usuario.
     * 
     * Este método valida las credenciales de un usuario en la base de datos comparando el correo con
     * el registro existente y devolviendo la información del usuario si es válido.
     * 
     * @param UserModel $user Objeto que contiene los datos del usuario a autenticar.
     * 
     * @return array|false El usuario encontrado como un arreglo asociativo o `false` en caso de error.
     */
    public function auth(UserModel $user)
    {
        try {
            // Consulta SQL para obtener los datos del usuario por su correo.
            $sql = "SELECT id, contrasena, usuario FROM usuarios WHERE correo = :email";
            $stmt = $this->prepare($sql);
            
            // Obtiene el correo del objeto UserModel.
            $email = $user->getEmail();
            $stmt->bindParam(':email', $email);
            
            // Ejecuta la consulta.
            $stmt->execute();
            
            // Recupera los datos del usuario.
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Retorna los datos del usuario si existe, o `false` en caso contrario.
            return $user;
        } catch (PDOException $th) {
            // En caso de error, se registra el mensaje y se retorna `false`.
            error_log("Auth::" . $th->getMessage());
            return false;
        }
    }

    /**
     * Método para registrar un nuevo usuario en la base de datos.
     * 
     * Este método inserta los datos del usuario proporcionado en la tabla de usuarios.
     * Los datos como edad, tipo de usuario y estado son predefinidos.
     * 
     * @param UserModel $user Objeto que contiene los datos del usuario a registrar.
     * 
     * @return bool Retorna `true` si la operación fue exitosa, o `false` en caso de error.
     */
    public function registerUser(UserModel $user)
    {
        try {
            // Consulta SQL para insertar un nuevo usuario.
            $sql = "INSERT INTO usuarios (usuario, edad, correo, contrasena, tipo_usuario, estado) 
                    VALUES (:user, 18, :email, :password, 3, 1)";
            $stmt = $this->prepare($sql);
            
            // Vincula los parámetros a los valores del objeto UserModel.
            $stmt->bindParam(':user', $user->getName());
            $stmt->bindParam(':email', $user->getEmail());
            $stmt->bindParam(':password', $user->getPassword());
            
            // Ejecuta la consulta y retorna el resultado.
            return $stmt->execute();
        } catch (PDOException $th) {
            // En caso de error, se registra el mensaje y se retorna `false`.
            error_log("RegisterUser::" . $th->getMessage());
            return false;
        }
    }
}
