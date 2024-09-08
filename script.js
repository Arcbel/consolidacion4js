const baseUrl = "https://swapi.dev/api/people/";
const ranges = document.querySelectorAll('.range');
const characterInfo = document.getElementById('character-info');


function* characterGenerator(data) {
    for (let character of data) {
    yield `
        <div class="character">
        <h3>${character.name}</h3>
        <p>Altura: ${character.height} cm</p>
        <p>Peso: ${character.mass} kg</p>
        </div>
    `;
    }
}


async function fetchCharacters(start, end) {
    const characters = [];
    for (let i = start; i <= end; i++) {
    const response = await fetch(`${baseUrl}${i}/`);
    const data = await response.json();
    characters.push(data);
    }
    return characters;
}


ranges.forEach(range => {
    range.addEventListener('mouseenter', async (event) => {
        const rangeText = event.target.getAttribute('data-range');
        const [start, end] = rangeText.split('-').map(Number);
        const characters = await fetchCharacters(start, end);

        const generator = characterGenerator(characters);
        characterInfo.innerHTML = ''; 

        for (let character of generator) {
            characterInfo.innerHTML += character;
        }
    });
});
