use ahorcados_senati;

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES (
    'bicicleta', 
    '["b_c1_ds.webp", "b_c2_sd.jpg", "b_c3_sd.jpg", "b_c4_sd.webp"]',  -- JSON array de imágenes
    1,  -- Nivel de dificultad o número de niveles
    1,  -- ID de usuario (asumiendo que este usuario ya existe en la tabla `usuarios`)
    '1' -- Estado (puede ser 'A' para activo, por ejemplo)
);
INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES (
    'amanecer', 
    '["s_l5_sd.jpg", "s_l1_sd.jpg", "s_l2_sd.jpg", "s_l3_sd.jpg", "s_l4_sd.jpg"]',  -- JSON array de imágenes
    1,  -- Nivel de dificultad o número de niveles
    1,  -- ID de usuario (asumiendo que este usuario ya existe en la tabla `usuarios`)
    '1' -- Estado (puede ser 'A' para activo, por ejemplo)
);


INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('gato', '["g_t1_sd.jpg", "g_t2_sd.jpg", "g_t3_sd.jpg", "g_t4_sd.jpg", "g_t5_sd.jpg", "g_t6_sd.jpg"]', 1, 1, '1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('cordillera', '["m_t1_sd.jpg", "m_t2_sd.jpg", "m_t3_sd.jpg", "m_t4_sd.jpg", "m_t5_sd.jpg", "m_t6_sd.jpg"]', 1, 1, '1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('comida', '["c_i1_sd.jpg", "c_i2_sd.jpg", "c_i3_sd.jpg", "c_i4_sd.jpg", "c_i5_sd.jpg", "c_i6_sd.jpg"]', 1, 1, '1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('libro', '["l_b1_sd.jpg", "l_b2_sd.jpg", "l_b3_sd.jpg", "l_b4_sd.jpg", "l_b5_sd.jpg", "l_b6_sd.jpg"]', 1, 1,'1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('arte', '["a_t1_sd.jpg", "a_t2_sd.jpg", "a_t3_sd.jpg", "a_t4_sd.jpg", "a_t5_sd.jpg", "a_t6_sd.jpg"]', 1, 1, '1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('jean', '["j_a1_sd.jpg", "j_a2_sd.jpg", "j_a3_sd.jpg", "j_a4_sd.jpg", "j_a5_sd.jpg", "j_a6_sd.jpg"]', 1, 1, '1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('perro', '["p_r1_sd.jpg", "p_r2_sd.jpg", "p_r3_sd.jpg", "p_r4_sd.jpg", "p_r5_sd.jpg", "p_r6_sd.jpg"]', 1, 1, '1');

INSERT INTO palabras (palabra, json_images, niveles, id_usuario, estado) 
VALUES ('carro', '["c_r1_sd.jpg", "c_r2_sd.jpg", "c_r3_sd.jpg", "c_r4_sd.jpg", "c_r5_sd.jpg", "c_r6_sd.jpg"]', 1, 1, '1');


