let palabra = "";
let palabraSecreta = "";

// Proporción de letras a ocultar (por ejemplo, el 25%)
let porcentajeOcultar = 0.75;
let ocultar; // Numero de letras a ocultar
let indicesOcultos = [];

/**
 * Inicializa el juego configurando la palabra y las imágenes.
 * @param {string} word - Palabra que será usada en el juego.
 * @param {string[]} arrayImages - Arreglo con las rutas de las imágenes a mostrar.
 */
function startGame(word, arrayImages) {
  palabra = word;
  
  palabraSecreta = ""; // Reinicia la palabra secreta

  // Verificamos si no hay en el localStorage
  if (!localStorage.getItem('indice_hidden')) {
    // Calculamos cuántas letras ocultar
    ocultar = Math.ceil(palabra.length * porcentajeOcultar);
    indicesOcultos = []; // Reinicia los índices ocultos
    generateRandomIndices();
  } else {
    createWordSecret();
  }

  // Imagenes
  insertImages(arrayImages);
}

/**
 * Genera índices aleatorios únicos para ocultar letras de la palabra.
 */
function generateRandomIndices() {
  // Generar indices aleatorios únicos para ocultar letras
  while (indicesOcultos.length < ocultar) {
    let randomIndex = Math.floor(Math.random() * palabra.length);
    if (!indicesOcultos.includes(randomIndex)) {
      indicesOcultos.push(randomIndex);
    }
  }
  createWordSecret();
}


/**
 * Construye la palabra secreta reemplazando las letras en los índices ocultos con guiones bajos.
 */
function createWordSecret() {
  // Bucle para construir la palabra secreta con letras ocultas
  for (let i = 0; i < palabra.length; i++) {
    if (indicesOcultos.includes(i)) {
      palabraSecreta += "_"; // Oculta la letra
    } else {
      palabraSecreta += palabra[i]; // Muestra la letra correcta
    }
  }
  verifyIndiceHidden();
  buildWordSecret();
}

let words = document.getElementById("word");


/**
 * Construye los campos de entrada para las letras de la palabra en el DOM.
 */
function buildWordSecret() {
  words.innerHTML = ""; // Limpia el contenido previo de words
  for (let i = 0; i < palabra.length; i++) {
    if (palabraSecreta[i] === "_") {
      words.innerHTML += `<input type="text" class="letter-input" value='' maxlength="1">`;
    } else {
      words.innerHTML += `<input type="text" class="letter-input" value='${palabraSecreta[i]}' maxlength="1" disabled>`;
    }
  }
  //writingArrangement();
  initilizeEventInputLetters();
  const firstEditableInput = document.querySelector(".letter-input:not([disabled])");
  if (firstEditableInput) {
    firstEditableInput.focus();
  }
}

// Referencia al DOM, para recorrer la clase de las etiquetas IMG
let imagenes = document.getElementsByClassName('image-show');

/**
 * Inserta las imágenes en los elementos con la clase 'image-show'.
 * @param {string[]} arrayImages - Arreglo con las rutas de las imágenes a insertar.
 */
function insertImages(arrayImages)
{
  for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].src = 'public/assets/img/' + arrayImages[i];
  }
}



let isCompletedAll = false;

/**
 * Inicializa los eventos para las entradas de letras, incluyendo navegación y validación.
 */
function initilizeEventInputLetters() {
  const inputs = document.querySelectorAll(".letter-input");

  inputs.forEach((input, index) => {
    // Manejar entrada de letras
    input.addEventListener("input", function () {
      if (!/^[a-zA-ZñÑ]$/.test(this.value)) {
        this.value = ""; // Borra si no es una letra válida
      } else {
        // Avanzar al siguiente input editable
        let nextInput = inputs[index + 1];
        while (nextInput && nextInput.disabled) {
          nextInput = inputs[++index + 1];
        }
        if (nextInput) nextInput.focus();
      }
    });

    // Manejar teclas especiales
    input.addEventListener("keydown", function (event) {
      // Retroceso
      if (event.key === "Backspace" && this.value === "") {
        let previousInput = inputs[index - 1];
        while (previousInput && previousInput.disabled) {
          previousInput = inputs[--index - 1];
        }
        if (previousInput) previousInput.focus();
      }

      // Enter para avanzar
      if (event.key === "Enter") {
        let nextInput = inputs[index + 1];
        while (nextInput && nextInput.disabled) {
          nextInput = inputs[++index + 1];
        }
        if (nextInput) {
          nextInput.focus();
          event.preventDefault(); // Evita el comportamiento por defecto
        }
      }
    });

    // Validar si la palabra está completa
    input.addEventListener("input", function () {
      verifyLetterInput();
      if (isCompletedAll) {
        verifyRightAnswer(getAnswer());
      }
    });
  });
}



