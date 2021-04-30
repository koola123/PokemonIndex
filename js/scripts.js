// Defined three objects as Pokémons in an Array:
let pokemonList = [
  {name: "Bulbasaur", height: 0.7, type: ['grass', 'poison']},
  {name: "Nidoking", height: 1.4, type: ['ground', 'poison']},
  {name: "Onix", height: 8.8, type: ['rock', 'ground']}
  ];

/* A loop that iterates over each item in the Array,
and prints Pokémons names and heights on the websites DOM: */
for (let i = 0; i <pokemonList.length; i++) {
  if (pokemonList[i].height <1.0 && pokemonList[i].height >0.5) {
    console.log(pokemonList[i].name + console.log(pokemonList[i].type + console.log(pokemonList[i].height)));
    document.write(pokemonList[0].name + ' (height: 0.7) ' );
  } else if(pokemonList[i].height <1.5) {
    console.log(pokemonList[i].name + console.log(pokemonList[i].type + console.log(pokemonList[i].height)));
    document.write(pokemonList[1].name + ' (height: 1.4) ' );
  } else {
    console.log(pokemonList[i].name + console.log(pokemonList[i].type + console.log(pokemonList[i].height)));
    document.write(pokemonList[2].name + ' (height: 8.8) ' );
  }
}
