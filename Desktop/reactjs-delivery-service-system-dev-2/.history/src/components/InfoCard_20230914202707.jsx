import { faCheckCircle, faClock, faCubes, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';

const InfoCards = () => {
  // Sample data for info cards
  const cards = [
    { title: 'Total Branch Owners', value: 500, icon: faStore },
    { title: 'Total Products', value: 400, icon: faCubes },
    { title: 'Total Incoming Items', value: 200, icon: faTrunk},
    { title: 'Total Pending Products', value: 20, icon: faClock },
    { title: 'Total Delivered Products', value: 450, icon: faCheckCircle },
    {title: 'Total Profits', value: 240, icon: faMoney}
  ];

  return (
    <div className="info-cards">
      {cards.map((card, index) => (
        <div className="info-card" key={index}>
          <div className="info-card-icon" style={{ color: 'white' }}>
            <FontAwesomeIcon icon={card.icon} size="xl" />
          </div>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
