var express = require('express')
var router = express.Router()


router.post('/', function (req, res) {
    console.log(req.body);
    var localizacao = req.body.localizacao; 
    var estacao = SeletorDeEstacao(localizacao.latitude, localizacao.longitude);
    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./atmoseerApp/src/predict_oc.py', estacao.id]);
    
    process.on('error', (err) => {
        console.error('Erro ao executar o processo Python:', err);
        res.status(500).send('Erro ao executar o processo Python.');
    });
    
    process.on('close', (code) => {
        console.log(`Processo Python encerrado com código de saída ${code}`);
    });
    
    process.stdout.on('data', function (data) { 
       res.send(data.toString()); 
   });
    
  });
  
module.exports = router


function SeletorDeEstacao(latitudeReferencia, longitudeReferencia) { 


function calcularDistancia(lat1, lon1, lat2, lon2) {
    var raioTerra = 6371; 

    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distancia = raioTerra * c; 
    return distancia;
}

const listaCoordenadas = require('./backend/coordenadasEstacoes.json');

    
var distanciaMinima = Number.MAX_VALUE;
var localizacaoMaisProxima = null;


for (var i = 0; i < listaCoordenadas.length; i++) {
    var coordenada = listaCoordenadas[i];
    var distancia = calcularDistancia(latitudeReferencia, longitudeReferencia, coordenada.latitude, coordenada.longitude);

    if (distancia < distanciaMinima) {
    distanciaMinima = distancia;
    localizacaoMaisProxima = coordenada;
    }
}

console.log("A Estação mais próxima é: " + localizacaoMaisProxima.nome);
console.log("Distância: " + distanciaMinima.toFixed(2) + " km");

return localizacaoMaisProxima;
}