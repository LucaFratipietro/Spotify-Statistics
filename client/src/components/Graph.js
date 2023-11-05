import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../styling/Graph.css';
import { useEffect, useState } from 'react';

export default function Graph() {

  const [songs, setSongs] = useState([]);

  async function fetchSongs() {
    const response = await fetch('/songs');
    if(!response.ok) {
      throw new Error('Error occurred fetching songs');
    }

    const data = await response.json();
    setSongs(data);
  }

  function separateSongsToDecades(data) {
    const decades = data.reduce((result, song) => {
      const releaseYear = new Date(song.release_date).getFullYear();
      const decade = Math.floor(releaseYear / 10) * 10;

      if(!result[decade]) {
        result[decade] = [];
      }

      result[decade].push(song);

      return result;
    }, {});

    return decades;
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  const decades = [
    '1950',
    '1960',
    '1970',
    '1980',
    '1990',
    '2000',
    '2010',
    '2020',
  ];

  return (
    <div id="line-graph">
      <h1>Chart</h1>
      <Line 
        data={{
          labels: decades,
          datasets: [
            {
              label: 'Dogs',
              data: [1, 100]
            }
          ]
        }}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Decade'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Popularity',
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }
        }}
      />
    </div>
  );

}