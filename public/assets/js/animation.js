let loginBtn = document.getElementById("arcadeLogin");
let modal = document.getElementById("loginModal");
let modalContent = document.getElementById("modalContent");
let closeModal = document.getElementById("closeModal");
let btnPlay = document.getElementById("btn-play");
let game = document.getElementById("game");
let btnBack = document.getElementById("btn-back");


let switchToRegister = document.getElementById('switchToRegister');
let switchToLogin = document.getElementById('switchToLogin');
let loginSection = document.getElementById('loginSection');
let registerSection = document.getElementById('registerSection');


// Abrir el modal de inicio de sesion
loginBtn.onclick = function () {
  modal.style.display = "block";
  loginSection.classList.add('opacidad-modal');
  modalContent.classList.remove("close-animation"); // Quitar cualquier animacion de cierre previa
};

// Iniciar el juego y mover el boton
btnPlay.onclick = function () {
  // Mueve el boton fuera de la pantalla
  btnPlay.classList.add("btn-play-move");

  // Mostrar el juego
  game.style.display = "flex";

  // Escuchar la animacion del boton de jugar para remover la clase una vez que termine
  btnPlay.addEventListener("animationend", function handleAnimationEnd() {
    btnPlay.classList.remove("btn-play-move");
    btnPlay.style.display = "none"; // Ocultar el boton despues de la animacion
    btnPlay.removeEventListener("animationend", handleAnimationEnd); // Evitar acumulacion de eventos
  });
};

// Regresar al menu principal y volver a mover el boton
btnBack.onclick = function () {

  btnPlay.disabled = true; // Deshabilitar el boton

  game.classList.add("game-play-exit");

  // Mostrar el botón de nuevo antes de iniciar la animación
  btnPlay.style.display = "block";

  // Mover el botón de vuelta a la pantalla
  btnPlay.classList.add("btn-play-home");

  // Escuchar la animación del botón para remover la clase una vez que termine
  btnPlay.addEventListener("animationend", function handlePlayHomeEnd() {
    btnPlay.classList.remove("btn-play-home");
    btnPlay.style.display = "block";
    btnPlay.disabled = false;
    btnPlay.removeEventListener("animationend", handlePlayHomeEnd); // Evitar acumulación de eventos
  });

  game.addEventListener("animationend", function handleGameExitEnd() {
    game.classList.remove("game-play-exit");
    game.style.display = "none";
    game.removeEventListener("animationend", handleGameExitEnd);
  });
};

// Cerrar el modal de inicio de sesion
closeModal.onclick = function () {
  // Anadir la clase de animacion de salida
  modalContent.classList.add("close-animation");
  setTimeout(function () {
    modal.style.display = "none"; // Ocultar el modal despues de que la animacion termine
  }, 1800); // Tiempo igual al de la animacion (1.8s)
};

// Cerrar el modal al hacer clic fuera de el
// window.onclick = function (event) {
//   modalContent.addEventListener("animationend", function handleAnimationEnd() {
//     if (event.target == modal) {
//       modalContent.classList.add("close-animation");
//       setTimeout(function () {
//         modal.style.display = "none";
//       }, 1800); // Tiempo de la animacion
//     }
//   });
// };


// Elementos del DOM


// Función para cambiar a la vista de registro
switchToRegister.onclick = function() {
    registerSection.classList.add('opacidad-modal');
    loginSection.classList.remove('section-active');
    loginSection.classList.add('section-hidden');
    registerSection.classList.remove('section-hidden');
    registerSection.classList.add('section-active');
};

// Funcion para cambiar a la vista de inicio de sesion
switchToLogin.onclick = function() {
    registerSection.classList.remove('section-active');
    registerSection.classList.add('section-hidden');
    loginSection.classList.remove('section-hidden');
    loginSection.classList.add('section-active');
};





