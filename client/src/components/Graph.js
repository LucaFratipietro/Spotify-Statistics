import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../styling/Graph.css';
import * as utils from '../utils/graphUtils';

export default function Graph({ songs }) {

  let dataset = [];

  if(songs.length !== 0) {
    // get unique genres
    const genres = utils.separateGenres(songs);

    dataset = genres.map(genre => {
      return {
        // set label to genre
        label: genre.charAt(0).toUpperCase() + genre.slice(1),
        // map each decade
        data: utils.decades.map(decade => {
          // get songs from current decade
          const songsInDecade = utils.separateSongsToDecades(songs)[decade];
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
            labels: utils.decades.map(decade => decade + 's'),
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