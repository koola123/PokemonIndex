// IIFE Pokemon Repository
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Get Pokemons
  function getAll() {
    return pokemonList;
  }

  // Add Pokemons To Array
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  // Add Pokemons To List
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = capitalize(pokemon.name);
    button.classList.add('button');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // Get Items From JSON
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Load Pokemon Details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(' ' + details.types[i].type.name);
        }
        item.abilities = [];
        for (i = 0; i < details.abilities.length; i++) {
          item.abilities.push(' ' + details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Show Pokemon Details
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // Display Modal
  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerHTML = ' ';
    modalBody.innerHTML = ' ';

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = capitalize(pokemon.name);
    let pokemonImageFront = document.createElement('img');
    pokemonImageFront.setAttribute('src', pokemon.imageUrlFront);
    let pokemonImageBack = document.createElement('img');
    pokemonImageBack.setAttribute('src', pokemon.imageUrlBack);
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerHTML =
      '<strong>Height: </strong>' + pokemon.height + ' meter';
    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerHTML =
      '<strong>Weight: </strong>' + pokemon.weight + ' kg';
    let pokemonType = document.createElement('p');
    pokemonType.innerHTML = '<strong>Type: </strong>' + pokemon.types;
    let pokemonAbilities = document.createElement('p');
    pokemonAbilities.innerHTML =
      '<strong>Abilities: </strong>' + pokemon.abilities;

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonType);
    modalBody.append(pokemonAbilities);
  }

  function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search For Pokemon
function searchFunction() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.querySelector('.searchbar');
  filter = input.value.toUpperCase();
  ul = document.querySelector('.list-group');
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('button')[0];
    txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
