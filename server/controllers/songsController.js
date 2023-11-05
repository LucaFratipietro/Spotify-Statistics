const { DB } = require('../db/db.js');
// const { extractYear } = require('../utils/utils');
const db = new DB();

/**
 * Makes a call to the DB object for all songs from the DB
 *
 * @param {string} Year - Optional querey
 * @returns {JSON} - returns all songs from the DB, if year is specified, only from that year
 */
async function allSongs(req, res) {
  try{
    let allSongs = await db.getAllSongs();
    
    if(!Array.isArray(allSongs)){
      allSongs = await allSongs.toArray();
    }
    
    //check if query param for year was passed, if so, filter results by year
    if(req.query.year){
      allSongs = allSongs.filter((song) => {
        return song.release_date.includes(req.query.year);
      });
    }

    if(allSongs.length === 0){
      res.type('json');
      const message = 'Did not return any results. Try another year in the query parameter';
      res.status(404).json({error: message});
      return;
    }

    res.type('json');
    res.json(allSongs);
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
  try{
    let songsByGenre = await db.getAllSongs(req.params.genre);
    
    if(!Array.isArray(songsByGenre)){
      songsByGenre = await songsByGenre.toArray();
    }
    
    //check if query param for year was passed, if so, filter results by year
    if(req.query.year){
      songsByGenre = songsByGenre.filter((song) => {
        return song.release_date.includes(req.query.year);
      });
    }

    if(songsByGenre.length === 0){
      res.type('json');
      res.status(404).json({error: `Genre ${req.params.genre} 
      did not return any results. Try another genre`});
      return;
    }

    res.type('json');
    res.json(songsByGenre);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).json({error: e.message});
  }
  // }
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
  allYears
};
