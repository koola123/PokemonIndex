
// IIFE for Pokemon List
  (function() {
    let pokemonList = [
    {name: "Bulbasaur", height: 0.7, type: ['grass', 'poison']},
    {name: "Nidoking", height: 1.4, type: ['ground', 'poison']},
    {name: "Onix", height: 8.8, type: ['rock', 'ground']}
    ];
  })();


// Pokemon Repository
    let pokemonRepository = (function () {
    let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Nidoking',
      height: 1.4,
      type: ['ground', 'poison']
    },
    {
      name: 'Onix',
      height: 8.8,
      type: ['rock', 'ground']
    }
    ];

    function getAll() {
      return pokemonList;
    }

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    return {
      getAll: getAll,
      add: add
    };
  })();


pokemonRepository.add({ name:'Charmander', height: 2.0, type: ['fire']});
pokemonRepository.getAll();
