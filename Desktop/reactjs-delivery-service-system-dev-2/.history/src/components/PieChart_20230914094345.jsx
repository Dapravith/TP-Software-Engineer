
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  // Sample data for the pie chart
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ['#FF5733', '#FFD700', '#36A2EB'],
      },
    ],
  };

  // Calculate total percentage
  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
  const percentages = data.datasets[0].data.map((value) => ((value / total) * 100).toFixed(2));

  // Custom tooltip to display percentages on hover
  const customTooltip = (tooltipModel) => {
    const index = tooltipModel.dataPoints[0].index;
    return `${data.labels[index]}: ${percentages[index]}%`;
  };

  // Custom plugin to display total percentage in the center
  const totalPercentagePlugin = {
    beforeDraw: (chart) => {
      const totalPercentage = total.toFixed(2);
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;

      ctx.restore();
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(totalPercentage + '%', width / 2, height / 2);

      ctx.save();
    },
  };

  const options = {
    tooltips: {
      enabled: false,
      custom: customTooltip,
    },
    plugins: {
      totalPercentagePlugin,
    },
  };

  return (
    <div>
      <h2>Pie Chart with Percentage Labels</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
