import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCube,
  faTruck,
  faClock,
  faCheck,
  faMoney,
} from '@fortawesome/free-solid-svg-icons';

const infoData = [
  {
    title: 'Total Branch Owners',
    value: 100,
    icon: faUsers,
  },
  {
    title: 'Total Products',
    value: 500,
    icon: faCube,
  },
  {
    title: 'Total Incoming Items',
    value: 200,
    icon: faTruck,
  },
  {
    title: 'Total Pending Products',
    value: 20,
    icon: faClock,
  },
  {
    title: 'Total Delivered Products',
    value: 450,
    icon: faCheck,
  },
  {
    title: 'Total Profits',
    value: 240,
    icon: faMoney,
  },
];

const InfoCard = () => {
  return (
    <div className="info-card">
      {infoData.map((item, index) => (
        <div className="info-item" key={index}>
          <FontAwesomeIcon icon={item.icon} />
          <h3>{item.title}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
