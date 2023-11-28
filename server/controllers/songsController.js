const { DB } = require('../db/db.js');
const cache = require('memory-cache');
const db = new DB();

/**
 * Makes a call to the DB object for all songs from the DB
 *
 * @param {string} Year - Optional querey
 * @returns {JSON} - returns all songs from the DB, if year is specified, only from that year
 */
async function allSongs(req, res) {
  try {
    let allSongs = cache.get('allSongs');

    if(!allSongs) {
      allSongs = await db.getAllSongs();
    }
    
    if(!Array.isArray(allSongs)){
      allSongs = await allSongs.toArray();
      cache.put('allSongs', allSongs);
    }
    
    //check if query param for year was passed, if so, filter results by year
    if(req.query.year){
      let allSongsByYear = cache.get(`allSongs-${req.query.year}`);
      if(!allSongsByYear) {
        allSongsByYear = allSongs.filter((song) => {
          return song.release_date.includes(req.query.year);
        });
        allSongs = allSongsByYear;
        cache.put(`allSongs-${req.query.year}`, allSongs);
      }
    }

    // get unique songs
    const uniqueSongs = Array.from(new Set(allSongs.map(song => song.Title))).
      map(title => allSongs.find(song => song.Title === title)).
      flat();

    if(uniqueSongs.length === 0) {
      res.type('json');
      const message = 'Did not return any results. Try another year in the query parameter';
      res.status(404).json({error: message});
      return;
    }

    res.type('json');
    res.json(uniqueSongs);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).json({error: e.message});
  }
}

/**
 * Makes a call to the DB object for all songs from the DB by genre
 * @param {string} Genre - Required enpoint param
 * @param {string} Year - Optional query param
 * @returns {JSON} - returns all songs from the DB of a specific genre
 */

async function allSongsByGenre(req, res){
  
  try {
    let songsByGenre = cache.get(`songsByGenre-${req.params.genre}`);
    if(!songsByGenre) {
      songsByGenre = await db.getAllSongsOfGenre(req.params.genre);
    }
    
    if(!Array.isArray(songsByGenre)){
      songsByGenre = await songsByGenre.toArray();
      cache.put(`songsByGenre-${req.params.genre}`, songsByGenre);
    }
    
    //check if query param for year was passed, if so, filter results by year
    if(req.query.year){
      // eslint-disable-next-line max-len
      const songsByGenreYearFilter = cache.get(`songsByGenre-${req.params.genre}-${req.query.year}`);
      if(songsByGenreYearFilter) {
        songsByGenre = songsByGenreYearFilter;
      }
      songsByGenre = songsByGenre.filter((song) => {
        return song.release_date.includes(req.query.year);
      });
      cache.put(`songsByGenre-${req.params.genre}-${req.query.year}`, songsByGenre); 
    }
    
    // get unique songs
    const uniqueSongs = Array.from(new Set(songsByGenre.map(song => song.Title))).
      map(title => songsByGenre.find(song => song.Title === title)).
      flat();

    if(uniqueSongs.length === 0){
      // eslint-disable-next-line max-len
      res.status(404).json({error: `Genre ${req.params.genre} did not return any results. Try another genre`});
      return;
    }

    res.type('json');
    res.json(uniqueSongs);
  } catch (e) {
    res.sendStatus(500).json({error: e.message});
  }
  // }
}

/**
 * Makes a call to the DB object for the most popular songs of a decade/genre
 * @param {string} genre - Required enpoint param
 * @param {string} year - optional query param
 * @returns {JSON} - returns all songs from the DB of a specific genre
 */

async function mostPopularSongs(req, res){

  let chosenDecade = req.query.year;

  if(req.query.year === undefined){
    chosenDecade = ''; 
  }

  try{
    let mostPopularSongs = cache.get(`mostPopular-${req.params.genre}-${chosenDecade}`);
    if(!mostPopularSongs) {
      mostPopularSongs = await db.getMostPopular(req.params.genre, chosenDecade);
    }
    
    if(!Array.isArray(mostPopularSongs)){
      mostPopularSongs = await mostPopularSongs.toArray();
      cache.put(`mostPopular-${req.params.genre}-${chosenDecade}`, mostPopularSongs);
    }

    // get unique songs
    const uniqueSongs = Array.from(new Set(mostPopularSongs.map(song => song.Title))).
      map(title => mostPopularSongs.find(song => song.Title === title)).
      flat().
      slice(0, 50);
    
    res.type('json');
    res.json(uniqueSongs);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).json({error: e.message});
  }

}

module.exports = {
  allSongs,
  allSongsByGenre,
  mostPopularSongs
};
