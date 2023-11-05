import Graph from './Graph';
import NavBar from './Navbar';
import {useState} from 'react';

export default function Main() {

  //Search params passed to NavBar component
  //Use to update TopMusic and Graph components
  const [genre, setGenre] = useState('AllGenres');
  const [year, setYear] = useState('AllYears');

  const handleSearch = (genre, year) => {
    setGenre(genre);
    setYear(year);
  };

  return (
    <>
      <NavBar handler={handleSearch}/>  
      <Graph />
    </>
  );

}