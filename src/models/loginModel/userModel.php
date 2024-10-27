<?php

namespace Jay\models\loginModel;

class UserModel {

    private $id;

    private $user;
    private $email;
    private $password;

    public function __construct() {
       
    }

     // Getters y setters
     public function getId() { return $this->id; }
     public function setId($id) { $this->id = $id; }
 
     public function getName() { return $this->user; }
     public function setName($user) { $this->user = $user; }
 
     public function getEmail() { return $this->email; }
     public function setEmail($email) { $this->email = $email; }
 
     public function getPassword() { return $this->password; }
     public function setPassword($password) { $this->password = $password; }

    // Validar email
    function validateEmail($email) {
        $regex = '/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/';
        return preg_match($regex, $email) === 1;
    }    


    // teste de toString
    public function __toString()
    {
        return "User: " . $this->user . ", Email: " . $this->email . ", Password: " . $this->password;
    }
}

