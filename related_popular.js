const allArtists = [
  {id: 'u78q0i', name: 'Earl Sweatshirt', popularity: 61, relatedTo: ['82jkdj', '0ka74j']},
  {id: '82jkdj', name: 'RZA', popularity: 67, relatedTo: ['u78q0i']},
  {id: '8jasd8', name: 'Miles Davis', popularity: 50, relatedTo: ['84ja0j']},
  {id: '84ja0j', name: 'John Coltrane', popularity: 49, relatedTo: ['8jasd8']},
  {id: '0ka74j', name: 'Tyler, the Creator', popularity: 76, relatedTo: ['u78q0i']},
  {id: 'ka9gj1', name: 'LNG/SHT', popularity: 32, relatedTo: []},
];

/*
 * Dada una lista de artistas, escribir una función que reciba:
 * - el nombre de un artista (string)
 * - una popularidad mínima (number)
 *
 * Y devuelva una lista de artistas relacionados a ese artista que tengan al
 * menos esa popularidad.
 *
 * Con esto se puede evaluar:
 *   - Programación funcional (higher-order functions).
 *   - Uso de APIs (Array.{find, filter, map, etc}).
 *   - Conocimiento de ES6 features (arrow functions, destructuring, etc).
 */
const relatedPopularArtists = (artistName, minimumPopularity) => {
  const artist = allArtists.find(({name}) => name === artistName)
  return artist
    ? allArtists
        .filter(({relatedTo}) => relatedTo.includes(artist.id))
        .filter(({popularity}) => minimumPopularity < popularity)
        .map(({name, popularity}) => ({name, popularity}))
    : [];
};
