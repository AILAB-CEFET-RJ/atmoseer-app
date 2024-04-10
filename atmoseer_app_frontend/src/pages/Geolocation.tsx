import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForecastData } from '../hooks/useForecastData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons';
import WeatherIcon from '../components/WeatherIcon';
import '../styles/geolocation.css';

const GeolocationExample: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
   //const [forecastResult, setForecastResult] = useState<number>(0);
  const [placeName, setPlaceName] = useState<string>('');
  const [forecastMessage, setForecastMessage] = useState<string>('Previsão não disponível');

  const { data: forecastData, isLoading, error } = useForecastData(latitude, longitude);

  

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (latitude >= -23.4318 && latitude <= -20.7773 && longitude >= -44.7426 && longitude <= -40.7492) {
            setLatitude(latitude);
            setLongitude(longitude);
          } else {
            console.error('Você está fora do Estado do Rio de Janeiro.');
          }
        },
        (err) => {
          console.error(err.message);
        }
      );
    } else {
      console.error('Geolocation não é suportado por esse navegador.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  //const manualForecastResult = 4;
  useEffect(() => {
    if (forecastData) {
      setPlaceName(forecastData.name); 
      const messageParts = forecastData.message.split(':');
      if (messageParts.length > 1) {
        setForecastMessage(`Resultado da predição: ${messageParts[1].trim()}`);
        //setForecastMessage(`Resultado da predição: ${manualForecastResult}`);
      } else {
        setForecastMessage('Previsão não disponível');
      }
    }
  }, [forecastData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container-wrapper">
      <div id="container">
        <div className='all_infos'>
          <div className="info">
            <FontAwesomeIcon icon={faGlobe} id="latitude_icon" />
            <div>
              <h2>Latitude</h2>
              <p id="latitude">{latitude}</p>
            </div>
          </div>
          <div className="info">
            <FontAwesomeIcon icon={faGlobe} id="longitude_icon"/>
            <div>
              <h2>Longitude</h2>
              <p id="longitude">{longitude}</p>
            </div>
          </div>
          <div className="info">
            <WeatherIcon forecastMessage={forecastMessage} />
            <div>
              <h2>Previsão do Tempo</h2>
              <p>{forecastMessage}</p>
            </div>
          </div>
          <div className="info">
          <FontAwesomeIcon icon={faMapMarkerAlt} id="local_icon" />
            <div>
            <h2>Nome do lugar</h2>
              <p>{placeName}</p>
            </div>
          </div>
        </div>
        <Link to="/home" className="back-button">Voltar</Link>      
      </div>
    </div>
  );
};

export default GeolocationExample;
