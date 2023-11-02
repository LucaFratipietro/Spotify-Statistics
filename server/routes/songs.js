const express = require('express');
const songsController = require('../controllers/songsController.js');

const router = express.Router();

//get all songs for a certain year
//optional query to specify genre
router.get('/', songsController.allSongs);
router.get('/:genre', songsController.allSongsByGenre);

module.exports = router;
