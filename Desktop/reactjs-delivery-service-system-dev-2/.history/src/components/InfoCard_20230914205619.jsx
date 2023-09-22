import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';

const InfoCard = ({ title, value, icon, color }) => {
  const cardStyle = {
    backgroundColor: color,
  };

  return (
    <div className="info-card" style={cardStyle}>
       <InfoCard title="Total Branch Owner" value={10} icon="fa fa-user" color="#3498db" />
      <InfoCard title="Items" value={150} icon="fa fa-shopping-bag" color="#e74c3c" />
      <InfoCard title="Incoming Items" value={30} icon="fa fa-arrow-down" color="#2ecc71" />
      <InfoCard title="Pending Items" value={5} icon="fa fa-clock" color="#f1c40f" />
      <InfoCard title="Delivered Items" value={115} icon="fa fa-truck" color="#9b59b6" />
      <InfoCard title="Total Profits" value={240} icon="fa fa-money" color="#27ae60" />
    </div>
    </div>
  );
};

export default InfoCard;
