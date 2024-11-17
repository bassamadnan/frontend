import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StatCard.css';

function StatCard({ number, label, imageUrl }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    switch(label) {
      case 'Areas':
        navigate('/');
        break;
      case 'Domains':
        navigate('/verticals');
        break;
      case 'Sensor Types':
        navigate('/sensor-types');
        break;
      case 'Nodes':
        navigate('/bulk-import');
        break;
      default:
        navigate('/');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleNavigation();
    }
  };

  return (
    <div
      className="stat-card-wrapper"
      onClick={handleNavigation}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="stat-card">
        <img src={imageUrl} alt={label} className="card-image" />
        <div className="number">{number}</div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
}

export default StatCard;