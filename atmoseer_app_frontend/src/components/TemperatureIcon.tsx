import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTemperatureHalf, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

const TemperatureIcon = ({ temperature, className }) => {
  let temperatureIcon, temperatureColor;

  if (temperature < 20) {
    temperatureIcon = faTemperatureLow;
    temperatureColor = "text-blue-800";
  } else if (temperature >= 20 && temperature <= 30) {
    temperatureIcon = faTemperatureHalf;
    temperatureColor = "text-orange-500";
  } else {
    temperatureIcon = faTemperatureHigh;
    temperatureColor = "text-red-600";
  }

  if (!temperature) {
    temperatureIcon = faTemperatureHigh; 
    temperatureColor = "text-gray-400";
  }

  return (
    <FontAwesomeIcon icon={temperatureIcon} className={`${temperatureColor} ${className}`} data-test='temperatura-icon' />
  );
};

export default TemperatureIcon;
