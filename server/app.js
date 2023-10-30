import express from 'express';
const port = 3000;
import songs from './routes/songs.js';

const app = express();

app.use('/songs', songs);

app.use(express.static('../client/public'));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});