import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy, faCloudRain, faBolt } from '@fortawesome/free-solid-svg-icons';

const WeatherIcon: React.FC<{ forecastMessage: string }> = ({ forecastMessage }) => {
  // Função para determinar qual ícone mostrar com base na mensagem de previsão
  const getIconForForecast = (message: string) => {
    if (message.includes('0')) {
      return <FontAwesomeIcon icon={faSun} className="text-2xl ml-2 text-yellow-600" />;
    } else if (message.includes('1')) {
      return <FontAwesomeIcon icon={faCloud} className="text-2xl ml-2 text-gray-400" />;
    } else if (message.includes('2')) {
      return <FontAwesomeIcon icon={faCloudRain} className="text-2xl ml-2 text-blue-500" />;
    } else if (message.includes('3')) {
      return <FontAwesomeIcon icon={faCloudShowersHeavy} className="text-2xl ml-2 text-gray-700" />;
    } else if (message.includes('4')) {
      return <FontAwesomeIcon icon={faBolt} className="text-2xl ml-2 text-yellow-300" />;
    } else {
      // Caso nenhum dos valores previstos seja encontrado na mensagem, retornar um ícone padrão
      return <FontAwesomeIcon icon={faSun} className="weather-icon sun" />;
    }
  };

  return (
    <div>
      {getIconForForecast(forecastMessage)}
    </div>
  );
};

export default WeatherIcon;
