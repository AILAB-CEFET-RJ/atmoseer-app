import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex justify-center items-center min-h-screen w-11/12">
        <div className="flex flex-col items-center bg-[#f0f8ffcc] rounded-2xl p-10 shadow-2xl ">
          <h1 className="text-center mb-5 text-2xl text-gray-800">Bem-vindo ao Atmoseer!</h1>
          <p className="text-center mb-5 text-gray-500">
            Acompanhe a previsão do tempo para sua região.
          </p>
          <Link to="/forecast" className="inline-block px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition-colors">Ver Previsão</Link>
        </div>
      </div>
    </div>
  );
};
