// Obtenemos una palabra aleatoria de la API y la mostramos en el DOM
const getWord = async () => {
    let response = await FetchData('http://localhost/ahorcados_minijuego/word/getWord', 'GET', {});
    
    if(!response)
    {
        alert('No se pudo obtener la palabra', response);
    }

    startGame(response.palabra);
};
