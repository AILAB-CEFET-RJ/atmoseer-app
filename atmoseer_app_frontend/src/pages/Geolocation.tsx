import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForecastData } from '../hooks/useForecastData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons';
import WeatherIcon from '../components/WeatherIcon';

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
    <div className='flex justify-center'>
      <div className="flex justify-flex justify-center items-center min-h-screen w-4/5">
        <div className="flex flex-col items-center bg-[#f0f8ffcc] rounded-2xl px-4 py-2 shadow-md">
          <div className='grid grid-cols-2 mt-2 gap-1'>
            <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-2">
              <FontAwesomeIcon icon={faGlobe} className="text-blue-800 text-2xl ml-2" />
              <div>
                <h2 className='ml-2 mt-1 text-base font-semibold'>Latitude</h2>
                <p className="text-base text-gray-800 m-2">{latitude}</p>
              </div>
            </div>
            <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-2">
              <FontAwesomeIcon icon={faGlobe} className="text-green-800 text-2xl ml-2"/>
              <div>
                <h2 className='ml-2 mt-1 text-base font-semibold'>Longitude</h2>
                <p className='text-base text-gray-800 m-2'>{longitude}</p>
              </div>
            </div>
            <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-2">
              <WeatherIcon forecastMessage={forecastMessage} />
              <div>
                <h2 className='ml-2 mt-1 text-base font-semibold'>Previsão do Tempo</h2>
                <p className="text-base text-gray-800 m-2">{forecastMessage}</p>
              </div>
            </div>
            <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-800 text-2xl ml-2" />
              <div>
              <h2 className='ml-2 mt-1 text-base font-semibold'>Estação</h2>
                <p className="text-base text-gray-800 m-2">Nome estação</p>
              </div>
            </div>
          </div>
          <Link to="/home" className="inline-block px-4 py-2 mt-2 rounded text-white font-bold no-underline bg-blue-500 hover:bg-blue-600 transition-colors">Voltar</Link>      
        </div>
      </div>
    </div>
  );
};

export default GeolocationExample;