/**
 * Verifica si todos los campos de entrada de letras están completos.
 */
function verifyLetterInput()
{
  // Referencia al DOM, para recorrer los inputs de letter-input
  let inputs_letter = document.querySelectorAll(".letter-input");

  // Verificamos que todos los campos tengan valor
  isCompletedAll = Array.from(inputs_letter).every(input => input.value !== "")
}

/**
 * Verifica si la palabra ingresada por el usuario coincide con la palabra correcta.
 * @param {string} wordVal - Palabra ingresada por el usuario.
 * @returns {Promise<void>} Resuelve cuando la animación y las validaciones terminan.
 */
async function verifyRightAnswer(wordVal) {
  if (isProcessing) return; // Salir si ya está procesando

  if (isCompletedAll) {
      let word = palabra.replace(/_/g, '');

      if (word === wordVal) {
          isProcessing = true; // Indicar que se está procesando
          showSuccessAnimation();
          removeGameAndIndiceHidden();
          
          // Validamos si hay un usuario iniciado 
          if (localStorage.getItem('logged')) {
            let wordLocal = JSON.parse(localStorage.getItem('words')) || [];
            // obtener la ultima palabra del array
            let lastWord = wordLocal[wordLocal.length - 1];
            // Guardamos la juega de la palabra
            savePlayWord(lastWord)
          }

          try {
              await animateSectionOut(); // Esperar a que la animación de salida termine
              await getWord();           // Esperar a que getWord finalice
              await animateSectionIn();  // Luego ejecutar la animación de entrada
          } catch (error) {
              alert('No se pudo obtener la palabra, intentando nuevamente...');
              console.error(error);
          } finally {
              isProcessing = false; // Resetear la bandera
          }
      } else {
          addAttempts(1);
          showErrorAnimation();
          console.log('Respuesta incorrecta');
      }
  } else {
      alert('Debes completar todas las letras.');
      console.log('No todas las letras están completas');

  }
}

// Obtenemos el elemento HTML donde se mostrará el valor de 'intento'
let intentoH = document.getElementById('intento');

/**
 * Función para gestionar los intentos de un juego o acción.
 * Esta función incrementa el valor de los intentos, o lo recupera de LocalStorage si no se especifica un incremento.
 * 
 * @param {number} cambio - Si el valor es 0, la función recupera el intento almacenado en localStorage.
 *                           Si el valor es 1, incrementa el contador de intentos en 1 y lo guarda en localStorage.
 */
function addAttempts(cambio = 0) {
  // Primero validamos si hay un valor de 'intento' almacenado en el LocalStorage y si no se solicita un incremento
  if(localStorage.getItem('intento') && cambio == 0) {
    // Si existe el valor de 'intento' en LocalStorage y no se requiere incremento,
    // se muestra el valor almacenado en la vista (en el elemento HTML correspondiente)
    intentoH.innerText = JSON.parse(localStorage.getItem('intento'));
    return; // No hace más, ya que solo mostramos el valor almacenado
  }

  // Si el valor de 'intentoH' existe y el parámetro 'cambio' es igual a 1 (solicitamos incrementar el intento)
  if(intentoH && cambio == 1) {
    // Recuperamos el valor actual del contador de intentos desde el elemento HTML
    let valuePresent = parseInt(intentoH.textContent) + 1;
    
    // Actualizamos la vista mostrando el nuevo valor de 'intento'
    intentoH.innerText = valuePresent;

    // Guardamos el nuevo valor en LocalStorage para persistirlo entre sesiones
    localStorage.setItem('intento', JSON.stringify(valuePresent));
  }
}

addAttempts();

function cleanAttempts()
{
  // Limpiamos el item
  localStorage.removeItem('intento');

  // restauramos intentos a 0 en el cliente
  let intentoH = document.getElementById('intento');
  intentoH.innerText = 0;
}

