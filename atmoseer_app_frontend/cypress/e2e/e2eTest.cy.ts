describe("1.0 Acessing atmoseer app Frontend", () => {
  it("1.1 Should open a web page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(`[data-test="homepage-title"]`).should("contain", "Bem-vindo ao Atmoseer!");
    cy.get(`[data-test="homepage-text"]`).should("contain", "Acompanhe a previsão do tempo para sua região.");
    cy.get(`[data-test="homepage-btn"]`).should("contain", "Ver Previsão")
  });

  it("1.2 Do Request and verify all fields", ()=>{
    cy.visit("http://localhost:5173/");

    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "mockWeather.json"
    }).as("getWeather");

    cy.get('[data-test="homepage-btn"]').click();

    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="latitude-text"]`).should('contain', "-22.8950016")
    cy.get(`[data-test="longitude-text"]`).should('contain', "-43.3127424")
    cy.get(`[data-test="previsao-text"]`).should('contain', "Chuva")
    cy.get(`[data-test="clima-text"]`).should('contain', "Parcialmente limpo")
    cy.get(`[data-test="estacao-text"]`).should('contain', "Alto da Boa Vista")
    cy.get(`[data-test="temperatura-text"]`).should('contain', "14")
    cy.get(`[data-test="nebulosidade-text"]`).should('contain', "22 %")
    cy.get(`[data-test="umidade-text"]`).should('contain', "83 %")
    cy.get(`[data-test="velocidade-vento-text"]`).should('contain', "1.5 km/h")
    cy.get(`[data-test="direcao-vento-text"]`).should('contain', "Norte-Nordeste")
  })
});

describe("2.0 Temperature", () => {
  it("2.1 Low Temperature", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "temperature/mockWeatherLow.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();

    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="temperatura-text"]`).should('contain', "19")

    cy.get('[data-test="temperatura-icon"]')
    .should('have.attr', 'data-icon', 'temperature-low') 
    cy.get('[data-test="temperatura-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M448 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM320 96a96 96 0')
  });

  it("2.2 Half Temperature", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "temperature/mockWeatherHalf.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();
  
    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="temperatura-text"]`).should('contain', "20")

    cy.get('[data-test="temperatura-icon"]')
    .should('have.attr', 'data-icon', 'temperature-half') 
    cy.get('[data-test="temperatura-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2')
  });

  it("2.3 High Temperature", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "temperature/mockWeatherHight.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();
  
    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="temperatura-text"]`).should('contain', "31")

    cy.get('[data-test="temperatura-icon"]')
    .should('have.attr', 'data-icon', 'temperature-high') 
    cy.get('[data-test="temperatura-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96')
  });
})
  
  describe("3.0 Previsão do tempo", () => {
    it("3.1 Chuva", () => {
    
      //Utilização de dados mockados para forecast e Weather
      cy.intercept("GET", "**/forecast/**", {
        fixture: "previsao/mockForecastChuvaForte.json"
      }).as("getForecast");
  
      cy.intercept("GET", "**/weather/**", {
        fixture: "mockWeather.json"
      }).as("getWeather");
    
      cy.visit("http://localhost:5173");

      cy.get('[data-test="homepage-btn"]').click();
  
      cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
      cy.wait("@getWeather").its('response.statusCode').should('eq', 200);
  
      cy.get(`[data-test="previsao-text"]`).should('contain', "Chuva forte")
  
      cy.get('[data-test="previsao-icon"]')
      .should('have.attr', 'data-icon', 'cloud-showers-heavy') 
      cy.get('[data-test="previsao-icon"] > path')
        .should('have.attr', 'd')
        .and('contain', 'M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 ')
    });

    it("3.2 Chuva", () => {
      cy.visit("http://localhost:5173");
    
      //Utilização de dados mockados para forecast e Weather
      cy.intercept("GET", "**/forecast/**", {
        fixture: "previsao/mockForecastChuva.json"
      }).as("getForecast");
  
      cy.intercept("GET", "**/weather/**", {
        fixture: "mockWeather.json"
      }).as("getWeather");
    
      cy.get('[data-test="homepage-btn"]').click();
  
      cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
      cy.wait("@getWeather").its('response.statusCode').should('eq', 200);
  
      cy.get(`[data-test="previsao-text"]`).should('contain', "Chuva")
  
      cy.get('[data-test="previsao-icon"]')
      .should('have.attr', 'data-icon', 'cloud-rain') 
      cy.get('[data-test="previsao-icon"] > path')
        .should('have.attr', 'd')
        .and('contain', 'M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5')
    });

    it("3.3 Chuva Muito Forte", () => {
      cy.visit("http://localhost:5173");
    
      //Utilização de dados mockados para forecast e Weather
      cy.intercept("GET", "**/forecast/**", {
        fixture: "previsao/mockForecastChuvaMuitoForte.json"
      }).as("getForecast");
  
      cy.intercept("GET", "**/weather/**", {
        fixture: "mockWeather.json"
      }).as("getWeather");
    
      cy.get('[data-test="homepage-btn"]').click();
  
      cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
      cy.wait("@getWeather").its('response.statusCode').should('eq', 200);
  
      cy.get(`[data-test="previsao-text"]`).should('contain', "Chuva muito forte")
  
      cy.get('[data-test="previsao-icon"]')
      .should('have.attr', 'data-icon', 'cloud-rain') 
      cy.get('[data-test="previsao-icon"] > path')
        .should('have.attr', 'd')
        .and('contain', 'M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 ')
    });

    it("3.4 Sem Chuva", () => {
      cy.visit("http://localhost:5173");
    
      //Utilização de dados mockados para forecast e Weather
      cy.intercept("GET", "**/forecast/**", {
        fixture: "previsao/mockForecastSemChuva.json"
      }).as("getForecast");
  
      cy.intercept("GET", "**/weather/**", {
        fixture: "mockWeather.json"
      }).as("getWeather");
    
      cy.get('[data-test="homepage-btn"]').click();
  
      cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
      cy.wait("@getWeather").its('response.statusCode').should('eq', 200);
  
      cy.get(`[data-test="previsao-text"]`).should('contain', "Sem chuva")
  
      cy.get('[data-test="previsao-icon"]')
      .should('have.attr', 'data-icon', 'sun') 
      cy.get('[data-test="previsao-icon"] > path')
        .should('have.attr', 'd')
        .and('contain', 'M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6')
    });
});

