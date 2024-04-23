import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy, faCloudRain, faThunderstorm, faBolt } from '@fortawesome/free-solid-svg-icons';

interface WeatherIconProps {
  forecastMessage: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ forecastMessage }) => {
  let icon = null;

  switch (forecastMessage.toLowerCase()) {
    case 'chuva':
      icon = <FontAwesomeIcon icon={faCloudRain} className="text-blue-400 text-2xl ml-2 text-center" />;
      break;
    case 'chuva forte':
      icon = <FontAwesomeIcon icon={faCloudShowersHeavy} className="text-blue-600 text-2xl ml-2 text-center" />;
      break;
    case 'chuva muito forte':
      icon = <FontAwesomeIcon icon={faCloudRain} className="text-gray-800 text-2xl ml-2" />;
      break;
    case 'tempestade':
      icon = <FontAwesomeIcon icon={faThunderstorm} className="text-blue-800 text-2xl ml-2" />;
      break;
    case 'sem chuva':
      icon = <FontAwesomeIcon icon={faSun} className="text-yellow-400 text-2xl ml-2" />;
      break;
    default:
      icon = <FontAwesomeIcon icon={faSun} className="text-yellow-400 text-2xl ml-2" />;
      break;
  }

  return icon;
};

export default WeatherIcon;
