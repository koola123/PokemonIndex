// IIFE Pokemon Repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';

// Return Pokemon List
  function getAll() {
    return pokemonList;
  }
// Add Pokemons To The List
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

// Add Styling For Pokemon List
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('group-list-item');
    listpokemon.classList.add('list-group-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.classList.add('btn');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

// Load Pokemon List
  function loadList(item) {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
// Load Pokemon Details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      return item
    }).catch(function (e) {
      console.error(e);
    });
  }
// Show Pokemon Details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (item) {
      showModal(item)
    });
  }

// Show Modal
  function showModal(pokemon) {
    const { name, height, weight, types, abilities, imageUrl } = pokemon;
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    let modalContainer = $('#modal-container');

    modalContainer.innerHTML = '';

    moodalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + item.name + '</h1>');

    let pokemonImageFront = $('<img class="modal-img" style="width: 50%">');
    pokemonImageFront.attr("src", item.imageUrlFront);
    let pokemonImageBack = $('<img class="modal-img" style="width: 50%">');
    pokemonImageBack.attr("src", item.imageUrlBack);

    let pokemonHeight = $('<p>' + 'height: ' + item.height + '</p>');

    let pokemonWeight = $('<p>' + 'weight: ' + item.weight + '</p>');

    let pokemonType = $('<p>' + 'types: ' + item.types + '<p>');

    let pokemonAbilities = $('<p>' + 'abilities: ' + item.abilities + '<p>');

// Show Pokemon List Contents
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonType);
    modalBody.append(pokemonAbilities);
  }

// Return Functions
    return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem,
  };
})();

// Populate Pokemon List
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});
