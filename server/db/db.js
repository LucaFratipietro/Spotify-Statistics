require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbUrl = process.env.ATLAS_URL;

let instance = null;

class DB {
  constructor() {
    if (!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async connect(dbName, collName) {
    if (instance.db) return;
    await instance.client.connect();
    instance.db = await instance.client.db(dbName);
    await instance.client.db(dbName).command({ping: 1});
    instance.collection = await instance.db.collection(collName);
  }

  async getAllSongs(genre = '') {
    if (genre === '') {
      return await instance.collection.find().project({ _id: 0 });
    }
    return await instance.collection.find({ Genre: genre });
  }

  async deleteAllData() {
    return await instance.collection.deleteMany({});
  }
}

module.exports = { DB };
