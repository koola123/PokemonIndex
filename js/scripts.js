// Defined three objects as pokemon in an Array:

let pokemonList = [
  {name: "Bulbasaur", height: 0.7, type: ['grass', 'poison']},
  {name: "Nidoking", height: 1.4, type: ['ground', 'poison']},
  {name: "Onix", height: 8.8, type: ['rock', 'ground']}
  ];

/* Created a loop that iterates over each item in the Array, added text for
sizing the height of each pokemon and put code into loop for printing
the biggest pokemon via definition of height */

for (let i = 0; i <pokemonList.length; i++) {
  if (pokemonList[i].height >0.5 && pokemonList[i].height < 10 ) {
    document.write("<p>" + pokemonList[i].name +
    ' (height): ' +  pokemonList[i].height + ' - Wow, that\'s big! ' + "</p>");
  }
}
