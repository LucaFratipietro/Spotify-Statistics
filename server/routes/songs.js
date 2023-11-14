const express = require('express');
const songsController = require('../controllers/songsController.js');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *    summary: Retrieve all songs from the database
 *    description: Queries the MongoDB Atlas and returns all the data (songs) from the database.
 *    responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json
 */
router.get('/', songsController.allSongs);
router.get('/:genre', songsController.allSongsByGenre);

module.exports = router;
