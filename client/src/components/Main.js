import Graph from './Graph';
import { useState, useEffect } from 'react';

export default function Main() {

  const [songs, setSongs] = useState([]);

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
      <Graph songs={songs}/>
    </>
  );

}