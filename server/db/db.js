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
    instance.collection = await instance.db.collection(collName);
  }

  /**
   * Method to get all songs queried from the database
   * 
   * @param {string} genre | optional parameter for getting songs by genre
   * @returns {Cursor} cursor of query values
   */
  async getAllSongs(genre = '') {
    if (genre === '') {
      return await instance.collection.find().project({ _id: 0 });
    }
    return await instance.collection.find({ Genre: genre });
  }

  // async getAllYears() {
  //   return instance.collection.find().project({ release_date: 1 });
  // }

  /**
   * Method to remove all data from the database
   * 
   * @returns {Document} metadata from data deleted
   */
  async deleteAllData() {
    return await instance.collection.deleteMany({});
  }
}

module.exports = { DB };
