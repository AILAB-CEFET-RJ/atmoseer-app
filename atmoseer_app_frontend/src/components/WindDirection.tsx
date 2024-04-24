const WindDirection = ({ windDirection }) => {
  const getWindDirection = (windDirection) => {
    if (windDirection >= 348.75 && windDirection < 11.25) {
        return "Norte";
      } else if (windDirection >= 11.25 && windDirection < 33.75) {
        return "Norte-Nordeste";
      } else if (windDirection >= 33.75 && windDirection < 56.25) {
        return "Nordeste";
      } else if (windDirection >= 56.25 && windDirection < 78.75) {
        return "Leste-Nordeste";
      } else if (windDirection >= 78.75 && windDirection < 101.25) {
        return "Leste";
      } else if (windDirection >= 101.25 && windDirection < 123.75) {
        return "Leste-Sudeste";
      } else if (windDirection >= 123.75 && windDirection < 146.25) {
        return "Sudeste";
      } else if (windDirection >= 146.25 && windDirection < 168.75) {
        return "Sul-Sudeste";
      } else if (windDirection >= 168.75 && windDirection < 191.25) {
        return "Sul";
      } else if (windDirection >= 191.25 && windDirection < 213.75) {
        return "Sul-Sudoeste";
      } else if (windDirection >= 213.75 && windDirection < 236.25) {
        return "Sudoeste";
      } else if (windDirection >= 236.25 && windDirection < 258.75) {
        return "Oeste-Sudoeste";
      } else if (windDirection >= 258.75 && windDirection < 281.25) {
        return "Oeste";
      } else if (windDirection >= 281.25 && windDirection < 303.75) {
        return "Oeste-Noroeste";
      } else if (windDirection >= 303.75 && windDirection < 326.25) {
        return "Noroeste";
      } else {
        return "Norte-Noroeste";
      }
  };

  return (
    <p className="text-sm md:text-base text-gray-800 my-2">
      <span>{getWindDirection(windDirection)}</span>
    </p>
  );
};

export default WindDirection;