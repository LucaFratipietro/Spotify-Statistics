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
  (function generateDataset() {
    if(songs.length !== 0) {
      if(genre !== 'AllGenres') {
        dataset = [
          {
            label: genre.charAt(0).toUpperCase() + genre.slice(1),
            data: utils.generateAveragePopularity(songs, genre),
            borderColor: utils.palette[2]
          }
        ];
      } else {
        const genres = utils.separateGenres(songs);
  
        dataset = genres.map((genre, index) => {
          return {
            label: genre.charAt(0).toUpperCase() + genre.slice(1),
            data: utils.generateAveragePopularity(songs, genre),
            borderColor: utils.palette[index]
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
            },
            plugins: {
              legend: {
                // does nothing on purpose
                onClick: (e, lineField) => { }
              },
              tooltip: {
                callbacks: {
                  label: tooltipItem => {
                    
                  }
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