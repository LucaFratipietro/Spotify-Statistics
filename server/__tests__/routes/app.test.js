import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../../app.js';
import { DB } from '../../db/db.js';

jest.mock('../../db/db');

//mocking of the songs routes

const songsMockDB = [{ Genre : 'rock', Title : 'The first Song', Artist : 'The Who'},
  { Genre : 'pop', Title : 'The second', Artist : 'The Strokes'},
  { Genre : 'rap', Title : 'Sleep', Artist : 'GodSpeed you!'}];

//Get all songs
describe('GET /songs', () => {
  test('It should respond with all songs json array', async () => {
    jest.spyOn(DB.prototype, 'getAllSongs').mockResolvedValue(songsMockDB);

    const response = await request(app).get('/songs');
    expect(response.body).toEqual(songsMockDB);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');

  });
});