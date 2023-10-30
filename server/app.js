import express from 'express';
import songs from './routes/songs.js';

const app = express();

app.use('/songs', songs);

app.use(express.static('../client/public'));

export default app;
/*app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});*/