/**
 * Elimina el estado del juego y los índices ocultos almacenados en localStorage.
 */
function removeGameAndIndiceHidden()
{
  localStorage.removeItem('game');
  localStorage.removeItem('indice_hidden');
}


/**
 * Muestra una animación de éxito al completar correctamente la palabra.
 */
function showSuccessAnimation() {
   // Reproducir sonido de éxito
   playAudio('public/assets/sound/game-level-completed.wav');

  let container = document.createElement('div');
  container.classList.add('success-container');
  container.innerHTML = `
    <div class="success-checkmark">
      <div class="check-icon">
        <span class="icon-line line-tip"></span>
        <span class="icon-line line-long"></span>
      </div>
    </div>
    <p>¡Ganaste!</p>
  `;
  document.body.appendChild(container);
  setTimeout(() => {
    container.remove();
  }, 2000);
}

/**
 * Muestra una animación de error al ingresar una palabra incorrecta.
 */
function showErrorAnimation() {
  playAudio('public/assets/sound/sad-game-over-trombone.wav');
  let container = document.createElement('div');
  container.classList.add('error-container');
  container.innerHTML = `
    <div class="error-cross">
      <div class="cross-icon">
        <span class="icon-line cross-left"></span>
        <span class="icon-line cross-right"></span>
      </div>
    </div>
    <p>Perdiste</p>
  `;
  document.body.appendChild(container);
  setTimeout(() => {
    container.remove();
  }, 2000);
}

/**
 * Obtiene la palabra construida a partir de las entradas del usuario.
 * @returns {string} Palabra ingresada por el usuario.
 */
function getAnswer()
{
  let response = '';
   // Referencia al DOM, para recorrer los inputs de letter-input
   let inputs_letter = document.querySelectorAll(".letter-input");
   inputs_letter.forEach((input) => {
    response += input.value;
  });

  return response;
}



/**
 * Verifica si hay un juego en progreso almacenado en localStorage y lo carga si existe.
 */
function verifyGame(){
  if (localStorage.getItem('game')) {
    indicesOcultos = JSON.parse(localStorage.getItem('indice_hidden'));
    startGame(JSON.parse(localStorage.getItem('game')).palabra, JSON.parse(localStorage.getItem('game')).imagenes);
  } else {
    getWord();
  }
}

/**
 * Guarda los índices ocultos en localStorage si aún no están almacenados.
 */
function verifyIndiceHidden()
{
  if (!localStorage.getItem('indice_hidden')){
    localStorage.setItem('indice_hidden', JSON.stringify(indicesOcultos));
  }
}


let isProcessing = false;

let isAnimating = false;

/**
 * Realiza la animación de salida de la sección.
 * @returns {Promise<void>} Resuelve cuando la animación termina.
 */
function animateSectionOut() {
    if (isAnimating) return Promise.reject('Animación en progreso');

    isAnimating = true;

    return new Promise((resolve, reject) => {
        const section = document.querySelector('.section-img');
        if (section) {
            // Iniciar animación de salida
            section.classList.remove('slide-down');
            section.classList.add('slide-up');

            // Escuchar el final de la animación
            section.addEventListener('animationend', () => {
                // Remover clase de animación de salida
                section.classList.remove('slide-up');
                // Ocultar la sección
                section.classList.add('hidden');
                isAnimating = false;
                resolve();
            }, { once: true });
        } else {
            isAnimating = false;
            reject('Sección no encontrada');
        }
    });
}

/**
 * Realiza la animación de entrada de la sección.
 * @returns {Promise<void>} Resuelve cuando la animación termina.
 */
function animateSectionIn() {
      if (isAnimating) return Promise.reject('Animación en progreso');

    isAnimating = true;

    return new Promise((resolve, reject) => {
        const section = document.querySelector('.section-img');
        if (section) {
            // Asegurarse de que la sección esté oculta antes de animar
            section.classList.remove('hidden');
            // Forzar un reflow para que el navegador registre el cambio de clase
            void section.offsetWidth;
            // Iniciar animación de entrada
            section.classList.add('slide-down');

            // Escuchar el final de la animación
            section.addEventListener('animationend', () => {
                // Remover clase de animación de entrada
                section.classList.remove('slide-down');
                isAnimating = false;
                resolve();
            }, { once: true });
        } else {
            isAnimating = false;
            reject('Sección no encontrada');
        }
    });
}




