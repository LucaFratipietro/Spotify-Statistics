import express from 'express';
import songs from './routes/songs.js';

const app = express();

app.use('/songs', songs);

app.use(express.static('../client/public'));

//if route is not defined above, return a 404 error message
app.use(function (req, res) {
  res.type('json');
  res.status(404).json({error: 'Sorry, resource cannot be found'});
});

export default app;
/*app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});*/