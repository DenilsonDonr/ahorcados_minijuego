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
    
}
