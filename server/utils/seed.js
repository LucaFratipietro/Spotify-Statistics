const { DB } = require('../db/db.js');
const XLSX = require('xlsx');

async function readDataFromFile(url) {
  const workBook = XLSX.readFile(url);
  const sheetName = workBook.SheetNames[0];
  const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
  return jsonData;
}

const fillDB = async () => {
  let db;
  try {
    const data = await readDataFromFile('data/spotify_genre_final.xlsx');
    db = new DB();
    await db.connect('webdev-project-cluster', 'spotify-data');
    const num = await db.insertData(data);
    console.log(`${num.insertedCount} entries added to DB`);
  } catch (error) {
    console.log(error);
    console.error('Could not seed data');
    console.dir(error);
  } finally {
    if(db) {
      await db.close();
    }
    process.exit();
  }
};

const i = 0;
if ( i === 1 ) fillDB();

module.exports = { readDataFromFile };