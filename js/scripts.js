// Defined three objects as pokemon in an Array

let pokemonList = [
  {name: "Bulbasaur", height: 0.7, type: ['grass', 'poison']},
  {name: "Nidoking", height: 1.4, type: ['ground', 'poison']},
  {name: "Onix", height: 8.8, type: ['rock', 'ground']}
  ];

// Loop iterates over each item and prints biggest pokemon to the console

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height <8.8) {
      document.write("<p>" + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + "</p>");
      console.log(pokemonList[i]);
    }else {
      document.write("<p>" + pokemonList[i].name + " (height: 8.8)" + " - Wow, that's big!" + "</p>");
      console.log(pokemonList[i]);
    }
  }
