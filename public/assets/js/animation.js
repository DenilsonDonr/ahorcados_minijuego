document.addEventListener("DOMContentLoaded", () => {
  let loginBtn = document.getElementById("arcadeLogin");
  let modal = document.getElementById("loginModal");
  let modalContent = document.getElementById("modalContent");
  let closeModal = document.getElementById("closeModal");
  // Obtenemos la referenecia del boton en el DOM
  let btnPlay = document.getElementById("btn-play");
  let game = document.getElementById("game");
  let btnBack = document.getElementById("btn-back");

  let switchToRegister = document.getElementById("switchToRegister");
  let switchToLogin = document.getElementById("switchToLogin");
  let loginSection = document.getElementById("loginSection");
  let registerSection = document.getElementById("registerSection");

  // Variable para manejar la música
let backgroundMusic = playBackgroundMusic("public/assets/sound/intro.mp3");

// Manejar la reproducción con el checkbox
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("change", () => {
    if (musicToggle.checked) {
        // Reproducir música si está activado
        if (!backgroundMusic) {
            backgroundMusic = playBackgroundMusic("public/assets/sound/intro.mp3");
        } else {
            backgroundMusic.play();
        }
    } else {
        // Pausar música si está desactivado
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0; // Reiniciar la música
        }
    }
});

  // Abrir el modal de inicio de sesion
  loginBtn.onclick = function () {
    modal.style.display = "block";
    loginSection.classList.add("opacidad-modal");
    modalContent.classList.remove("close-animation"); // Quitar cualquier animacion de cierre previa
  };

  // Iniciar el juego y mover el boton
  btnPlay.onclick = function () {
    // Llamamos a la funcion verifyGame, ya que debido a esto verificamos que si no hay un localStorage del juego, inciaremos uno, de lo contrario continuaremos con el que esta presente.
    verifyGame();
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
  switchToRegister.onclick = function () {
    registerSection.classList.add("opacidad-modal");
    loginSection.classList.remove("section-active");
    loginSection.classList.add("section-hidden");
    registerSection.classList.remove("section-hidden");
    registerSection.classList.add("section-active");
  };

  // Funcion para cambiar a la vista de inicio de sesion
  switchToLogin.onclick = function () {
    registerSection.classList.remove("section-active");
    registerSection.classList.add("section-hidden");
    loginSection.classList.remove("section-hidden");
    loginSection.classList.add("section-active");
  };
});

function showNotification(message, duration = 1500) {

  // Reproducir sonido al mostrar la notificación
  const audio = new Audio('public/assets/sound/notification.wav'); // Cambia la ruta por el sonido deseado
  audio.volume = 0.5; // Opcional: ajustar el volumen
  audio.play().catch((err) => console.error("Error al reproducir sonido:", err));

  // Crear el elemento de notificación dinámicamente
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerText = message;

  // Agregar la notificación al body
  document.body.appendChild(notification);

  // Mostrar la notificación con la animación
  notification.classList.add("show");

  // Remover la notificación después del tiempo especificado
  setTimeout(() => {
    notification.classList.remove("show");
    // Remover el elemento del DOM después de la animación
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500); // Esperar que la animación termine antes de eliminar
  }, duration + 100);
}

