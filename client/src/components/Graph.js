import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function Graph() {

  return (
    <Line 
      data={{
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      }}
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Popularity'
            }
          }
        }
      }}
    />
  );

}