import React, { useState, useEffect } from 'react';


const translationMap = {
    "Clear sky": "Céu limpo",
    "Mainly clear": "Parcialmente limpo",
    "Partly cloudy": "Parcialmente nublado",
    "Overcast": "Encoberto",
    "Fog": "Nevoeiro",
    "Depositing rime fog": "Nevoeiro com gelo",
    "Drizzle: Light intensity": "Chuvisco leve",
    "Drizzle: Moderate intensity": "Chuvisco moderada",
    "Drizzle: Dense intensity": "Chuvisco densa",
    "Freezing Drizzle: Light intensity": "Chuvisco congelante leve",
    "Freezing Drizzle: Dense intensity": "Chuvisco congelante densa",
    "Rain: Slight intensity": "Chuva leve",
    "Rain: Moderate intensity": "Chuva moderada",
    "Rain: Heavy intensity": "Chuva forte",
    "Freezing Rain: Light intensity": "Chuva congelante leve",
    "Freezing Rain: Heavy intensity": "Chuva congelante forte",
    "Snow fall: Slight intensity": "Neve leve",
    "Snow fall: Moderate intensity": "Neve moderada",
    "Snow fall: Heavy intensity": "Neve forte",
    "Snow grains": "Grãos de neve",
    "Rain showers: Slight intensity": "Pancadas de Chuva leve",
    "Rain showers: Moderate intensity": "Pancadas de Chuva moderada",
    "Rain showers: Violent intensity": "Pancadas de Chuva forte",
    "Snow showers: Slight intensity": "Neve leve",
    "Snow showers: Heavy intensity": "Neve forte",
    "Thunderstorm: Slight intensity": "Tempestade leve",
    "Thunderstorm with slight hail": "Tempestade com granizo leve",
    "Thunderstorm with heavy hail": "Tempestade com granizo forte",
  };

const WeatherConditionTranslation = ({ conditionData}) => {
  const [translatedCondition, setTranslatedCondition] = useState('');

  useEffect(() => {
    if (conditionData && conditionData.condition) {
      const translatedCondition = translationMap[conditionData.condition] || conditionData.condition;
      setTranslatedCondition(translatedCondition);
    }
  }, [conditionData, translationMap]);

  return <p className="text-sm md:text-base text-gray-800 my-2"><span>{translatedCondition}</span></p>
  
};

export default WeatherConditionTranslation;
