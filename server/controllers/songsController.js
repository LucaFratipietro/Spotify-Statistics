import {DB} from '../db/db.js';
const db = new DB();

//  fetch all the songs from the DB
export async function allSongs(req, res) {
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

export async function allSongsByGenre(req, res){

  try{
    let songsByGenre = await db.getAllSongs(req.params.genre);
    songsByGenre = await songsByGenre.toArray();
    
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
}

/*export async function topSongsByYear(req, res){
  //STUB: NOT IMPLEMENTED
}*/


