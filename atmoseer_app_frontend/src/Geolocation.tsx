import React, { useState, useEffect } from 'react';

const GeolocationExample: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Limitando apenas para o estado do Rio de Janeiro
            if (latitude >= -23.4318 && latitude <= -20.7773 && longitude >= -44.7426 && longitude <= -40.7492) {
              setLatitude(latitude);
              setLongitude(longitude);
              setError(null);

              // Fazendo a requisição para a rota de previsão com os parâmetros de latitude e longitude
              fetch(`http://127.0.0.1:3333/forecast/?latitude=${latitude}&longitude=${longitude}`)
                .then(response => response.json())
                .then(data => setForecast(data.message)) // Extraindo a mensagem da resposta e definindo no estado
                .catch(error => console.error('Error fetching forecast:', error));
            } else {
              setError('Você está fora do Estado do Rio de Janeiro.');
            }
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();

  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {latitude && longitude && (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
      {forecast && <p>Forecast: {forecast}</p>}
    </div>
  );
};

export default GeolocationExample;