function createFloatingShapes() {
  // Seleccionar el contenedor donde se agregarán las formas
  const container = document.querySelector(".container.section-1");
  if (!container) return; // Asegurarse de que el contenedor exista

  // Crear el contenedor principal
  const backwrap = document.createElement("div");
  backwrap.classList.add("backwrap", "gradient");

  // Crear el contenedor de las formas
  const backShapes = document.createElement("div");
  backShapes.classList.add("back-shapes");

  // Lista de configuraciones de elementos flotantes
  const shapes = [
    {
      type: "circle",
      top: "66.59856996935649%",
      left: "13.020833333333334%",
      delay: "-0.9s",
    },
    {
      type: "triangle",
      top: "31.46067415730337%",
      left: "33.59375%",
      delay: "-4.8s",
    },
    {
      type: "cross",
      top: "76.50663942798774%",
      left: "38.020833333333336%",
      delay: "-4s",
    },
    {
      type: "square",
      top: "21.450459652706844%",
      left: "14.0625%",
      delay: "-2.8s",
    },
    {
      type: "square",
      top: "58.12053115423902%",
      left: "56.770833333333336%",
      delay: "-2.15s",
    },
    {
      type: "square",
      top: "8.682328907048008%",
      left: "72.70833333333333%",
      delay: "-1.9s",
    },
    {
      type: "cross",
      top: "31.3585291113381%",
      left: "58.541666666666664%",
      delay: "-0.65s",
    },
    {
      type: "cross",
      top: "69.96935648621042%",
      left: "81.45833333333333%",
      delay: "-0.4s",
    },
    {
      type: "circle",
      top: "15.117466802860061%",
      left: "32.34375%",
      delay: "-4.1s",
    },
    {
      type: "circle",
      top: "13.074565883554648%",
      left: "45.989583333333336%",
      delay: "-3.65s",
    },
    {
      type: "cross",
      top: "55.87334014300306%",
      left: "27.135416666666668%",
      delay: "-2.25s",
    },
    { type: "cross", top: "49.54034729315628%", left: "53.75%", delay: "-2s" },
    {
      type: "cross",
      top: "34.62717058222676%",
      left: "49.635416666666664%",
      delay: "-1.55s",
    },
    {
      type: "cross",
      top: "33.19713993871297%",
      left: "86.14583333333333%",
      delay: "-0.95s",
    },
    {
      type: "square",
      top: "28.19203268641471%",
      left: "25.208333333333332%",
      delay: "-4.45s",
    },
    {
      type: "circle",
      top: "39.7344228804903%",
      left: "10.833333333333334%",
      delay: "-3.35s",
    },
    {
      type: "triangle",
      top: "77.83452502553627%",
      left: "24.427083333333332%",
      delay: "-2.3s",
    },
    {
      type: "triangle",
      top: "2.860061287027579%",
      left: "47.864583333333336%",
      delay: "-1.75s",
    },
    {
      type: "triangle",
      top: "71.3993871297242%",
      left: "66.45833333333333%",
      delay: "-1.25s",
    },
    {
      type: "triangle",
      top: "31.256384065372828%",
      left: "76.92708333333333%",
      delay: "-0.65s",
    },
    {
      type: "triangle",
      top: "46.47599591419816%",
      left: "38.90625%",
      delay: "-0.35s",
    },
    {
      type: "cross",
      top: "3.4729315628192032%",
      left: "19.635416666666668%",
      delay: "-4.3s",
    },
    {
      type: "cross",
      top: "3.575076608784474%",
      left: "6.25%",
      delay: "-4.05s",
    },
    {
      type: "cross",
      top: "77.3237997957099%",
      left: "4.583333333333333%",
      delay: "-3.75s",
    },
    {
      type: "cross",
      top: "0.9193054136874361%",
      left: "71.14583333333333%",
      delay: "-3.3s",
    },
    {
      type: "square",
      top: "23.6976506639428%",
      left: "63.28125%",
      delay: "-2.1s",
    },
    {
      type: "square",
      top: "81.30745658835546%",
      left: "45.15625%",
      delay: "-1.75s",
    },
    {
      type: "square",
      top: "60.9805924412666%",
      left: "42.239583333333336%",
      delay: "-1.45s",
    },
    {
      type: "square",
      top: "29.009193054136876%",
      left: "93.90625%",
      delay: "-1.05s",
    },
    {
      type: "square",
      top: "52.093973442288046%",
      left: "68.90625%",
      delay: "-0.7s",
    },
    {
      type: "square",
      top: "81.51174668028601%",
      left: "83.59375%",
      delay: "-0.35s",
    },
    {
      type: "square",
      top: "11.542390194075587%",
      left: "91.51041666666667%",
      delay: "-0.1s",
    },
  ];

  // Crear cada elemento flotante
  shapes.forEach((shape) => {
    const span = document.createElement("span");
    span.classList.add("floating", shape.type);
    span.style.top = shape.top;
    span.style.left = shape.left;
    span.style.animationDelay = shape.delay;
    backShapes.appendChild(span);
  });

  // Añadir el contenedor de las formas al contenedor principal
  backwrap.appendChild(backShapes);

  // Añadir el contenedor principal al contenedor especificado
  container.appendChild(backwrap);
}
function playAudio(audioFile) {
  const audio = new Audio(audioFile);
  audio.play();
}
// Función para iniciar música
function playBackgroundMusic(audioFile) {
  const audio = new Audio(audioFile);
  audio.loop = true;
  audio.volume = 0.2;
  audio
    .play()
    .catch((error) => console.error("Error al reproducir música:", error));
  return audio;
}
