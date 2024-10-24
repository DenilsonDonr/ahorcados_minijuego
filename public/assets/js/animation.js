let loginBtn = document.getElementById("arcadeLogin");
let modal = document.getElementById("loginModal");
let modalContent = document.getElementById("modalContent");
let closeModal = document.getElementById("closeModal");
let btnPlay = document.getElementById("btn-play");
let game = document.getElementById("game");
let btnBack = document.getElementById("btn-back");

// Abrir el modal de inicio de sesion
loginBtn.onclick = function () {
  modal.style.display = "block";
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
  game.classList.add("game-play-exit");

  // Mostrar el botón de nuevo antes de iniciar la animación
  btnPlay.style.display = "block";

  // Mover el botón de vuelta a la pantalla
  btnPlay.classList.add("btn-play-home");

  // Escuchar la animación del botón para remover la clase una vez que termine
  btnPlay.addEventListener("animationend", function handlePlayHomeEnd() {
    btnPlay.classList.remove("btn-play-home");
    btnPlay.style.display = "block";
    console.log("btnPlay visible después de la animación");
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
window.onclick = function (event) {
  if (event.target == modal) {
    modalContent.classList.add("close-animation");
    setTimeout(function () {
      modal.style.display = "none";
    }, 1800); // Tiempo de la animacion
  }
};
