import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../styling/Graph.css';

export default function Graph({ songs }) {

  /**
   * Separates songs from DB into respective decades
   * 
   * @param {Array} data | data to separate
   * @returns {Object} | object of arrays for each decade
   */
  function separateSongsToDecades(data) {
    //result = final result  //current = current iterator
    const decades = data.reduce((result, song) => {
      // gets release year
      const releaseYear = new Date(song.release_date).getFullYear();
      // calculates decade for the song
      const decade = Math.floor(releaseYear / 10) * 10;

      // if decade property exists in result
      if(!result[decade]) {
        // create empty array for that decade
        result[decade] = [];
      }

      // add current song to respective decade
      result[decade].push(song);

      return result;
    // start with empty object literal
    }, {});

    return decades;
  }
  
  /**
   * Gets unique genres
   * 
   * @returns {Array} | array of unique genres
   */
  function separateGenres() {
    const genres = new Set();
    songs.forEach(song => {
      genres.add(song.Genre);
    });
    return Array.from(genres);
  }

  // hardcoded decades
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

  let dataset = [];

  if(songs.length !== 0) {
    // get unique genres
    const genres = separateGenres();

    dataset = genres.map(genre => {
      return {
        // set label to genre
        label: genre.charAt(0).toUpperCase() + genre.slice(1),
        // map each decade
        data: decades.map(decade => {
          // get songs from current decade
          const songsInDecade = separateSongsToDecades(songs)[decade];
          // get all songs from current genre and decade
          const songsInDecadeAndGenre = songsInDecade.filter(song => song.Genre === genre);
          // calculate total popularity of each song from current genre and decade
          const totalPopularity = songsInDecadeAndGenre.reduce((sum, song) => {
            return sum + song.popularity;
          }, 0);
          // calculate average popularity from songs
          const averagePopularity = totalPopularity / songsInDecadeAndGenre.length;
          // return average popularity
          return averagePopularity;
        })
      };
    });
  }

  /**
   * Function to either display graph or loading message
   * 
   * @returns {JSX} | JSX of line or 'Loading...'
   */
  function showChart() {
    if(songs.length === 0) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <h1>Spotify Statistics</h1>
        <Line 
          data={{
            labels: decades.map(decade => decade + 's'),
            datasets: dataset
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
                  text: 'Popularity %'
                },
                ticks: {
                  suggestedMin: 40,
                  suggestedMax: 100
                }
              }
            }
          }}
        />
      </>
    );
  }

  return (
    <div id="line-graph">
      {showChart()}
    </div>
  );

}