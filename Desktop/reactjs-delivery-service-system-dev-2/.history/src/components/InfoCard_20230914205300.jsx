import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';

const InfoCard = ({ title, value, icon, color }) => {
  const cardStyle = {
    backgroundColor: color,
  };

  return (
    <div className="info-card" style={cardStyle}>
      <div className="info-icon">
        <i className={icon}></i>
      </div>
      <div className="info-content">
        <h3 className="info-title">{title}</h3>
        <p className="info-value">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
