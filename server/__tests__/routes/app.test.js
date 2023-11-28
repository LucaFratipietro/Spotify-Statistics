/* eslint-disable max-len */
// Disabled due to field in song object being called after that name
// Can change in the future
/* eslint-disable camelcase */
const request = require('supertest');
const app = require('../../app.js');
const { DB } = require('../../db/db.js');

jest.mock('../../db/db');

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Unit test to test /songs API endpoint returns songs in JSON format
 */
describe('GET /songs', () => {
  test('It should respond with all songs json array', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs').mockResolvedValue(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'},
        { id: 2, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22'}
      ]
    );

    const response = await request(app).get('/songs');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'},
        { id: 2, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22'}
      ]
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
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'},
        { id: 2, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22'}
      ]
    );

    const response = await request(app).get('/songs?year=2002');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 2, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22'}
      ]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

/**
 * Unit test to test /songs API endpoint to return only songs with unique ids
 */
describe('GET /songs', () => {
  test('Reponds with unique songs based on ids', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs').mockResolvedValue(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'},
        { id: 1, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22'}
      ]
    );

    const response = await request(app).get('/songs');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'}
      ]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

/**
 * Unit test /songs/rock middleware doesnt filter any rock songs
 */
describe('GET /songs/rock', () => {
  test('Get all songs with genre = rock', async () => {
    jest.spyOn(DB.prototype, 'getAllSongsOfGenre').mockResolvedValue(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'rock', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'}
      ]
    );

    const response = await request(app).get('/songs/rock');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'rock', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'}
      ]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

  });
});

/**
 * Unit test /songs/pop middleware to filter by year param
 */
describe('GET /songs/pop', () => {
  test('Year param for /songs/:genre', async () => {
    jest.spyOn(DB.prototype, 'getAllSongsOfGenre').mockResolvedValue(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'},
        { id: 1, Genre : 'rock', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02'}
      ]
    );

    const response = await request(app).get('/songs/rock?year=2002');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002'}
      ]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

  });
});

/**
 * Unit test /songs/rnb throws error and 404 
 */
describe('GET /songs/rnb', () => {
  test('Should return no songs, and respond with a 404', async () => {
    jest.spyOn(DB.prototype, 'getAllSongsOfGenre').mockResolvedValue(
      []
    );

    const response = await request(app).get('/songs/rnb');
    expect(response.body).toEqual(
      {'error': 'Genre rnb did not return any results. Try another genre'}
    );
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');

  });
});

/**
 * Unit test /songs/popularity/genre to return the same data
 */
describe('GET /songs/popularity/genre', () => {
  test('Returns all songs in correct order', async () => {
    jest.spyOn(DB.prototype, 'getMostPopular').mockResolvedValue(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002', popularity: 98},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02', popularity: 75},
        { id: 2, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22', popularity: 45}
      ]
    );

    const response = await request(app).get('/songs/popularity/rock');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002', popularity: 98},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02', popularity: 75},
        { id: 2, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22', popularity: 45}
      ]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

/**
 * Unit test /songs/popularity/genre to filter same id
 */
describe('GET /songs/popularity/genre', () => {
  test('filters the songs with the same id', async () => {
    jest.spyOn(DB.prototype, 'getMostPopular').mockResolvedValue(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002', popularity: 98},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02', popularity: 75},
        { id: 1, Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!', release_date: '2002-07-22', popularity: 45}
      ]
    );

    const response = await request(app).get('/songs/popularity/rock');
    expect(response.body).toEqual(
      [
        { id: 0, Genre : 'rock', Title : 'The first Song', Artist : 'The Who', release_date: '2002', popularity: 98},
        { id: 1, Genre : 'pop', Title : 'The second', Artist : 'The Strokes', release_date: '1978-11-02', popularity: 75}
      ]
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});
