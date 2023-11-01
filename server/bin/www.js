#!/usr/bin/env node
import app from '../app.js';
import {DB} from '../db/db.js';
const port = process.env.PORT || 3000;

(async () => {
  try {
    const db = new DB();
    await db.connect('webdev-project-cluster', 'spotify-data');
  } catch (error) {
    console.error('could not connect');
    console.dir(error);
    process.exit();
  }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
})();
