/**
   * Separates songs from DB into respective decades
   * 
   * @param {Array} data | data to separate
   * @returns {Object} | object of arrays for each decade
   */
function separateSongsToDecades(data) {
  //result = final result  //current = current iterator
  const decades = data.reduce((result, song) => {
    // gets release year
    const releaseYear = new Date(song.release_date).getFullYear();
    // calculates decade for the song
    const decade = Math.floor(releaseYear / 10) * 10;

    // if decade property exists in result
    if(!result[decade]) {
      // create empty array for that decade
      result[decade] = [];
    }

    // add current song to respective decade
    result[decade].push(song);

    return result;
  // start with empty object literal
  }, {});

  return decades;
}

/**
 * Gets unique genres
 * 
 * @returns {Array} | array of unique genres
 */
function separateGenres(songs) {
  const genres = new Set();
  songs.forEach(song => {
    genres.add(song.Genre);
  });
  return Array.from(genres);
}

// hardcoded decades
const decades = [
  '1950',
  '1960',
  '1970',
  '1980',
  '1990',
  '2000',
  '2010',
  '2020',
];

//hardcoded genre colors
const palette = [
  '#F94B4B',
  '#C81BCE',
  '#3B47EC',
  '#3BCFEC',
  '#177540',
  '#ADB909',
  '#B96109',
  '#000000'
];

export {
  separateSongsToDecades,
  separateGenres,
  decades,
  palette
};