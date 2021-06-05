// IIFE Pokemon Repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

  // Add Pokemon To The Array
    function add(pokemon) {
    repository.push(pokemon);
  }

// Return Pokemonlist
  function getAll() {
    return pokemonList;
  }

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

// forEach loop function block
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
// Adding a new class on li elements
    listpokemon.classList.add('group-list-item');
    listpokemon.classList.add('group-list-item-action')
// Adding Pokemon Button Utility classes
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

// load list function - API
  function loadList() {
    return fetch(pokemonUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
// load details function - API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = [];
      details.types.forEach(function (pokemonType) {
         item.types.push(pokemonType.type.name);
     });
      item.abilities = [];
      details.abilities.forEach(function (pokemonAbility) {
      item.abilities.push(pokemonAbility.ability.name);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
// show details function - API
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  // show modal function
  function showModal(pokemon) {
    let { name, height, weight, abilities, imageUrl } = pokemon;
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + height;

    let myImage = document.createElement('img');
    myImage.src = imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(myImage);
    modalContainer.appendChild(modal);



    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal(title, text);
  });



  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem,
  };
})();

// call functions
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});
