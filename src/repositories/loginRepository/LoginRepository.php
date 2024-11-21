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

    // validar usuario
    public function auth(UserModel $user)
    {
        try {
            $sql = "SELECT id, contrasena FROM usuarios WHERE correo = :email";
            $stmt = $this->prepare($sql);
            $email = $user->getEmail();
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            return $user;
        } catch (PDOException $th) {
            error_log("Auth::" . $th->getMessage());
            return false;
        }
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
    
}
