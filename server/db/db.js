/* eslint-disable camelcase */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbUrl = process.env.ATLAS_URL;

let instance = null;

class DB {
  /**
   * DB Singleton pattern
   */
  constructor() {
    if (!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  /**
   * Method to connect to MongoDB and instantiate a collection
   */
  async connect(dbName, collName) {
    if (instance.db) return;
    await instance.client.connect();
    instance.db = await instance.client.db(dbName);
    await instance.client.db(dbName).command({ping: 1});
    console.log('Successfully connected to MongoDB Database ' + dbName);
    instance.collection = await instance.db.collection(collName);
  }

  /**
   * Method to close connect to database
   */
  async close() {
    await instance.client.close();
    instance = null;
  }

  /**
   * Method to insert data into database
   */
  async insertData(data) {
    return await instance.collection.insertMany(data);
  }

  /**
   * Method to get all songs queried from the database
   * 
   * @param {string} genre | optional parameter for getting songs by genre
   * @returns {Cursor} cursor of query values
   */
  async getAllSongs(genre = '') {
    if (genre === '') {
      //return only required fields
      const projection = { Genre : 1, Artist: 1, Title: 1, Album_cover_link: 1, popularity: 1,
        release_date: 1, tempo: 1};
      return await instance.collection.find().project(projection);
    }
    return await instance.collection.find({ Genre: genre });
  }

  /**
   * Method to get all songs queried from the database of a certain genre
   * 
   * @param {string} genre | parameter for getting a certain genre
   * @returns {Cursor} cursor of query values
   */
  async getAllSongsOfGenre(genre) {
    
    //return only required fields
    const projection = { Genre : 1, Title: 1, Album_cover_link: 1, popularity: 1,
      release_date: 1, tempo: 1};
      
    return await instance.collection.find({ Genre: genre }).project(projection);
  }

  /**
   * Method to remove all data from the database
   * 
   * @returns {Document} metadata from data deleted
   */
  async deleteAllData() {
    return await instance.collection.deleteMany({});
  }

  /**
   * Method to get the most popular songs of a genre and decade
   * 
   * @param {string} genre -- AllYears param returns the most popular of all genres
   * @param {string} decade
   * @returns {Cursor} cursor of query values
   */
  async getMostPopular(genre, decade) {

    if(genre === 'AllGenres'){
      genre = '';
    }
    
    const query = {Genre : {$regex : genre}, release_date : {$regex : decade}};
    const sort = { popularity: -1 };
    const projection = { Genre : 1, Artist: 1, Title: 1, Album_cover_link: 1, popularity: 1,
      release_date: 1};
    return await instance.collection.find(query).sort(sort).limit(60).project(projection);
    
  }
}

module.exports = { DB };
