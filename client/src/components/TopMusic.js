import { useEffect } from 'react';
import '../styling/TopMusic.css';
import * as utils from '../utils/displayUtils';

export default function TopMusic({songs, genre, decade}){

  let filteredSongs = songs;

  //check if genre and decade are set to filterable params
  //if set to AllGenres, dont run the filter
  if(genre !== 'AllGenres'){

    filteredSongs = songs.filter((song) => {
      return song.Genre.includes(genre);
    });

  }

  if(decade !== 'AllYears'){

    const minYear = parseInt(decade);
    const maxYear = minYear + 9;

    filteredSongs = filteredSongs.filter((song) => {
      const releaseYear = new Date(song.release_date).getFullYear();
      return releaseYear >= minYear && releaseYear <= maxYear; 
    });

  }

  //sort array by most popular songs -- and get the top 20
  filteredSongs = filteredSongs.sort((a, b) => a.popularity < b.popularity ? 1 
    : b.popularity < a.popularity ? -1 : 0);
  const slicedSongs = filteredSongs.slice(0, 20);

  if(slicedSongs.length === 0){
    return(
      <section id="bottom-section">
        <h1>You're a little ahead of the times here</h1>
      </section>
    );
  }

  const listSongs = slicedSongs.map((song, index) =>
    <MusicSquare song={song} rank = {index + 1}/>
  );

  return(
    <section id="bottom-section">
      <h1>Top {utils.genreToPrint(genre)} Hits {utils.decadeToPrint(decade)}</h1>
      <div id="top-songs">
        {listSongs}
      </div>
    </section>
  );

}

function MusicSquare({song, rank}){

  return(
    <div className="music-square">
      <p>Rank: {rank}</p>
      <p>Title: {song.Title}</p>
      <p>By: {song.Artist}</p>
      <p>Release: {song.release_date}</p>
      <img src={song.Album_cover_link} alt={song.Title} loading="lazy"/>
    </div>
  );

}