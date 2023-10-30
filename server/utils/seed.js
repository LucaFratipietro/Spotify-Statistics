const { DB } = require('../db/db');
const XLSX = require('xlsx');

async function readDataFromFile() {
  const workBook = XLSX.readFile('./server/data/spotify_genre_final.xlsx');
  const sheetName = workBook.SheetNames[0];
  const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
  return jsonData;
}

(async () => {
  let db;
  try {
    const data = await readDataFromFile();
    db = new DB();
    await db.connect('webdev-project-cluster', 'spotify-data');
    const num = await db.insertData(data);
    console.log(`${num.insertedCount} entries added to DB`);
  } catch (error) {
    console.log(error);
    console.error('Could not seed data');
    console.dir(e);
  } finally {
    if(db) {
      await db.close();
    }
    process.exit();
  }
})();