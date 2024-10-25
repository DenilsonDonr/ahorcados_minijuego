let palabra = "";
let palabraSecreta = "";

// Proporción de letras a ocultar (por ejemplo, el 25%)
let porcentajeOcultar = 0.75;
let ocultar = Math.ceil(palabra.length * porcentajeOcultar); // Numero de letras a ocultar
let indicesOcultos = [];

function startGame(word) {
  palabra = word;
  ocultar = Math.ceil(palabra.length * porcentajeOcultar); // Actualiza el número de letras a ocultar en base a la longitud de la palabra
  indicesOcultos = []; // Reinicia los índices ocultos
  palabraSecreta = ""; // Reinicia la palabra secreta
  generateRandomIndices();
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
}

function writingArrangement() {
  // Agrega validación de entrada para solo letras
  document.querySelectorAll(".letter-input").forEach((input, index, inputs) => {
    input.addEventListener("input", function () {
      // Permitir solo letras
      if (this.value.length > 1 || !/^[a-zA-Z]$/.test(this.value)) {
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
