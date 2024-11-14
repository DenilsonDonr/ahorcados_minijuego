// Obtenemos una palabra aleatoria de la API y comenzamos el juego
const getWord = async () => {
    let response = await FetchData('http://localhost/ahorcados_minijuego/word/getWord', 'GET', {});
        
    if (response) {
        if(localStorage.getItem('words'))
        {
            let status = verifyMaxRowWidthMaxArrayWords();
            if (status)
            {
                localStorage.clear();
                getWord();
                return;
            }
        }
        // Guardamos la palabra y las imágenes
        saveStorageRows(response[1]);
        saveStorageWords(response[0].id_palabra);
        saveStorageGame(response[0]);
        startGame(response[0].palabra, response[0].imagenes);
        return;
    } else {
        alert('No se pudo obtener la palabra, intentando nuevamente...');
    }
};


function saveStorageGame(response)
{
    // Guardamos la palabra y el array de imagenes el LocalStorage con el referente de nombre -> game
    let game = {palabra: response.palabra, imagenes : response.imagenes}
    localStorage.setItem('game', JSON.stringify(game));
}



function saveStorageWords(id)
{
    // Removemos el juego y el indice oculto
    removeGameAndIndiceHidden();
    
    // Primero verificaremos si no hay palabras, si es asi, agregamos un nuevo localStorage
    if(!localStorage.getItem('words'))
    {
        // guardamos el id de la palabra 
        let words = [id];
        localStorage.setItem('words', JSON.stringify(words));
        return;
    }

    let words = JSON.parse(localStorage.getItem('words')) || [];
    
    // Verificamos que el ID no esté ya en el almacenamiento
    if (!words.includes(id)) {
        // Si no está, lo agregamos
        words.push(id);
        localStorage.setItem('words', JSON.stringify(words));
    } else {
        // Si ya está, obtenemos una nueva palabra
        getWord();
    }
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


