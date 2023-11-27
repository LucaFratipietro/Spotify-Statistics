import Graph from './Graph';
import NavBar from './Navbar';
import TopMusic from './TopMusic';
import { useState, useEffect } from 'react';

export default function Main() {

  //Search params passed to NavBar component
  //Use to update TopMusic and Graph components
  const [genre, setGenre] = useState('AllGenres');
  const [year, setYear] = useState('AllYears');
  const [theme, setTheme] = useState('light');
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

  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className={`main-container ${theme}`}>
      <NavBar 
        handler={handleSearch}
        theme={theme}
        toggleTheme={toggleTheme}
      /> 
      {songs.length > 0 ?
        <>
          <Graph songs={songs} genre={genre}/>
          <hr></hr>
          <TopMusic songs={songs} genre={genre} decade={year}/>
        </>
        :
        <img id="load" src="./images/load.gif" alt="load"/>
      }
    </div>
  );

}