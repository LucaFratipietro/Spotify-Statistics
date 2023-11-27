const { DB } = require('../db/db.js');
const cache = require('memory-cache');
// const { extractYear } = require('../utils/utils');
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
    const uniqueSongs = Array.from(new Set(allSongs.map(song => song.id))).
      map(id => allSongs.filter(song => song.id === id)).
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
  // if(req.params.genre.toLowerCase().trim() === 'years') {
  //   allYears(req, res);
  // } else {
  try {
    let songsByGenre = cache.get('songsByGenre');
    if(!songsByGenre) {
      songsByGenre = await db.getAllSongs(req.params.genre);
    }
    
    if(!Array.isArray(songsByGenre)){
      songsByGenre = await songsByGenre.toArray();
      cache.put('songsByGenre', songsByGenre);
    }
    
    //check if query param for year was passed, if so, filter results by year
    if(req.query.year){
      
      songsByGenre = cache.get(`songsByGenre-${req.query.year}`);
      if(!songsByGenre) {
        songsByGenre = songsByGenre.filter((song) => {
          return song.release_date.includes(req.query.year);
        });
        cache.put(`songsByGenre-${req.query.year}`, songsByGenre); 
      }
    }

    // get unique songs
    const uniqueSongs = Array.from(new Set(songsByGenre.map(song => song.id))).
      map(id => songsByGenre.filter(song => song.id === id)).
      flat();

    if(uniqueSongs.length === 0){
      res.type('json');
      res.status(404).json({error: `Genre ${req.params.genre} 
      did not return any results. Try another genre`});
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
    // let mostPopularSongs = await db.getMostPopular(req.params.genre, chosenDecade);
    if(!mostPopularSongs) {
      mostPopularSongs = await db.getMostPopular(req.params.genre, chosenDecade);
    }
    
    if(!Array.isArray(mostPopularSongs)){
      mostPopularSongs = await mostPopularSongs.toArray();
      cache.put(`mostPopular-${req.params.genre}-${chosenDecade}`, mostPopularSongs);
    }

    // get unique songs
    const uniqueSongs = Array.from(new Set(mostPopularSongs.map(song => song.id))).
      map(id => mostPopularSongs.filter(song => song.id === id)).
      flat();
    
    res.type('json');
    res.json(uniqueSongs);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).json({error: e.message});
  }

}

/**
 * Makes a call to the DB object for all years from the DB
 * @returns {JSON} - returns all years from the DB for each song
 */
// async function allYears(req, res) {
//   try {
//     let dates = await db.getAllYears();
//     dates = await dates.toArray();
//     const years = dates.map(date => {
//       return extractYear(date);
//     });
//     const uniqueYears = Array.from(new Set(years));
//     res.status(200).json({years: uniqueYears.sort()});
//   } catch (e) {
//     console.error(e.message);
//     res.sendStatus(404).json({error: e.message});
//   }
// }

/*async function topSongsByYear(req, res){
  //STUB: NOT IMPLEMENTED
}*/

module.exports = {
  allSongs,
  allSongsByGenre,
  mostPopularSongs
};
