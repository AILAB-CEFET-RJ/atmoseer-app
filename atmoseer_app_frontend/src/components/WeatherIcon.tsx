import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy, faCloudRain, faBolt } from '@fortawesome/free-solid-svg-icons';
import './weatherIcon.css'; // Importe o arquivo CSS onde os estilos dos ícones estão definidos

const WeatherIcon: React.FC<{ forecastMessage: string }> = ({ forecastMessage }) => {
  // Função para determinar qual ícone mostrar com base na mensagem de previsão
  const getIconForForecast = (message: string) => {
    if (message.includes('0')) {
      return <FontAwesomeIcon icon={faSun} className="weather-icon sun" />;
    } else if (message.includes('1')) {
      return <FontAwesomeIcon icon={faCloud} className="weather-icon cloud" />;
    } else if (message.includes('2')) {
      return <FontAwesomeIcon icon={faCloudRain} className="weather-icon cloud-rain" />;
    } else if (message.includes('3')) {
      return <FontAwesomeIcon icon={faCloudShowersHeavy} className="weather-icon cloud-heavy-rain" />;
    } else if (message.includes('4')) {
      return <FontAwesomeIcon icon={faBolt} className="weather-icon lightning" />;
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
