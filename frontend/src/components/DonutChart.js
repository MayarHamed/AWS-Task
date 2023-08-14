import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function DonutChart ({chartData}) {
  return (
    <div className='container w-75 m-2'>
      <Doughnut data={chartData}/>
    </div>
  );
};

export default DonutChart;
