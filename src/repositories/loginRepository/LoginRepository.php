<?php

namespace Jay\repositories\loginRepository;

use Jay\core\Model;
use Jay\models\loginModel\UserModel;
use PDO;
use PDOException;

class LoginRepository extends Model {
    // Inyeccion de dependencia
    public function __construct() {
        parent::__construct();
    }

    // Agregar usuario a la base de datos
    public function registerUser(UserModel $user) {
        try {
            $sql = "INSERT INTO usuarios (usuario, edad, correo ,contrasena, tipo_usuario, estado) VALUES (:user, 18, :email, :password, 3, 1)";
            $stmt = $this->prepare($sql);
            $stmt->bindParam(':user', $user->getName());
            $stmt->bindParam(':email', $user->getEmail());
            $stmt->bindParam(':password', $user->getPassword());
            
            return $stmt->execute();        
        } catch (PDOException $th) {
            error_log("RegisterUser::" . $th->getMessage());
            return false;
        }
    }

    public function loginUser($username, $password)
{
    try {
        $sql = "SELECT * FROM usuarios WHERE usuario = :username AND contrasena = :password";
        $stmt = $this->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        // Si se encuentra un registro, devuelve el usuario
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    } catch (PDOException $e) {
        error_log("LoginUser::" . $e->getMessage());
        return false;
    }
}

    
}
