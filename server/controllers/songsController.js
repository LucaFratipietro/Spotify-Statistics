import {DB} from '../db/db.js';
const db = new DB();

//  fetch all the songs from the DB
//  query params allows to specify from a genre

export async function year(req, res) {
  try{
    const songs = await db.getAllSongs();
    res.json(songs);
  } catch (e) {
    console.error(e.message);
    //send status sends the string representation of the status code as the body
    res.sendStatus(500).end();
  }
}