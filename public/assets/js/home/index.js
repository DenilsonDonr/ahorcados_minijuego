createFloatingShapes();

// Obtenemos una palabra aleatoria de la API y comenzamos el juego
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

const savePlayWord = async (id) => {
    try {
        saveStorageWords(id);
        let response = await FetchData('http://localhost/ahorcados_minijuego/word/addPlay', 'POST', {
            id: id
        });


        if(!response.success) {
            throw new Error(response.error);
        }

        getScore();
        
    } catch (error) {
        console.error(error);
    }
}

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

function updateClient(scoreValue)
{
    let score = document.getElementById('score');
    
    score.innerText = scoreValue ? scoreValue : '0';
}
function saveStorageGame(response)
{
    // Guardamos la palabra y el array de imagenes el LocalStorage con el referente de nombre -> game
    let game = {palabra: response.palabra, imagenes : response.imagenes}
    localStorage.setItem('game', JSON.stringify(game));
}

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

function saveStorageRows(rows) {
    // Solo lo guardamos si no existe ya en el localStorage
    if (!localStorage.getItem('rows')) {
        localStorage.setItem('rows', JSON.stringify(rows));
    }
}

function verifyMaxRowWidthMaxArrayWords() {
    let words = JSON.parse(localStorage.getItem('words'));
    let rows = localStorage.getItem('rows');

    // Verificamos si rows está en localStorage y si no es nulo
    if (rows && words.length >= JSON.parse(rows)) {
        return true;
    }
    return false;
}


