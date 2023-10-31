import {DB} from '../db/db.js';
const db = new DB();

//  fetch all the songs from the DB
export async function allSongs(req, res) {
  try{
    const songs = await db.getAllSongs();
    const json = await songs.toArray();
    res.type('json');
    res.json(json);
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
      res.status(500).json({error: `Genre ${req.params.genre} 
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
