import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export const Home: React.FC = () => {
  return (
    <div className="container-wrapper">
      <div id="container">
        <h1>Bem-vindo ao Atmoseer!</h1>
        <p>
          Acompanhe a previsão do tempo para sua região.
        </p>
        <Link to="/forecast" className="weather-button">Ver Previsão</Link>
      </div>
    </div>
  );
};
