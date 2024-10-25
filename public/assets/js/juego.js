let palabras = "bicicleta";
let palabraSecreta = "";

// Proporción de letras a ocultar (por ejemplo, el 25%)
let porcentajeOcultar = 0.75;
let ocultar = Math.ceil(palabras.length * porcentajeOcultar); // Numero de letras a ocultar

let indicesOcultos = [];

// Generar indices aleatorios unicos para ocultar letras
while (indicesOcultos.length < ocultar) {
  let randomIndex = Math.floor(Math.random() * palabras.length);
  if (!indicesOcultos.includes(randomIndex)) {
    indicesOcultos.push(randomIndex);
  }
}

// Bucle para construir la palabra secreta con letras ocultas
for (let i = 0; i < palabras.length; i++) {
  if (indicesOcultos.includes(i)) {
    palabraSecreta += "_"; // Ocultar la letra
  } else {
    palabraSecreta += palabras[i]; // Mostrar la letra
  }
}

let words = document.getElementById("word");

for (let i = 0; i < palabras.length; i++) {
  if (palabraSecreta[i] === "_") {
    words.innerHTML += `<input type="text" class="letter-input" value='' maxlength="1">`;
  } else {
    words.innerHTML += `<input type="text" class="letter-input" value='${palabraSecreta[i]}' maxlength="1" disabled>`;
  }

  if (i === palabras.length - 1) {
    writingArrangement();
  }
}

function writingArrangement() {
    // Agregamos validacion de entrada para solo letras
    document.querySelectorAll(".letter-input").forEach((input, index, inputs) => {
      input.addEventListener("input", function () {
        // Permitir solo letras
        if (this.value.length > 1 || !/^[a-zA-Z]$/.test(this.value)) {
          this.value = ""; // Borra si no es una letra
        }
  
        // Pasar al siguiente input si la letra es valida y el siguiente no esta deshabilitado
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
            previousInput.value = ""; // Borra tambien el valor del input anterior si no esta deshabilitado
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
            event.preventDefault(); // Evita cualquier accion por defecto del Enter
          }
        }
      });
    });
  }
  