// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../styling/Graph.css';
import * as utils from '../utils/graphUtils';
import {useEffect, useState} from 'react';

export default function Graph({ songs, genre, theme }) {

  const [singleGenre, setSingleGenre] = useState(false);
  const [dataset, setDataset] = useState([]);

  //change datasetvalue based on the genre prop
  useEffect(() => {
    /**
     * Generates dataset for each data in the chart for songs.
     * Uses unique genres to create a label
     * Maps each decade to include the average popularity for each song
     * in that genre.
     */
    function generateDataset() {
      if(songs.length !== 0) {
        if(genre !== 'AllGenres') {
          setDataset([
            {
              label: genre.charAt(0).toUpperCase() + genre.slice(1),
              data: utils.generateAveragePopularity(songs, genre),
              borderColor: utils.palette[2],
              yAxisID: 'y1'
            },
            {
              label: 'Average Tempo Overtime',
              data: utils.generateAverageTempo(songs, genre),
              borderColor: utils.palette[7],
              yAxisID: 'y2'
            }
          ]);
          setSingleGenre(true);
        } else {
          const genres = utils.separateGenres(songs);
    
          const allGenresData = genres.map((genre, index) => {
            return {
              label: genre.charAt(0).toUpperCase() + genre.slice(1),
              data: utils.generateAveragePopularity(songs, genre),
              borderColor: utils.palette[index]
            };
          });
          setDataset(allGenresData);
          setSingleGenre(false);
        }
      }
    }
  
    generateDataset();
  }, [songs, genre]);

  const labelColor = () => theme === 'light' ? 'black' : 'white';

  /**
   * Function to either display graph or loading message
   * 
   * @returns {JSX} | JSX of line or 'Loading...'
   */
  function showChart() {
    if(songs.length === 0) {
      return <h1>Loading...</h1>;
    }
    if(singleGenre){
      return (
        <>
          <h1>Spotify Statistics</h1>
          <div className="graph">
            <Line 
              data={{
                labels: utils.decades.map(decade => decade + 's'),
                datasets: dataset
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Decade'
                    }
                  },
                  y1: {
                    type: 'linear',
                    title: {
                      display: true,
                      text: 'Popularity %'
                    },
                    ticks: {
                      suggestedMin: 40,
                      suggestedMax: 100
                    },
                    position: 'left'
                  },
                  y2: {
                    display: singleGenre,
                    type: 'linear',
                    title: {
                      display: true,
                      text: 'Tempo',
                    },
                    position: 'right'
                  }
                },
                plugins: {
                  legend: {
                    // does nothing on purpose
                    onClick: (e, lineField) => { }
                  },
                  tooltip: {
                    usePointStyle: true,
                    callbacks: {
                      // eslint-disable-next-line max-len
                      label: context => `${utils.showMostPopular(context, songs, genre)} -- ${utils.showTempo(context, songs, genre)}`,
                      footer: context => utils.generateFooter(genre),
                      labelPointStyle: context => utils.setLabelPointerStyle(genre, songs, context)
                    }
                  }
                }
              }}
            />
          </div>
        </>
      );
    }else{
      
      return(
        <>
          <h1>Spotify Statistics</h1>
          <div className="graph">
            <Line 
              data={{
                labels: utils.decades.map(decade => decade + 's'),
                datasets: dataset
              }}
              options={{
                maintainAspectRatio: false,
                backgroundColor: 'white',
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Decade',
                      color: labelColor()
                    },
                    ticks: {
                      color: labelColor()
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Popularity %',
                      color: labelColor()
                    },
                    ticks: {
                      suggestedMin: 40,
                      suggestedMax: 100,
                      color: labelColor()
                    }
                  }
                },
                plugins: {
                  legend: {
                  // does nothing on purpose
                    onClick: (e, lineField) => { }
                  },
                  tooltip: {
                    usePointStyle: true,
                    callbacks: {
                      label: context => utils.showMostPopular(context, songs, genre),
                      footer: context => utils.generateFooter(genre),
                      labelPointStyle: context => utils.setLabelPointerStyle(genre, songs, context)
                    }
                  }
                }
              }}
            />
          </div>
        </>

      );
    }
    
  }

  return (
    <div id="line-graph">
      {showChart()}
    </div>
  );

}