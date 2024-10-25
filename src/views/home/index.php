<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ahorcados</title>

    <link rel="stylesheet" href="public/assets/css/style.css">


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

                    </div>
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
                <div class="word-container" id="word">
                </div>

                <div id="btn-back" class="back-home">
                    <button class="btn-back" title="Regresar">
                        <
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

            <!-- Sección de Inicio de Sesión -->
            <div id="loginSection" class="section-active">
                <h2>¡Inicia Sesión!</h2>
                <p>Ingresa tus datos para continuar.</p>
                <input type="text" placeholder="Usuario" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
                <input type="password" placeholder="Contraseña" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
                <button id="btn-login" class="btn-arcade">Ingresar</button>
                <p>¿No tienes cuenta? <button class="btn-arcade" id="switchToRegister">Regístrate</button></p>
            </div>

            <!-- Sección de Registro -->
            <div id="registerSection" class="section-hidden">
                <h2>¡Regístrate!</h2>
                <p>Crea tu cuenta para continuar.</p>
                <input type="text" placeholder="Correo Electrónico" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
                <input type="password" placeholder="Contraseña" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
                <input type="password" placeholder="Confirmar Contraseña" style="display: block; margin: 10px auto; padding: 10px; width: 80%;">
                <button id="btn-register" class="btn-arcade">Crear Cuenta</button>
                <p>¿Ya tienes una cuenta? <button class="btn-arcade" id="switchToLogin">Inicia Sesión</button></p>
            </div>
        </div>
    </div>

    <script src="public/assets/js/animation.js"></script>
    <script src="public/assets/js/juego.js"></script>
    <script src="public/assets/js/general.js"></script>

    <script src="public/assets/js/home/index.js"></script>

    
</body>

</html>