import fs from 'fs';

/**
 * Reads a database file asynchronously and returns an object of student arrays per field.
 * @param {string} filePath The path to the database file.
 * @returns {Promise<Object>} A promise that resolves with an object of student arrays.
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const studentLines = lines.slice(1);
    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');
      if (studentData.length >= 4) {
        const field = studentData[3];
        const firstname = studentData[0];
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    }
    resolve(fields);
  });
});

export default readDatabase;
