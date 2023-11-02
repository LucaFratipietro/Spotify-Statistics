const express = require('express');
const songs = require('./routes/songs.js');

const app = express();

app.get('/', (req, res, next) => {
  next();
});

app.use(express.static('./client/build'));

app.use('/songs', songs);

//if route is not defined above, return a 404 error message
app.use(function (req, res) {
  res.type('json');
  res.status(404).json({error: 'Sorry, resource cannot be found'});
});

module.exports = app;
/*app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});*/