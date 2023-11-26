// Disabled due to field in song object being called after that name
// Can change in the future
/* eslint-disable camelcase */
const request = require('supertest');
const app = require('../../app.js');
const { DB } = require('../../db/db.js');

jest.mock('../../db/db');

/**
 * Unit test to test /songs API endpoint returns songs in JSON format
 */
describe('GET /songs', () => {
  test('It should respond with all songs json array', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs').mockResolvedValue(
      [{ Genre : 'rock', Title : 'The first Song', Artist : 'The Who'},
        { Genre : 'pop', Title : 'The second', Artist : 'The Strokes'},
        { Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!'}]
    );

    const response = await request(app).get('/songs');
    expect(response.body).toEqual(
      [{ Genre : 'rock', Title : 'The first Song', Artist : 'The Who'},
        { Genre : 'pop', Title : 'The second', Artist : 'The Strokes'},
        { Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!'}]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

  });
});

/**
 * Unit test to test /songs API endpoint returns songs in JSON format with year query parameter
 */
describe('GET /songs', () => {
  test('Respond all objects with release_date being 2002', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs').mockResolvedValue(
      [{ Genre : 'rock', Title : 'The first Song', release_date : '2002' },
        { Genre : 'pop', Title : 'The second', release_date : '1998'},
        { Genre : 'rap', Title : 'Sleep', release_date : '2002-11-11'}]
    );

    const response = await request(app).get('/songs?year=2002');
    expect(response.body).toEqual(
      [{ Genre : 'rock', Title : 'The first Song', release_date : '2002' },
        { Genre : 'rap', Title : 'Sleep', release_date : '2002-11-11'}]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

  });
});


describe('GET /songs/:genre', () => {
  test('Get all songs with genre = rock', async () => {
    jest.spyOn(DB.prototype, 'getAllSongsOfGenre').mockResolvedValue(
      [{ Genre : 'rock', Title : 'The first Song', release_date : "2002" },
      { Genre : 'pop', Title : 'The second', release_date : "1998"},
      { Genre : 'rap', Title : 'Sleep', release_date : "2002-11-11"}]
    );

    const response = await request(app).get('/songs/rock');
    expect(response.body).toEqual(
      [{ Genre : 'rock', Title : 'The first Song', release_date : "2002" }]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

  });
});

describe('GET /songs/:genre', () => {
  test('Should return no songs, and respond with a 404', async () => {
    jest.spyOn(DB.prototype, 'getAllSongsOfGenre').mockResolvedValue(
      [{ Genre : 'rock', Title : 'The first Song', release_date : "2002" },
      { Genre : 'pop', Title : 'The second', release_date : "1998"},
      { Genre : 'rap', Title : 'Sleep', release_date : "2002-11-11"}]
    );

    const response = await request(app).get('/songs/rnb');
    expect(response.body).toEqual(
      {}
    );
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');

  });
});
