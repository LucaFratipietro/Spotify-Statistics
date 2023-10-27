const express = require('express');
const port = 3000;

const app = express();

app.use(express.static('../client/public'));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});