import { useState } from 'react';
import { useEffect } from 'react';

/**
 * React component to display songs using API
 */
export default function Songs(){


  //useUffect to fetch songs from DB

  const[songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  async function fetchSongs(){

    try{
      const response = await fetch('/songs?year=2002');
      if(response.ok){
        const songs = await response.json();
        setSongs(songs);
      }else {
        alert('Error: Problem fetching songs from API');
      }
    } catch(error){
      alert(error);
    }
  }

  const songsList = songs.map((song, index) => {
    return (
      <div key={index}>
        <p>{song.Title}</p>
        <p>{song.Genre}</p>
        <img src={song.Album_cover_link} alt={song.Title}/>
      </div>
    );
  });

  return(
    <>
      <p>Three Songs fetched from /songs?year=2002 route</p>
      {songsList}
    </>
  );
  

}