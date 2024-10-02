const express = require('express');
const songs = require('./routes/songs.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const compression = require('compression');

let url = '';
if(process.env.NODE_ENV === 'production') {
  url = 'http://99.79.36.74';
} else {
  url = 'http://localhost:3001';
}

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
      url: url,
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

app.use(compression());

app.use(function (req, res, next) {
  res.set('Cache-control', 'public, max-age=31536000');
  next();
});

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