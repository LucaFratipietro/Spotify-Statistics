// Disabled due to field in song object being called after that name
// Can change in the future
/* eslint-disable camelcase */

import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../../app.js';
import { DB } from '../../db/db.js';

jest.mock('../../db/db');

//Get all songs
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

//Get all songs -- year query 
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

//Get all songs by genre -- WORK IN PROGESS, BUG

/*

describe('GET /songs/:genre?year=invalid', () => {
  test('Year returns no number, should be 404', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs', ).mockResolvedValue(
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
  test('Respond all objects with Genre = rock', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs', ).mockResolvedValue(
      [{ Genre : 'rock', Title : 'The first Song', release_date : "2002" },
      { Genre : 'pop', Title : 'The second', release_date : "1998"},
      { Genre : 'rap', Title : 'Sleep', release_date : "2002-11-11"}]
    );

    const response = await request(app).get('/songs/rnb');
    expect(response.body).toEqual(
      [{}]
    );
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');

  });
}); */
