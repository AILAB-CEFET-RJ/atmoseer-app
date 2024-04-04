import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForecastData } from '../hooks/useForecastData';

const GeolocationExample: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Usando o hook useForecastData para obter os dados da previsão com base na latitude e longitude
  const { data: forecastData, isLoading, error } = useForecastData(latitude, longitude);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Limitando apenas para o estado do Rio de Janeiro
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
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      {/* Acessando os dados da previsão, se disponíveis */}
      <p>Forecast: {forecastData ? forecastData.message : 'No forecast data available'}</p>
      <Link to="/home">Voltar</Link>
    </div>
  );
};

export default GeolocationExample;
