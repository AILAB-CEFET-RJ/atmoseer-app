import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain, faCloudShowersHeavy, faSnowflake, faBolt, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

const CloudIcon = ({ condition, colorIntensity }) => {
  const cloudIcons = {
    "Clear sky": { icon: faSun, color: "yellow", colorIntensity: 400 },
    "Mainly clear": { icon: faCloudSun, color: "blue", colorIntensity: 400 },
    "Partly cloudy": { icon: faCloudSun, color: "blue", colorIntensity: 400 },
    "Overcast": { icon: faCloud, color: "gray", colorIntensity: 400 },
    "Fog": { icon: faCloud, color: "gray", colorIntensity: 400 },
    "Depositing rime fog": { icon: faCloud, color: "blue", colorIntensity: 300 },
    "Drizzle: Light intensity": { icon: faCloudRain, color: "blue", colorIntensity: 400 },
    "Drizzle: Moderate intensity": { icon: faCloudRain, color: "blue", colorIntensity: 400 },
    "Drizzle: Dense intensity": { icon: faCloudRain, color: "blue", colorIntensity: 400 },
    "Freezing Drizzle: Light intensity": { icon: faCloudRain, color: "blue", colorIntensity: 400 },
    "Freezing Drizzle: Dense intensity": { icon: faCloudRain, color: "blue", colorIntensity: 400 },
    "Rain: Slight intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 600 },
    "Rain: Moderate intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 600 },
    "Rain: Heavy intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 600 },
    "Freezing Rain: Light intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 600 },
    "Freezing Rain: Heavy intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 600 },
    "Snow fall: Slight intensity": { icon: faSnowflake, color: "gray", colorIntensity: 200 },
    "Snow fall: Moderate intensity": { icon: faSnowflake, color: "gray", colorIntensity: 200 },
    "Snow fall: Heavy intensity": { icon: faSnowflake, color: "gray", colorIntensity: 200 },
    "Snow grains": { icon: faSnowflake, color: "gray", colorIntensity: 200 },
    "Rain showers: Slight intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 400 },
    "Rain showers: Moderate intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 400 },
    "Rain showers: Violent intensity": { icon: faCloudShowersHeavy, color: "blue", colorIntensity: 400 },
    "Snow showers: Slight intensity": { icon: faSnowflake, color: "gray", colorIntensity: 200 },
    "Snow showers: Heavy intensity": { icon: faSnowflake, color: "gray", colorIntensity: 200 },
    "Thunderstorm: Slight intensity": { icon: faBolt, color: "blue", colorIntensity: 800 },
    "Thunderstorm with slight hail": { icon: faBolt, color: "blue", colorIntensity: 800 },
    "Thunderstorm with heavy hail": { icon: faBolt, color: "blue", colorIntensity: 800 },
  };
  
  const getCloudIcon = (condition) => {
    const { icon, color, colorIntensity } = cloudIcons[condition] || { icon: faCloud, color: "gray", colorIntensity: 400 };
    return <FontAwesomeIcon icon={icon} className={`text-${color}-${colorIntensity} text-2xl ml-2`} data-test="clima-icon"/>;
  };

  return getCloudIcon(condition);
};

export default CloudIcon;
