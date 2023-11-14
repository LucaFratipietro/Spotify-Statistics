const express = require('express');
const songs = require('./routes/songs.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Spotify Statistics Swagger Documentation',
    version: '1.0.0',
    description: 
      'REST API Documentation for the Spotify Statistics application using the MERN stack'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Spotify Statistics Server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./server/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res, next) => {
  next();
});

app.use(express.static('./client/build'));

app.use('/songs', songs);

/**
 * Middleware to display 404 message when an unexpected endpoint is reached
 */
app.use(function (req, res) {
  res.type('json');
  res.status(404).json({error: 'Sorry, resource cannot be found'});
});

module.exports = app;