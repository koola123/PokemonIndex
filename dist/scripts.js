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
        i = $('<img class="modal-img" style="width: 50%">');
      i.attr('src', t.imageUrl);
      let l = $('<p>Height: ' + t.height + '</p>'),
        a = document.createElement('SPAN'),
        r = 'Types: ';
      t.types.forEach(function(t) {
        r += t.type.name + ' ';
      }),
        (a.innerHTML = r),
        n.append(o),
        e.append(i),
        e.append(l),
        e.append(a),
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
            (t.types = [...e.types]),
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
