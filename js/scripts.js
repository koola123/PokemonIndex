
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

pokemonRepository.getAll().forEach((pokemon) => {
  if (pokemon.height <8.8) {
    document.write("<p>" + pokemon.name +  ' (height: ' + pokemon.height + ') ' + "</p>");
  }else {
    document.write("<p>" + pokemon.name +  ' (height: ' + pokemon.height + ') ' + " - Wow, that's big!" + "</p>");
  }
})
