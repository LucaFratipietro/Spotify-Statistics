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
 * Generates an array of average popularity of songs from each decade and genre
 * 
 * @param {Array} songs | array of songs
 * @param {String} genre | genre used to filter songs
 * @returns {Array} average popularity of songs from each decade and genre
 */
function generateAveragePopularity(songs, genre) {
  return decades.map(decade => {
    const songsInDecade = separateSongsToDecades(songs)[decade];
    const songsInDecadeAndGenre = songsInDecade.filter(song => song.Genre === genre);
    const totalPopularity = songsInDecadeAndGenre.reduce((sum, song) => {
      return sum + song.popularity;
    }, 0);
    const averagePopularity = totalPopularity / songsInDecadeAndGenre.length;
    return averagePopularity;
  });
}

/**
 * Generates an array of average tempo of songs for a decade and genre
 * @param {Array} songs | array of songs
 * @param {String} genre | genre used to filter songs
 * @returns {Array} average tempo of songs from each decade and genre
 * 
 */
function generateAverageTempo(songs, genre) {
  return decades.map(decade => {
    const songsInDecade = separateSongsToDecades(songs)[decade];
    const songsInDecadeAndGenre = songsInDecade.filter(song => song.Genre === genre);
    const totalTempo = songsInDecadeAndGenre.reduce((sum, song) => {
      return sum + song.tempo;
    }, 0);
    const averageTempo = totalTempo / songsInDecadeAndGenre.length;
    return averageTempo;
  });
}

/**
 * Returns most popular song from a genre for each decade
 * 
 * @param {Array} songs | songs in which to check popularity
 * @param {String} genre | genre to check
 * @returns {Array} array of most popular songs from each decade at specified genre
 */
function popularSongsByGenre(songs, genre) {
  return decades.map(decade => {
    const songsInDecade = separateSongsToDecades(songs)[decade];
    const songsInDecadeAndGenre = songsInDecade.filter(song => song.Genre === genre);

    let mostPopular = songsInDecadeAndGenre[0];
    for(let i = 0; i < songsInDecadeAndGenre.length; i++) {
      if(songsInDecadeAndGenre[i].popularity > mostPopular.popularity) {
        mostPopular = songsInDecadeAndGenre[i];
      }
    }

    return mostPopular;
  });
}

/**
 * Returns a string containing most popular song's title and genre
 * 
 * @param {TooltipItem} context | context of the tooltip
 * @param {Array} songs | songs to get popularity of
 * @param {String} genre | genre to display most popular song for
 * @returns {String} most popular song title and artist
 */
function showMostPopular(context, songs, genre) {
  if(genre !== 'AllGenres') {
    const mostPopular = popularSongsByGenre(songs, genre);
    if(mostPopular[context.dataIndex]) {
      const songInfo = mostPopular[context.dataIndex];
      return `${songInfo.Title} by ${songInfo.Artist}`;
    }
  }
}

/**
 * Generates footer to display in tooltip modal
 * 
 * @param {String} genre | genre to check
 * @returns {String} context to display in the footer
 */
function generateFooter(genre) {
  if(genre !== 'AllGenres') {
    return 'Most Popular Song';
  }
  return '% Popularity across the decade!';
}

/**
 * Sets label pointer style in the graph when hover over point in graph
 * 
 * @param {String} genre | genre for specified point
 * @param {Array} songs | songs to retrieve popular songs from
 * @param {TooltipItem} context | context of the tooltip
 * @returns {Object} pointer style for tooltip
 */
function setLabelPointerStyle(genre, songs, context) {
  if(genre !== 'AllGenres') {
    const mostPopular = popularSongsByGenre(songs, genre);
    const songInfo = mostPopular[context.dataIndex];
    const cover = new Image(15, 15);
    cover.src = songInfo.Album_cover_link;
    return {
      pointStyle: cover
    };
  }
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
  generateAveragePopularity,
  generateAverageTempo,
  popularSongsByGenre,
  showMostPopular,
  generateFooter,
  setLabelPointerStyle,
  decades,
  palette
};