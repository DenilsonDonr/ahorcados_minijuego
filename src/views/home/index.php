<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ahorcados</title>
    <style>
        /* Estilos para arcade */
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        body,
        html {
            height: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Press Start 2P', cursive;
            /* Arcade font */
            overflow: hidden;
        }

        .container {
            display: flex;
            flex-direction: row;
            height: 100vh;
            /* Altura completa de la ventana */
        }

        .section {
            flex: 1;
            /* Cada sección ocupará la misma cantidad de espacio */
            padding: 20px;
            text-align: center;
            border: 1px solid black;
            /* Solo para que visualices las secciones */
        }

        .section-img {
            display: flex;
            flex: none;
            flex-direction: row;
            justify-content: space-between;
            justify-items: center;
            /* Centra los elementos dentro de las columnas */
        }

        .card {
            background-color: #f8f9fa;
            border-radius: 10px;
            width: 300px;
            text-align: center;
        }

        .arcade-login {
            display: inline;
            font-size: 18px;
            cursor: pointer;
            color: #fff;
            background-color: #ff1e56;
            padding: 10px 25px;
            border-radius: 10px;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: #fff;
            margin: 0;
            padding: 20px;
            width: 25%;
            height: 100%;
            border-radius: 10px;
            text-align: center;
            position: relative;
            left: -100%;
            animation: slideInFromRight 1.8s forwards;
        }

        /* Animación de entrada desde la derecha */
        @keyframes slideInFromRight {
            0% {
                left: 100%;
                /* Empieza fuera de la pantalla, en la derecha */
            }

            100% {
                left: 73%;
                /* Llega al centro de la pantalla */
            }
        }

        /* Animación de salida hacia la derecha */
        @keyframes slideOutToRight {
            0% {
                left: 78%;
                /* Empieza desde la posición en el centro */
            }

            100% {
                left: 100%;
                /* Se va fuera de la pantalla, hacia la derecha */
            }
        }

        /* Clase para la animación de cierre */
        .modal-content.close-animation {
            animation: slideOutToRight 1.5s forwards;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        .btn-arcade {
            background-color: #ff1e56;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-arcade:hover {
            background-color: #ff4757;
        }

        .center-card {
            margin: 0 auto;
        }

        .right-card {
            margin-left: auto;
        }

        .top-card {
            margin-top: 10px;
        }

        .content-section-1-card {
            padding-left: 20px;
            padding-right: 20px;
        }

        .content-section-1-card p {
            text-align: left;
        }

        .content-section-1-card h2 {
            margin-top: 0;
        }

        .content-section-3-card p {
            text-align: right;
        }

        /* estilos para el arcade */
        .card-img {
            max-width: 270px;
            max-height: 280px;
            text-align: center;
            background-color: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 10px;
        }

        .card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }

        .card-img-top {
            margin-top: 50px
        }

        /* Estilo para la palabra a adivinar */
        .word-container {
            text-align: center;
            margin-top: 10%;
            /* Espacio entre las imágenes y la palabra */
        }

        .word-to-guess {
            font-size: 24px;
            letter-spacing: 10px;
            /* Espacio entre cada letra o guion */
            color: #333;
        }

        /* Estilo para el botón de comenzar juego */
        .play {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }

        button {
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            background-color: #ff1e56;
            border: 1px solid #333;
            cursor: pointer;
            font-family: 'Press Start 2P', cursive;
            /* Arcade font */
        }

        /* Estilo para el boton de regresar */

        .btn-back {
            display: block;
            margin-left: 0;
        }

        /* estilo para la animacion cuando le de click a comenzar juego */

        .btn-play-move {
            position: relative;
            animation: btn-play-move 3s forwards;
        }

        @keyframes btn-play-move {
            0% {
                transform: translateY(0);
                /* Comienza en su posición original */
            }

            100% {
                transform: translateY(-100vh);
                /* Se mueve una altura completa de la pantalla */
            }
        }

        .btn-play-home {
            animation: btn-play-home 1.8s forwards;
        }

        @keyframes btn-play-home {
            0% {
                transform: translateY(100vh);
                /* Empieza en su posición actual */
            }

            100% {
                transform: translateY(-0vh);
                /* Se mueve hacia abajo fuera de la pantalla */
            }
        }


        .game-play {
            display: none;
            flex-direction: column;
            justify-content: space-between;

            height: 100%;
            position: relative;
            transform: translateY(100%);
            /* Empieza fuera de la pantalla */
            animation: slideInFromButton 1.8s forwards;
        }

        @keyframes slideInFromButton {
            0% {
                transform: translateY(0);
                /* Comienza desde fuera de la pantalla */
            }

            100% {
                transform: translateY(-100%);
                /* Llega al centro de la pantalla */
            }
        }

        .game-play-exit {
            animation: slideOutToBottom 1.8s forwards;
        }

        @keyframes slideOutToBottom {
            0% {
                transform: translateY(-100%);
                /* Empieza en su posición actual */
            }

            100% {
                transform: translateY(-210%);
                /* Se mueve hacia abajo fuera de la pantalla */
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <section class="section">
            <article class="card center-card top-card content-section-1-card">
                <h2>Puntajes</h2>
                <p>Nombre: Juan Pérez</p>
                <p>Puntaje: 100</p>
            </article>
        </section>
        <main class="section">
            <section class="play">
                <div>
                    <button id="btn-play">
                        Comenzar Juego
                    </button>
                </div>
            </section>
            <section id="game" class="game-play">
                <section class="section-img">
                    <div>
                        <div class="card-img">
                            <img src="public/assets/img/place_holder.webp" alt="Imagen 1">
                        </div>
                        <div class="card-img card-img-top">
                            <img src="public/assets/img/place_holder.webp" alt="Imagen 2">
                        </div>
                    </div>
                    <div>
                        <div class="card-img">
                            <img src="public/assets/img/place_holder.webp" alt="Imagen 3">
                        </div>
                        <div class="card-img card-img-top">
                            <img src="public/assets/img/place_holder.webp" alt="Imagen 4">
                        </div>
                    </div>
                </section>
                <!-- Aquí se agrega la palabra a adivinar debajo de todas las imágenes -->
                <div class="word-container">
                    <p class="word-to-guess">_ _ _ _ _ _ _</p> <!-- Ejemplo de palabra con guiones -->
                </div>
                <div id="btn-back" class="back-home">
                    <button  class="btn-back">
                        <
                    </button>
                </div>
            </section>
        </main>
        <section class="section">
            <div class="card right-card top-card content-section-3-card">
                <!-- Arcade Login Icon -->
                <div class="arcade-login" id="arcadeLogin">Ingresa</div>
            </div>
        </section>
    </div>

    <!-- Modal -->
    <div id="loginModal" class="modal">
        <div class="modal-content" id="modalContent">
            <span class="close" id="closeModal">&times;</span>
            <h2>¡Inicia Sesión!</h2>
            <p>Ingresa tus datos para continuar.</p>
            <input type="text" placeholder="Usuario" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
            <input type="password" placeholder="Contraseña" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
            <button class="btn-arcade">Ingresar</button>
            <p>¿No tienes cuenta? <button class="btn-arcade">Regístrate</button></p>
        </div>
    </div>

    <script>
        let loginBtn = document.getElementById('arcadeLogin');
        let modal = document.getElementById('loginModal');
        let modalContent = document.getElementById('modalContent');
        let closeModal = document.getElementById('closeModal');
        let btnPlay = document.getElementById('btn-play');
        let game = document.getElementById('game');
        let btnBack = document.getElementById('btn-back');

        // Abrir el modal de inicio de sesion
        loginBtn.onclick = function() {
            modal.style.display = 'block';
            modalContent.classList.remove('close-animation'); // Quitar cualquier animacion de cierre previa
        };

        // Iniciar el juego y mover el boton
        btnPlay.onclick = function() {
            // Mueve el boton fuera de la pantalla
            btnPlay.classList.add('btn-play-move');

            // Mostrar el juego
            game.style.display = 'flex';

            // Escuchar la animacion del boton de jugar para remover la clase una vez que termine
            btnPlay.addEventListener('animationend', function handleAnimationEnd() {
                btnPlay.classList.remove('btn-play-move');
                btnPlay.style.display = 'none'; // Ocultar el boton despues de la animacion
                btnPlay.removeEventListener('animationend', handleAnimationEnd); // Evitar acumulacion de eventos
            });
        };


        // Regresar al menu principal y volver a mover el boton
        btnBack.onclick = function() {
            // Iniciar la animacion de salida hacia abajo del juego
            game.classList.add('game-play-exit');

            // Mover el boton de vuelta a la pantalla
            btnPlay.classList.add('btn-play-home');

            // Escuchar la animacion del boton para remover la clase una vez que termine
            btnPlay.addEventListener('animationend', function handlePlayHomeEnd() {
                btnPlay.classList.remove('btn-play-home');
                btnPlay.removeEventListener('animationend', handlePlayHomeEnd); // Evitar acumulacion de eventos
            });

            // Escuchar la animacion de salida del juego para remover la clase una vez que termine
            game.addEventListener('animationend', function handleGameExitEnd() {
                game.classList.remove('game-play-exit');
                game.style.display = 'none'; // Ocultar el juego despues de la animacion
                game.removeEventListener('animationend', handleGameExitEnd); // Evitar acumulacion de eventos
            });
        };

        // Cerrar el modal de inicio de sesion
        closeModal.onclick = function() {
            // Anadir la clase de animacion de salida
            modalContent.classList.add('close-animation');
            setTimeout(function() {
                modal.style.display = 'none'; // Ocultar el modal despues de que la animacion termine
            }, 1800); // Tiempo igual al de la animacion (1.8s)
        };

        // Cerrar el modal al hacer clic fuera de el
        window.onclick = function(event) {
            if (event.target == modal) {
                modalContent.classList.add('close-animation');
                setTimeout(function() {
                    modal.style.display = 'none';
                }, 1800); // Tiempo de la animacion
            }
        };
    </script>
</body>
</html>