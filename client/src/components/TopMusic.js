import '../styling/TopMusic.css';
import * as utils from '../utils/displayUtils';
import {useEffect, useState} from 'react';

/**
 * returns an array of MusicSqare components based on the given
 * params
 * @param   {Array[song]} songs Array of all songs fetch by main
 * @param   {string} genre genre to get results from
 * @param   {string} decade decade for fetching results
 * @return  {JSX}  
 */
export default function TopMusic({genre, decade, theme}){

  const [topSongs, setTopSongs] = useState([]);

  //fetch the topSongs based on genre and decade
  useEffect(() => {
    async function getTopSongs(){

      let fetchString = '';
      if(decade === 'AllYears'){
        fetchString = `/songs/popularity/${genre}`;
      }else{
        fetchString = `/songs/popularity/${genre}?year=${decade.slice(0, -1)}`;
      }

      const response = await fetch(fetchString);
      if(!response.ok) {
        throw new Error('Error occured fetching top songs');
      }

      const songs = await response.json();
      setTopSongs(songs);
    }
    getTopSongs();
  }, [genre, decade]);

  /*
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
  const slicedSongs = filteredSongs.slice(0, 50);
  */

  if(topSongs.length === 0){
    return(
      <section id="bottom-section">
        <h1>You're a little ahead of the times here</h1>
      </section>
    );
  }

  const listSongs = topSongs.map((song, index) =>
    <MusicSquare song={song} rank = {index + 1} index = {index}/>
  );

  return(
    <section className={`bottom-section ${theme}`}>
      <h1>Top {utils.genreToPrint(genre)} Hits {utils.decadeToPrint(decade)}</h1>
      <div id="top-songs">
        {listSongs}
      </div>
    </section>
  );

}

/**
 * returns a MusciSquare JSX with a songs rank, title, artist, release and img
 * params
 * @param   {song} song Song object
 * @param   {int} rank Its rank in the listOfSongs
 * @return  {JSX} 
 */

function MusicSquare({song, rank, index}){

  return(
    <div key={song.title} className="music-square">
      <p>Rank: {rank}</p>
      <p>Title: {song.Title}</p>
      <p>By: {song.Artist}</p>
      <p>Release: {song.release_date}</p>
      <img src={song.Album_cover_link} alt={song.Title} loading="lazy"/>
    </div>
  );

}