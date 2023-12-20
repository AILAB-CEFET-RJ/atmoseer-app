const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000; 


const soundingRouter = require('./routes/Sounding');
const corRouter = require('./routes/COR');
const inmetRouter = require('./routes/Inmet');
const predictRouter = require('./routes/Predict');
// const era5Router = require('./routes/Era5');

app.use(express.json()); // Permite o uso de JSON


const mongoURI = 'mongodb://127.0.0.1:27017/db';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');

  
  app.use('/sounding', soundingRouter);
  app.use('/cor', corRouter);
  app.use('/inmet', inmetRouter);
  // app.use('/era5', era5Router);
  app.use('/predict', predictRouter);

  
  app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
  });
});


app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Algo deu errado!');
 });
 

module.exports = app