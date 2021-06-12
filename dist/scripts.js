let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    'object' == typeof e && 'name' in e
      ? t.push(e)
      : console.error('Error when validation item', item);
  }
  function o(t) {
    pokemonRepository.loadDetails(t).then(function() {
      let e = $('.modal-body'),
        n = $('.modal-title');
      n.empty(), e.empty();
      let o = $('<h1>' + t.name + '</h1>'),
        i = $('<img class="modal-img" style="width: 30%">');
      i.attr('src', t.imageUrl);
      let l = $('<p>Height: ' + t.height + ' []-- Pokémon units </p>'),
        a = document.createElement('p');
      a.innerText = 'Weight: ' + t.weight + ' []-- Pokémon units ';
      let r = document.createElement('p'),
        c = 'Types: ';
      t.types.forEach(function(t) {
        c += t.type.name + '** ';
      });
      let s = document.createElement('p'),
        p = 'Abilities: ';
      t.abilities.forEach(function(t) {
        p += t.ability.name + '** ';
      }),
        (r.innerHTML = c),
        (s.innerHTML = p),
        n.append(o),
        e.append(i),
        e.append(l),
        e.append(a),
        e.append(r),
        e.append(s),
        $('#pokemonModal').modal('toggle');
    });
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = document.querySelector('.list-group'),
        n = document.createElement('li');
      n.classList.add('list-group-item', 'list-group-item-action');
      let i = document.createElement('button');
      (i.innerText = t.name),
        i.classList.add('btn'),
        i.classList.add('btn-block'),
        i.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal'),
        n.appendChild(i),
        e.appendChild(n),
        i.addEventListener('click', function() {
          o(t);
        });
    },
    loadList: function(t) {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            let e = { name: t.name, detailsUrl: t.url };
            n(e), console.log(e);
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: function(t) {
      let e = t.detailsUrl;
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(e) {
          return (
            (t.imageUrl = e.sprites.front_default),
            (t.height = e.height),
            (t.weight = e.weight),
            (t.types = [...e.types]),
            (t.abilities = [...e.abilities]),
            item
          );
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    showDetails: o
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
