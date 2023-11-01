import dotenv from 'dotenv';
dotenv.config();
const dbUrl = process.env.ATLAS_URL;
import { MongoClient } from 'mongodb';

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

  //genre is an optional paramter, if genre passed in, fetch songs with that genre
  async getAllSongs(genre = '') {
    if(genre === ''){
      return await instance.collection.find().project({_id: 0});
    }
    return await instance.collection.find({Genre: genre});
  }

  async deleteAllData() {
    return await instance.collection.deleteMany({});
  }
}

export {DB};