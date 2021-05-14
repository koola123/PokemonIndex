// IIFE Pokemon Repository
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison'],
    },
    {
      name: 'Nidoking',
      height: 1.4,
      type: ['ground', 'poison'],
    },
    {
      name: 'Onix',
      height: 8.8,
      type: ['rock', 'ground'],
    }
  ];
// function declaration
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'type' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
// forEach loop function block
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
  });

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function showDetails(pokemon) {
    console.log(pokemonList);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
// function for added new pokemon
pokemonRepository.add({ name: 'Charmander', height: 2.0, type: ['fire'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
