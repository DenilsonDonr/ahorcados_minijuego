/**
 * Crea figuras flotantes en la pantalla.
 * Función de inicialización visual.
 */
createFloatingShapes();


/**
 * Obtiene una palabra aleatoria desde la API y comienza el juego.
 * Realiza múltiples verificaciones para asegurarse de que la palabra es única
 * y actualiza el almacenamiento local y la interfaz del usuario.
 * @returns {Promise<void>} Promesa resuelta al finalizar el proceso exitosamente.
 */
const getWord = async () => {
    try {
        while (true) { // Bucle hasta encontrar una palabra única
            let response = await FetchData('http://localhost/ahorcados_minijuego/word/getWord', 'GET', {});

            if (!response) {
                throw new Error('No se pudo obtener la palabra');
            }

            if (localStorage.getItem('words')) {
                let status = verifyMaxRowWidthMaxArrayWords();
                if (status) {
                    localStorage.removeItem('game');
                    localStorage.removeItem('indice_hidden');
                    localStorage.removeItem('rows');
                    localStorage.removeItem('words');
                }
            }

            let wordId = response[0].id_palabra;
            let words = JSON.parse(localStorage.getItem('words')) || [];

            if (words.includes(wordId)) {
                continue; // Obtener una nueva palabra si ya existe
            }

            // Guardar palabra e imágenes
            saveStorageWords(wordId);
            saveStorageRows(response[1]);
            saveStorageGame(response[0]);
            startGame(response[0].palabra, response[0].imagenes);
            break; // Salir del bucle una vez obtenida una palabra única
        }

        return Promise.resolve();
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};


/**
 * Guarda una palabra jugada y actualiza el puntaje del usuario.
 * @param {number} id ID de la palabra jugada.
 * @returns {Promise<void>}
 */
const savePlayWord = async (id) => {
    try {

        // tomar el valor de intento, del localStorage
        let intento = JSON.parse(localStorage.getItem('intento')) ? JSON.parse(localStorage.getItem('intento')) : 0;
        console.log(intento)
        saveStorageWords(id);
        let response = await FetchData('http://localhost/ahorcados_minijuego/word/addPlay', 'POST', {
            id: id,
            intento: intento
        });


        if(!response.success) {
            throw new Error(response.error);
        }

        cleanAttempts();
        getScore();
        
    } catch (error) {
        console.error(error);
    }
}

/**
 * Obtiene el puntaje actual del jugador desde la API y actualiza la interfaz.
 * @returns {Promise<void>}
 */
const getScore = async () => {
    try{
        const response = await FetchData('http://localhost/ahorcados_minijuego/word/getScore', 'GET', {});
        console.log(response)

        updateClient(response.score);
    }catch(error){
        console.error(error)
    }
}


getScore();


/**
 * Actualiza el puntaje mostrado en la interfaz de usuario.
 * @param {number} scoreValue Valor del puntaje a mostrar.
 */
function updateClient(scoreValue)
{
    let score = document.getElementById('score');
    
    score.innerText = scoreValue ? scoreValue : '0';
}


/**
 * Guarda la palabra y sus imágenes asociadas en el LocalStorage.
 * @param {Object} response Respuesta de la API con los datos de la palabra e imágenes.
 */
function saveStorageGame(response)
{
    // Guardamos la palabra y el array de imagenes el LocalStorage con el referente de nombre -> game
    let game = {palabra: response.palabra, imagenes : response.imagenes}
    localStorage.setItem('game', JSON.stringify(game));
}

/**
 * Guarda el ID de una palabra en el almacenamiento local y gestiona la lista de palabras jugadas.
 * @param {number} id ID de la palabra.
 */
function saveStorageWords(id) {
    // Remover el juego y el índice oculto
    removeGameAndIndiceHidden();
    
    // Verificar si 'words' existe
    if(!localStorage.getItem('words')) {
        // Guardar el ID de la palabra
        let words = [id];
        localStorage.setItem('words', JSON.stringify(words));
        return;
    }

    let words = JSON.parse(localStorage.getItem('words')) || [];
    
    // Verificar que el ID no esté ya en 'words'
    if (!words.includes(id)) {
        // Si no está, agregarlo
        words.push(id);
        localStorage.setItem('words', JSON.stringify(words));
    }
    // Si ya está, no hacer nada; getWord manejará la obtención de una nueva palabra
}


/**
 * Guarda el número máximo de filas en el almacenamiento local si aún no existe.
 * @param {number} rows Número máximo de filas.
 */
function saveStorageRows(rows) {
    // Solo lo guardamos si no existe ya en el localStorage
    if (!localStorage.getItem('rows')) {
        localStorage.setItem('rows', JSON.stringify(rows));
    }
}


/**
 * Verifica si la cantidad de palabras almacenadas excede el número máximo de filas permitido.
 * @returns {boolean} Verdadero si se alcanza el máximo; falso en caso contrario.
 */
function verifyMaxRowWidthMaxArrayWords() {
    let words = JSON.parse(localStorage.getItem('words'));
    let rows = localStorage.getItem('rows');

    // Verificamos si rows está en localStorage y si no es nulo
    if (rows && words.length >= JSON.parse(rows)) {
        return true;
    }
    return false;
}


