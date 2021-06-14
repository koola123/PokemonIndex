let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(t) {
    'object' == typeof t && 'name' in t
      ? e.push(t)
      : console.log('pokemon is not correct');
  }
  function o(e) {
    pokemonRepository.loadDetails(e).then(function() {
      !(function(e) {
        let t = document.querySelector('.modal-title'),
          n = document.querySelector('.modal-body');
        (t.innerHTML = ' '), (n.innerHTML = ' ');
        let o = document.createElement('h1');
        o.innerText = i(e.name);
        let r = document.createElement('img');
        r.setAttribute('src', e.imageUrlFront);
        let l = document.createElement('img');
        l.setAttribute('src', e.imageUrlBack);
        let a = document.createElement('p');
        a.innerHTML = '<strong>Height: </strong>' + e.height + ' meter';
        let c = document.createElement('p');
        c.innerHTML = '<strong>Weight: </strong>' + e.weight + ' kg';
        let s = document.createElement('p');
        s.innerHTML = '<strong>Type: </strong>' + e.types;
        let u = document.createElement('p');
        (u.innerHTML = '<strong>Abilities: </strong>' + e.abilities),
          t.append(o),
          n.append(r),
          n.append(l),
          n.append(a),
          n.append(c),
          n.append(s),
          n.append(u);
      })(e);
    });
  }
  function i(e) {
    return 'string' != typeof e ? '' : e.charAt(0).toUpperCase() + e.slice(1);
  }
  return {
    add: n,
    getAll: function() {
      return e;
    },
    addListItem: function(e) {
      let t = document.querySelector('.list-group'),
        n = document.createElement('li'),
        r = document.createElement('button');
      (r.innerText = i(e.name)),
        r.classList.add('button'),
        r.setAttribute('data-target', '#pokemonModal'),
        r.setAttribute('data-toggle', 'modal'),
        n.appendChild(r),
        t.appendChild(n),
        r.addEventListener('click', function() {
          o(e);
        });
    },
    showDetails: o,
    loadList: function() {
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          e.results.forEach(function(e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: function(e) {
      let t = e.detailsUrl;
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(t) {
          (e.imageUrlFront = t.sprites.front_default),
            (e.imageUrlBack = t.sprites.back_default),
            (e.height = t.height),
            (e.weight = t.weight),
            (e.types = []);
          for (var n = 0; n < t.types.length; n++)
            e.types.push(' ' + t.types[n].type.name);
          for (e.abilities = [], n = 0; n < t.abilities.length; n++)
            e.abilities.push(' ' + t.abilities[n].ability.name);
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  };
})();
function searchFunction() {
  let e, t, n, o, i, r, l;
  for (
    t = (e = document.querySelector('.searchbar')).value.toUpperCase(),
      o = (n = document.querySelector('.list-group')).getElementsByTagName(
        'li'
      ),
      r = 0;
    r < o.length;
    r++
  )
    (l =
      (i = o[r].getElementsByTagName('button')[0]).textContent || i.innerText)
      .toUpperCase()
      .indexOf(t) > -1
      ? (o[r].style.display = '')
      : (o[r].style.display = 'none');
}
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
