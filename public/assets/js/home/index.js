// Obtenemos una palabra aleatoria de la API y comenzamos el juego
const getWord = async () => {
    let response = await FetchData('http://localhost/ahorcados_minijuego/word/getWord', 'GET', {});
    
    if(!response)
    {
        alert('No se pudo obtener la palabra', response);
    }
    // Guardamos la palabra y el array de imagenes el LocalStorage con el referente de nombre -> game

    let game = {palabra: response.palabra, imagenes : response.imagenes}
    localStorage.setItem('game', JSON.stringify(game));
    // Iniciamos el juego
    startGame(response.palabra, response.imagenes);
};



