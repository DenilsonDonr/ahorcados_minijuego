<?php

namespace Jay\models\loginModel;

/**
 * UserModel
 * 
 * Esta clase representa a un usuario del sistema. Contiene los atributos necesarios como
 * el ID, nombre, correo electrónico y contraseña, junto con los métodos necesarios para
 * obtener, establecer estos valores, validar el correo electrónico y verificar la contraseña.
 */
class UserModel {

    /**
     * @var int $id Identificador único del usuario
     */
    private $id;

    /**
     * @var string $user Nombre del usuario
     */
    private $user;

    /**
     * @var string $email Correo electrónico del usuario
     */
    private $email;

    /**
     * @var string $password Contraseña del usuario
     */
    private $password;

    /**
     * Constructor de la clase UserModel.
     * 
     * Inicializa un nuevo objeto UserModel. Actualmente, no se pasan parámetros.
     */
    public function __construct() {
        // El constructor está vacío, ya que los valores se establecerán a través de los setters
    }

    // Getters y setters

    /**
     * Obtener el ID del usuario.
     * 
     * @return int El ID del usuario
     */
    public function getId(): int { 
        return $this->id; 
    }

    /**
     * Establecer el ID del usuario.
     * 
     * @param int $id El ID a asignar al usuario
     * @return void
     */
    public function setId(int $id): void { 
        $this->id = $id; 
    }

    /**
     * Obtener el nombre del usuario.
     * 
     * @return string El nombre del usuario
     */
    public function getName(): string { 
        return $this->user; 
    }

    /**
     * Establecer el nombre del usuario.
     * 
     * @param string $user El nombre del usuario
     * @return void
     */
    public function setName(string $user): void { 
        $this->user = $user; 
    }

    /**
     * Obtener el correo electrónico del usuario.
     * 
     * @return string El correo electrónico del usuario
     */
    public function getEmail(): string { 
        return $this->email; 
    }

    /**
     * Establecer el correo electrónico del usuario.
     * 
     * @param string $email El correo electrónico a asignar
     * @return void
     */
    public function setEmail(string $email): void { 
        $this->email = $email; 
    }

    /**
     * Obtener la contraseña del usuario.
     * 
     * @return string La contraseña del usuario
     */
    public function getPassword(): string { 
        return $this->password; 
    }

    /**
     * Establecer la contraseña del usuario.
     * 
     * @param string $password La contraseña a asignar
     * @return void
     */
    public function setPassword(string $password): void { 
        $this->password = $password; 
    }

    /**
     * Validar si un correo electrónico es válido.
     * 
     * Este método utiliza una expresión regular para comprobar si el correo electrónico
     * tiene el formato correcto.
     * 
     * @param string $email El correo electrónico a validar
     * @return bool Retorna true si el correo electrónico es válido, false si no lo es
     */
    public function validateEmail(string $email): bool {
        $regex = '/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/';
        return preg_match($regex, $email) === 1;
    }

    /**
     * Verificar la contraseña utilizando un hash.
     * 
     * Este método compara la contraseña proporcionada con un hash almacenado en la base
     * de datos para verificar si coinciden.
     * 
     * @param string $hash El hash de la contraseña almacenada
     * @return bool Retorna true si las contraseñas coinciden, false si no
     */
    public function verifyPassword(string $hash): bool {
        return password_verify($this->getPassword(), $hash);
    }

    /**
     * Método para convertir el objeto UserModel en una cadena.
     * 
     * Este método convierte la información del usuario en una cadena de texto para
     * facilitar su visualización o depuración.
     * 
     * @return string Información del usuario en formato de texto
     */
    public function __toString(): string
    {
        return "User: " . $this->user . ", Email: " . $this->email . ", Password: " . $this->password;
    }
}
