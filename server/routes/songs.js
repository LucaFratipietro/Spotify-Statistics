const express = require('express');
const songsController = require('../controllers/songsController.js');

const router = express.Router();

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Retrieve all songs from the database (RUN AT RISK)
 *     description: |
 *       Queries the MongoDB Atlas and returns all the data (songs) from the database.
 *       WARNING: Retrives > 6000 individual data. Possibilities of crashing could occur
 *     responses:
 *       200:
 *         description: A list of songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Genre:
 *                     type: string
 *                     description: Song genre
 *                     example: rock
 *                   Title:
 *                     type: string
 *                     description: Song title
 *                     example: Thriller
 *                   Album_cover_link:
 *                     type: string
 *                     description: Song cover link
 *                     example: https://i.scdn.co/image/ab67616d0000b273fe24dcd263c08c6dd84b6e8c
 *                   Artist:
 *                     type: string
 *                     description: Song artist(s)
 *                     example: Swedish House Mafia
 *                   popularity:
 *                     type: string
 *                     description: Song relative popularity (%)
 *                     example: 92
 *                   release_date:
 *                     type: string
 *                     description: Song release date
 *                     example: 1975-11-05 or 1975
 *                   tempo:
 *                     type: double
 *                     description: Song tempo scale
 *                     example: 117.292
 */
router.get('/', songsController.allSongs);

/**
 * @swagger
 * /songs/{genre}:
 *   get:
 *     summary: Retrieve all songs in specific genre (RUN AT RISK)
 *     description: |
 *       Queries the MongoDB Atlas and returns songs under the genre specified as a parameter
 *       WARNING: Retrives > 6000 individual data. Possibilities of crashing could occur
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         description: Genre string of songs to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of songs under genre parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Genre:
 *                     type: string
 *                     description: Song genre
 *                     example: rock
 *                   Title:
 *                     type: string
 *                     description: Song title
 *                     example: Thriller
 *                   Album_cover_link:
 *                     type: string
 *                     description: Song cover link
 *                     example: https://i.scdn.co/image/ab67616d0000b273fe24dcd263c08c6dd84b6e8c
 *                   Artist:
 *                     type: string
 *                     description: Song artist(s)
 *                     example: Swedish House Mafia
 *                   popularity:
 *                     type: string
 *                     description: Song relative popularity (%)
 *                     example: 92
 *                   release_date:
 *                     type: string
 *                     description: Song release date
 *                     example: 1975-11-05 or 1975
 *                   tempo:
 *                     type: double
 *                     description: Song tempo scale
 *                     example: 117.292
 */
router.get('/:genre', songsController.allSongsByGenre);

/**
 * @swagger
 * /songs/popularity/{genre}:
 *   get:
 *     summary: Retrieve the top 60 most popular songs of a given genre
 *     description: |
 *       Queries the MongoDB Atlas and returns an ordered list of the most popular
 *       songs of the given genre, defined by the popularity field
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         description: Genre string of songs to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The top songs of a given genre param
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Genre:
 *                     type: string
 *                     description: Song genre
 *                     example: rock
 *                   Title:
 *                     type: string
 *                     description: Song title
 *                     example: Thriller
 *                   Album_cover_link:
 *                     type: string
 *                     description: Song cover link
 *                     example: https://i.scdn.co/image/ab67616d0000b273fe24dcd263c08c6dd84b6e8c
 *                   Artist:
 *                     type: string
 *                     description: Song artist(s)
 *                     example: Swedish House Mafia
 *                   popularity:
 *                     type: string
 *                     description: Song relative popularity (%)
 *                     example: 92
 *                   release_date:
 *                     type: string
 *                     description: Song release date
 *                     example: 1975-11-05 or 1975
 *                   tempo:
 *                     type: double
 *                     description: Song tempo scale
 *                     example: 117.292
 */
router.get('/popularity/:genre', songsController.mostPopularSongs);

module.exports = router;