describe("4.0 Clima", () => {
  it("3.1 Céu limpo", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "clima/mockWeatherCeuLimpo.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();

    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="clima-text"]`).should('contain', "Céu limpo")

    cy.get('[data-test="clima-icon"]')
    .should('have.attr', 'data-icon', 'sun') 
    cy.get('[data-test="clima-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9')
  });

  it("3.2 ParcialmenteLimpo", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "clima/mockWeatherParcialmenteLimpo.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();

    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="clima-text"]`).should('contain', "Parcialmente limpo")

    cy.get('[data-test="clima-icon"]')
    .should('have.attr', 'data-icon', 'cloud-sun') 
    cy.get('[data-test="clima-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5')
  });

  it("3.3 Parcialmente Nublado", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "clima/mockWeatherParcialmenteNublado.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();

    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="clima-text"]`).should('contain', "Parcialmente nublado")

    cy.get('[data-test="clima-icon"]')
    .should('have.attr', 'data-icon', 'cloud-sun') 
    cy.get('[data-test="clima-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5')
  });

  it("3.4 Chuva Forte", () => {
    cy.visit("http://localhost:5173");
  
    //Utilização de dados mockados para forecast e Weather
    cy.intercept("GET", "**/forecast/**", {
      fixture: "mockForecast.json"
    }).as("getForecast");

    cy.intercept("GET", "**/weather/**", {
      fixture: "clima/mockWeatherChuvaForte.json"
    }).as("getWeather");
  
    cy.get('[data-test="homepage-btn"]').click();

    cy.wait("@getForecast").its('response.statusCode').should('eq', 200);
    cy.wait("@getWeather").its('response.statusCode').should('eq', 200);

    cy.get(`[data-test="clima-text"]`).should('contain', "Chuva forte")

    cy.get('[data-test="clima-icon"]')
    .should('have.attr', 'data-icon', 'cloud-showers-heavy') 
    cy.get('[data-test="clima-icon"] > path')
      .should('have.attr', 'd')
      .and('contain', 'M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64')
  });


});