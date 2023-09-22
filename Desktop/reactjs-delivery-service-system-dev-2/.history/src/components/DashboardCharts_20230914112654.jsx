$primary-color: #6283ec;
$secondary-color: #e74c3c;
$tertiary-color: #f39c12;
$quaternary-color: #27ae60;

body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}

.dashboard {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

.info-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.info-card {
  flex: 1;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease-in-out;
  margin: 15px;
  width: calc(25% - 20px);
}

.info-card:nth-child(1) {
  background-color: $primary-color;
  color: white;
}

.info-card:nth-child(2) {
  background-color: $secondary-color;
  color: white;
}

.info-card:nth-child(3) {
  background-color: $tertiary-color;
  color: white;
}

.info-card:nth-child(4) {
  background-color: $quaternary-color;
  color: white;
}

.info-card:hover {
  background-color: #f0f0f0;
}

.info-card h3 {
  margin: 10px 0;
}

.info-card p {
  font-size: 1.5em;
  font-weight: bold;
}

.info-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.info-value {
  font-size: 24px;
  font-weight: bold;
}

.dashboard-chart {
  background-color: #f0f0f0;
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
}

.bar-chart,
.pie-chart {
  flex: 1;
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  h3 {
    font-size: 15px;
    margin-bottom: 10px;
    color: #333;
  }
}

// Customize the background and border colors for each chart
.bar-chart {
  background-color: #f9f9f9;
  border-color: #ddd;
}

.pie-chart {
  background-color: #f5f5f5;
  border-color: #ccc;
}

// Additional styling for center-aligned smaller pie chart
.center-aligned.smaller-pie-chart {
  width: 50%; // Adjust the width as needed
  margin: 0 auto; // Center-align horizontally
}
