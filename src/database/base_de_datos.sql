create database ahorcados_senati;

use ahorcados_senati;

-- usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    edad CHAR(3) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario CHAR(1) NOT NULL,
    estado CHAR(1) NOT NULL
);

INSERT INTO usuarios (usuario, edad, correo, contrasena, tipo_usuario, estado) 
VALUES (
    'Juan',
    '25', 
    'juan.perez@example.com', 
    'hashed_password',  -- Suponiendo que la contraseña esté hasheada
    1,  -- Tipo de usuario ('A' puede ser Administrador, por ejemplo)
    1  -- Estado (puede ser 'A' para activo, 'I' para inactivo)
);



-- roles
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    estado CHAR(1) NOT NULL
);

-- paginas
CREATE TABLE paginas (
    id_pagina INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    estado CHAR(1) NOT NULL
);

-- permisos
CREATE TABLE permisos (
    id_permiso INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_rol INT NOT NULL,
    id_pagina INT NOT NULL,
    CONSTRAINT id_rol_fk FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    CONSTRAINT id_pagina_fk FOREIGN KEY (id_pagina) REFERENCES paginas(id_pagina)
);

-- palabras
CREATE TABLE palabras (
    id_palabra INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    palabra VARCHAR(255) NOT NULL,
    json_images JSON NOT NULL,
    niveles INT NOT NULL, 
    id_usuario INT NOT NULL,
    estado CHAR(1) NOT NULL,
    CONSTRAINT id_usuario_fk_palabras FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


-- jugadas
CREATE TABLE jugadas(
    id_jugada INT PRIMARY KEY AUTO_INCREMENT,
    intento SMALLINT NOT NULL DEFAULT 0,
    fecha_inicio DATETIME NOT NULL DEFAULT NOW(),
    hora TIME NOT NULL,
    estado INT,
    id_palabra INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT id_palabra_fk_jugadas FOREIGN KEY (id_palabra) REFERENCES palabras(id_palabra),
    CONSTRAINT id_usuario_fk_jugadas FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


SELECT palabra, json_images FROM palabras ORDER BY RAND() LIMIT 1