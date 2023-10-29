require('dotenv').config();
const dbUrl = process.env.ATLAS_URL;
const { MongoClient } = require('mongodb');

let instance = null;

class DB {
  constructor() {
    if(!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async connect(dbName, collName) {
    if(instance.db) {
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbName);
    await instance.client.db(dbName).command({ping: 1});
    console.log('Successfully connected to MongoDB Database ' + dbName);
    instance.collection = await instance.db.collection(collName);
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

  async insertData(data) {
    return await instance.collection.insertMany(data);
  }

  async getAllData() {
    return await instance.collection.find().project({_id: 0});
  }

  async deleteAllData() {
    return await instance.collection.deleteMany({});
  }
}

module.exports.DB = DB;