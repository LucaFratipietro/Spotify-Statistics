import { useEffect } from 'react';
import '../styling/TopMusic.css';

export default function TopMusic({songs, genre, decade}){

  let filteredSongs = songs;

  //check if genre and decade are set to filterable params
  //if set to AllGenres, dont run the filter
  if(genre !== 'AllGenres'){

    filteredSongs = songs.filter((song) => {
      return song.Genre.includes(genre);
    });

  }

  //NOTE: DECADE FILTER HERE

  //sort array by most popular songs -- and get the top 5
  filteredSongs = filteredSongs.sort((a, b) => a.popularity < b.popularity ? 1 
    : b.popularity < a.popularity ? -1 : 0);
  const slicedSongs = filteredSongs.slice(0, 5);

  const listSongs = slicedSongs.map((song) =>
    <MusicSquare song={song} />
  );


  return(
    <section id="bottom-section">
      <h2>
            Top Hits of {genre} from the {decade}
      </h2>
      <div id="topsongs">
        {listSongs}
      </div>
    </section>
  );

}

function MusicSquare({song}){

  return(
    <>
      <p>{song.Title} {song.release_date}</p>
      <img src={song.Album_cover_link} alt={song.Title}/>
    </>
  );

}