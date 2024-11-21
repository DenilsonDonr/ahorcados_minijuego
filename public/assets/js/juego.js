let palabra = "";
let palabraSecreta = "";

// Proporción de letras a ocultar (por ejemplo, el 25%)
let porcentajeOcultar = 0.75;
let ocultar; // Numero de letras a ocultar
let indicesOcultos = [];

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

// Insertamos los valores al SRC de las imagenes.
function insertImages(arrayImages)
{
  for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].src = 'public/assets/img/' + arrayImages[i];
  }
}

// function writingArrangement() {
//   // Agrega validación de entrada para solo letras
//   document.querySelectorAll(".letter-input").forEach((input, index, inputs) => {
//     input.addEventListener("input", function () {
//       // Permitir solo letras
//       if (this.value.length > 1 || !/^[a-zA-ZñÑ]$/.test(this.value)) {
//         this.value = ""; // Borra si no es una letra
//       }

//       // Pasar al siguiente input si la letra es válida y el siguiente no está deshabilitado
//       let nextInput = inputs[index + 1];
//       if (this.value) {
//         while (nextInput && nextInput.disabled) {
//           nextInput = inputs[++index];
//         }
//         if (nextInput) nextInput.focus();
//       }
//     });

//     // Manejar la tecla de retroceso (Backspace)
//     input.addEventListener("keydown", function (event) {
//       if (event.key === "Backspace" && this.value === "") {
//         let previousInput = inputs[index - 1];
//         // Encuentra el input anterior no deshabilitado
//         while (previousInput && previousInput.disabled) {
//           previousInput = inputs[--index];
//         }
//         if (previousInput) {
//           previousInput.focus();
//           previousInput.value = ""; // Borra también el valor del input anterior si no está deshabilitado
//         }
//       }

//       // Avanzar al siguiente input no deshabilitado al presionar Enter
//       if (event.key === "Enter") {
//         let nextInput = inputs[index + 1];
//         while (nextInput && nextInput.disabled) {
//           nextInput = inputs[++index];
//         }
//         if (nextInput) {
//           nextInput.focus();
//           event.preventDefault(); // Evita cualquier acción por defecto del Enter
//         }
//       }
//     });
//   });
// }

// function updateStorageIndiceHidden(index){
//   // Buscar el valor en el array, con que sea igual con el index value
//   let position = indicesOcultos.indexOf(index);
//   indicesOcultos.splice(position, 1);
//   localStorage.setItem('indice_hidden', JSON.stringify(indicesOcultos));
// }



let isCompletedAll = false;

// function initilizeEventInputLetters()
// {
//   // Referencia al DOM, para recorrer los inputs de letter-input
//   let inputs_letter = document.querySelectorAll(".letter-input");
//   inputs_letter.forEach((input, index) => {
//     input.addEventListener('input', function(){
//       // updateStorageIndiceHidden(index);
//       verifyLetterInput();
//       if(isCompletedAll === true){
//         verifyRightAnswer(getAnswer());
//       }
//     })
//   })
// }

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


// Verificamos que todos los campos tengan valor
function verifyLetterInput()
{
  // Referencia al DOM, para recorrer los inputs de letter-input
  let inputs_letter = document.querySelectorAll(".letter-input");

  // Verificamos que todos los campos tengan valor
  isCompletedAll = Array.from(inputs_letter).every(input => input.value !== "")
}

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
          showErrorAnimation();
          console.log('Respuesta incorrecta');
      }
  } else {
      alert('Debes completar todas las letras.');
      console.log('No todas las letras están completas');

  }
}



function removeGameAndIndiceHidden()
{
  localStorage.removeItem('game');
  localStorage.removeItem('indice_hidden');
}


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



// Verificamos si no hay una partida ya iniciada en LocalStorage, en caso contrario, continuamos el flujo.
function verifyGame(){
  if (localStorage.getItem('game')) {
    indicesOcultos = JSON.parse(localStorage.getItem('indice_hidden'));
    startGame(JSON.parse(localStorage.getItem('game')).palabra, JSON.parse(localStorage.getItem('game')).imagenes);
  } else {
    getWord();
  }
}

function verifyIndiceHidden()
{
  if (!localStorage.getItem('indice_hidden')){
    localStorage.setItem('indice_hidden', JSON.stringify(indicesOcultos));
  }
}


let isProcessing = false;

let isAnimating = false;

// Función para animar la salida de la sección
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

// Función para animar la entrada de la sección
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




