import Graph from './Graph';
import NavBar from './Navbar';
import { useState, useEffect } from 'react';

export default function Main() {

  //Search params passed to NavBar component
  //Use to update TopMusic and Graph components
  const [genre, setGenre] = useState('AllGenres');
  const [year, setYear] = useState('AllYears');

  const [songs, setSongs] = useState([]);

  const handleSearch = (genre, year) => {
    setGenre(genre);
    setYear(year);
  };

  async function fetchSongs() {
    const response = await fetch('/songs');
    if(!response.ok) {
      throw new Error('Error occurred fetching songs');
    }

    const data = await response.json();
    setSongs(data);
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <>
      <NavBar handler={handleSearch}/>  
      <Graph 
        songs={songs}
        genre={genre}
      />
    </>
  );

}