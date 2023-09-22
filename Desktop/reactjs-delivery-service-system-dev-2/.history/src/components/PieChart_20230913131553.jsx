
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {
  // Define the data for the pie chart
  const dataPoints = [
    { y: 25, label: 'Category A' },
    { y: 30, label: 'Category B' },
    { y: 45, label: 'Category C' },
  ];

  // Define the options for the pie chart
  const options = {
    animationEnabled: true,
    title: {
      text: 'My Pie Chart',
    },
    data: [
      {
        type: 'pie',
        showInLegend: true,
        toolTipContent: '{label}: <strong>{y}%</strong>',
        indexLabel: '{label} - {y}%',
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieChart;
