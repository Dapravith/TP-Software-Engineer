import PropTypes from 'prop-types';
import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';

function InfoCard({ title, value, icon, color }) {
  return (
    <div className="info-card" style={{ backgroundColor: color }}>
      <i className={icon}></i>
      <div className="info-content">
        <h2 className="info-title">{title}</h2>
        <p className="info-value">{value}</p>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default InfoCard;
