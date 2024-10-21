// Claves de la API
const pubkey = '99a8b1b8b607b126fea4d180b37fe269'; // clave publica API
const pvtkey = '865c6af5a8512dd6c6d007ff9b7f5e60eabd0213'; //clave privada


const ts = Date.now();
const hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();

//  URL Api de Marvel
const baseUrl = 'https://gateway.marvel.com:443/v1/public';

// function-> crear div con info
function createCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `

        <h3>${character.name}</h3>
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
        <p>${character.description ? character.description : 'No description available.'}</p>

    `;
    return card;
}

// function-> Fetch a la API para buscar a Wolverine
function fetchCharacter(name) {
    const url = `${baseUrl}/characters?name=${name}&ts=${ts}&apikey=${pubkey}&hash=${hash}`;   // anyadir al endpoint  `ts=${ts}&apikey=${pubkey}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const charactersDiv = document.getElementById('characters');
            const characters = data.data.results;
            characters.forEach(character => {
                const card = createCard(character);
                charactersDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching character:', error));
}

// function-> Async/await para buscar a otro personaje
async function fetchCharacterAsync(name) {
    const url = `${baseUrl}/characters?name=${name}&ts=${ts}&apikey=${pubkey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const charactersDiv = document.getElementById('characters');
        const characters = data.data.results;
        characters.forEach(character => {
            const card = createCard(character);
            charactersDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching character with async/await:', error);
    }
}

// Llamadas a las funciones con el pj que quieras buscar
fetchCharacter('wolverine');  // Fetch 
fetchCharacterAsync('thor'); // Async/await


// function-> para buscar los cómics Marvel
function fetchComics() {
    const url = `${baseUrl}/comics?ts=${ts}&apikey=${pubkey}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const comicsDiv = document.getElementById('characters');  
            const comics = data.data.results;
            comics.forEach(comic => {
                const card = createCard({
                    name: comic.title,  //   "name" por "title"para buscar cómics
                    thumbnail: comic.thumbnail,
                    description: comic.description || '#N/A'
                });
                comicsDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error', error));
}

fetchComics();
