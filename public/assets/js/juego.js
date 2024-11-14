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
  if(!localStorage.getItem('indice_hidden')){
    ocultar = Math.ceil(palabra.length * porcentajeOcultar); // Actualiza el número de letras a ocultar en base a la longitud de la palabra
    indicesOcultos = []; // Reinicia los índices ocultos
    generateRandomIndices();
  }else{
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
  writingArrangement();
  initilizeEventInputLetters();
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

function writingArrangement() {
  // Agrega validación de entrada para solo letras
  document.querySelectorAll(".letter-input").forEach((input, index, inputs) => {
    input.addEventListener("input", function () {
      // Permitir solo letras
      if (this.value.length > 1 || !/^[a-zA-ZñÑ]$/.test(this.value)) {
        this.value = ""; // Borra si no es una letra
      }

      // Pasar al siguiente input si la letra es válida y el siguiente no está deshabilitado
      let nextInput = inputs[index + 1];
      if (this.value) {
        while (nextInput && nextInput.disabled) {
          nextInput = inputs[++index];
        }
        if (nextInput) nextInput.focus();
      }
    });

    // Manejar la tecla de retroceso (Backspace)
    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace" && this.value === "") {
        let previousInput = inputs[index - 1];
        // Encuentra el input anterior no deshabilitado
        while (previousInput && previousInput.disabled) {
          previousInput = inputs[--index];
        }
        if (previousInput) {
          previousInput.focus();
          previousInput.value = ""; // Borra también el valor del input anterior si no está deshabilitado
        }
      }

      // Avanzar al siguiente input no deshabilitado al presionar Enter
      if (event.key === "Enter") {
        let nextInput = inputs[index + 1];
        while (nextInput && nextInput.disabled) {
          nextInput = inputs[++index];
        }
        if (nextInput) {
          nextInput.focus();
          event.preventDefault(); // Evita cualquier acción por defecto del Enter
        }
      }
    });
  });
}

// function updateStorageIndiceHidden(index){
//   // Buscar el valor en el array, con que sea igual con el index value
//   let position = indicesOcultos.indexOf(index);
//   indicesOcultos.splice(position, 1);
//   localStorage.setItem('indice_hidden', JSON.stringify(indicesOcultos));
// }



let isCompletedAll = false;

function initilizeEventInputLetters()
{
  // Referencia al DOM, para recorrer los inputs de letter-input
  let inputs_letter = document.querySelectorAll(".letter-input");
  inputs_letter.forEach((input, index) => {
    input.addEventListener('input', function(){
      // updateStorageIndiceHidden(index);
      verifyLetterInput();
      if(isCompletedAll === true){
        verifyRightAnswer(getAnswer());
      }
    })
  })
}


// Verificamos que todos los campos tengan valor
function verifyLetterInput()
{
  // Referencia al DOM, para recorrer los inputs de letter-input
  let inputs_letter = document.querySelectorAll(".letter-input");

  // Verificamos que todos los campos tengan valor
  isCompletedAll = Array.from(inputs_letter).every(input => input.value !== "")
}

function verifyRightAnswer(wordVal)
{
  if(isCompletedAll){
    let word = palabra.replace(/_/g, '');
    if(word === wordVal){
      showSuccessAnimation();
      //alert('��Ganaste!');
      localStorage.removeItem('game');
      localStorage.removeItem('indice_hidden');
       // Espera 2 segundos para ejecutar la animación de salida de imágenes
       setTimeout(() => {
        animateSectionOut();
      }, 2000);
      
      // Espera 4 segundos en total antes de obtener la nueva palabra
      setTimeout(() => {
        getWord();
      }, 3000);
    } else {
      showErrorAnimation();

      //alert('Perdiste!');
      // localStorage.removeItem('game');
      // localStorage.removeItem('indice_hidden');
      // startGame('', []);
    }
  } else {
    alert('Debes completar todas las letras.');
  }
}

function showSuccessAnimation() {
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

function animateSectionOut() {
  let section = document.querySelector('.section-img');
  if (section) {
    // Asegúrate de eliminar cualquier clase previa antes de aplicar la nueva animación
    section.classList.remove('slide-up', 'slide-down');

    // Añade la clase para iniciar la animación de salida
    section.classList.add('slide-up');

    // Escuchar cuando termina la animación de salida para luego activar la animación de entrada
    section.addEventListener('animationend', () => {
      // Remover la clase de animación de salida
      section.classList.remove('slide-up');
      // Añadir la clase de animación de entrada para la siguiente palabra
      section.classList.add('slide-down');

      // Escuchar cuando termina la animación de entrada para remover la clase
      section.addEventListener('animationend', () => {
        section.classList.remove('slide-down'); // Remueve la clase para que esté lista para la próxima salida
      }, { once: true }); // Asegúrate de que solo se ejecute una vez por entrada
    }, { once: true }); // Asegúrate de que solo se ejecute una vez por salida
  }
}



