// IIFE Pokemon Repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// function declaration
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
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

// load list function - API
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
// load details function - API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
// show details function - API
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {

    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem
  };
})();

// call functions
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});

// show modal function

function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
   closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
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
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Pokémon name', 'height');
});
