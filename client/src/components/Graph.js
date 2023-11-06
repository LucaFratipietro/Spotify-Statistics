// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../styling/Graph.css';
import * as utils from '../utils/graphUtils';

export default function Graph({ songs, genre }) {

  let dataset = [];

  /**
   * Generates dataset for each data in the chart for songs.
   * Uses unique genres to create a label
   * Maps each decade to include the average popularity for each song
   * in that genre.
   */

  // TODO: Fix bug to not change color when showing all genres again
  (function generateDataset() {
    if(songs.length !== 0) {
      if(genre !== 'AllGenres') {
        dataset = [
          {
            label: genre.charAt(0).toUpperCase() + genre.slice(1),
            data: utils.decades.map(decade => {
              const songsInDecade = utils.separateSongsToDecades(songs)[decade];
              const songsInDecadeAndGenre = songsInDecade.filter(song => song.Genre === genre);
              const totalPopularity = songsInDecadeAndGenre.reduce((sum, song) => {
                return sum + song.popularity;
              }, 0);
              const averagePopularity = totalPopularity / songsInDecadeAndGenre.length;
              return averagePopularity;
            })
          }
        ];
      } else {
        const genres = utils.separateGenres(songs);
  
        dataset = genres.map(genre => {
          return {
            label: genre.charAt(0).toUpperCase() + genre.slice(1),
            data: utils.decades.map(decade => {
              const songsInDecade = utils.separateSongsToDecades(songs)[decade];
              const songsInDecadeAndGenre = songsInDecade.filter(song => song.Genre === genre);
              const totalPopularity = songsInDecadeAndGenre.reduce((sum, song) => {
                return sum + song.popularity;
              }, 0);
              const averagePopularity = totalPopularity / songsInDecadeAndGenre.length;
              return averagePopularity;
            })
          };
        });
      }
    }
  })();

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