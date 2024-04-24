import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForecastData } from '../hooks/useForecastData';
import { useOpenMeteoData } from '../hooks/useOpenMeteoData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faTint, faWind, faEarthEurope, faMapLocationDot, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import WeatherIcon from '../components/WeatherIcon';
import TemperatureIcon from '../components/TemperatureIcon';
import WindDirection from '../components/WindDirection';
import CloudIcon from '../components/CloudIcon';
import WeatherConditionTranslation from '../components/WeatherConditionTranslation';

const GeolocationExample: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [placeName, setPlaceName] = useState<string>('');
  const [forecastMessage, setForecastMessage] = useState<string>('');
  const { data: forecastData, isLoading: forecastLoading, error: forecastError } = useForecastData(latitude, longitude);
  const { data: openMeteoData, isLoading: openMeteoLoading, error: openMeteoError } = useOpenMeteoData(latitude, longitude);

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

  useEffect(() => {
    if (forecastData && forecastData.atmoseer_result) {
      const { prediction_mapped, station } = forecastData.atmoseer_result;

      const translationMap = {
        "no rain": "Sem chuva",
        "rain": "Chuva",
        "heavy rain": "Chuva forte",
        "very heavy rain": "Chuva muito forte",
        "extreme rain": "Chuva extrema",

      };

      const translatedPrediction = translationMap[prediction_mapped] || prediction_mapped;

      setForecastMessage(`${translatedPrediction}`);
      setPlaceName(station.name);
    }
  }, [forecastData]);


  const resetData = () => {
    setLatitude(null);
    setLongitude(null);
    setPlaceName('');
    setForecastMessage('');
  };


  console.log(forecastData)
  console.log(openMeteoData)

  return (
    <div className='flex justify-center'>
      <div className="flex justify-center items-center min-h-screen w-4/5 relative">
        <div className="flex flex-col items-center bg-[#f0f8ffcc] rounded-2xl px-4 py-2 shadow-md">
          {forecastLoading || openMeteoLoading ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src="/atmoseer.png" alt="Logo" className="w-32 h-32 mb-4" />
              <p className="text-center mt-2 text-black-500 font-semibold">Carregando dados...</p>
            </div>
          ) : (
            forecastError || openMeteoError ? (
              <p className="text-center mt-8 text-red-500 font-semibold">Erro: {forecastError?.message || openMeteoError?.message}</p>
            ) : (
              <>
                <img src="/atmoseer.png" alt="Logo" className="w-32 h-32 absolute top-0 z-10" />
                <div className='grid grid-cols-2 mt-2 gap-1 z-0'>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faEarthAmericas} className="text-yellow-400 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Latitude</h2>
                      <p className="text-sm md:text-base my-2 text-gray-800">{latitude}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faEarthEurope} className="text-green-800 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Longitude</h2>
                      <p className='text-sm md:text-base text-gray-800 my-2'>{longitude}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <WeatherIcon forecastMessage={forecastMessage} />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Previsão do Tempo</h2>
                      <p className="text-sm md:text-base text-gray-800 my-2">{forecastMessage}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <CloudIcon condition={openMeteoData?.condition} colorIntensity={undefined} />
                    <div>
                      <h2 className=' mt-1 text-sm md:text-base font-semibold'>Clima Atual</h2>
                      <WeatherConditionTranslation conditionData={openMeteoData} />
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faMapLocationDot} className="text-purple-800 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Estação de Previsão</h2>
                      <p className="text-sm md:text-base text-gray-800 my-2">{placeName}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <TemperatureIcon temperature={openMeteoData?.temperature} className="text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Temperatura Atual</h2>
                      <p className="text-sm md:text-base text-gray-800 my-2">{openMeteoData?.temperature && `${openMeteoData.temperature} °C`}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faCloudArrowDown} className="text-gray-300 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Nebulosidade</h2>
                      <p className="text-sm md:text-base text-gray-800 my-2">{openMeteoData?.cloud_cover && `${openMeteoData.cloud_cover} %`}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faTint} className="text-blue-400 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Umidade</h2>
                      <p className="text-sm md:text-base text-gray-800 my-2">{openMeteoData?.humidity && `${openMeteoData.humidity} %`}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faWind} className="text-blue-300 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Velocidade do Vento</h2>
                      <p className="text-sm md:text-base text-gray-800 my-2">{openMeteoData?.wind_speed && `${openMeteoData.wind_speed} km/h`}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-start p-0.5 rounded-lg shadow-sm bg-white gap-3">
                    <FontAwesomeIcon icon={faLocationArrow} className="text-gray-400 text-2xl ml-2" />
                    <div>
                      <h2 className='mt-1 text-sm md:text-base font-semibold'>Direção do Vento</h2>
                      {openMeteoData && openMeteoData.wind_direction && (
                        <WindDirection windDirection={openMeteoData?.wind_direction && `${openMeteoData.temperature}`} />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )
          )}
          <Link to="/home" className="inline-block px-4 py-2 mt-3 rounded text-white font-bold no-underline bg-blue-500 hover:bg-blue-600 transition-colors" onClick={resetData}>Voltar</Link>        </div>
      </div>
    </div>
  );
};

export default GeolocationExample;
