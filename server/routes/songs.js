import express from 'express';
const router = express.Router();

import * as songsController from '../controllers/songController.js';

//get all songs for a certain year
//optional query to specify genre
router.get('/', songsController.year);

export default router;