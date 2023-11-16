const { readDataFromFile } = require('../../utils/seed');

/**
 * Unit test to test seeding module for DB returns expected data from test file
 */
describe('Testing loading module function', () => {
  test('Should return expected data', async () => {
    const dataFromFile = await readDataFromFile('data/test_data.xlsx');
    expect(dataFromFile).not.toBeNull();
    expect(dataFromFile[0].Artist).toEqual('The Who');
    expect(dataFromFile[0].Genre).toEqual('rock');
    expect(dataFromFile[0].release_date).toEqual('1971-08-14');
  });
});

/**
 * Unit test to test seeding module for DB returns undefined data with provided empty file
 */
describe('Testing loading module function', () => {
  test('Should return no values', async () => {
    const dataFromFile = await readDataFromFile('data/empty_data.xlsx');
    expect(dataFromFile).not.toBeNull();
    expect(dataFromFile[0]).toBeUndefined();
  });
});