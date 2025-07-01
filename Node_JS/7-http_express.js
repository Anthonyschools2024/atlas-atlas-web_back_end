const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_PATH = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {string} path The path to the CSV file.
 * @returns {Promise<string>} A promise that resolves with the formatted student data string.
 */
const countStudents = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
    return;
  }
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const studentLines = lines.slice(1);
    const totalStudents = studentLines.length;

    let responseText = `Number of students: ${totalStudents}\n`;
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

    let entries = 0;
    const fieldCount = Object.keys(fields).length;
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const list = fields[field];
        const count = list.length;
        responseText += `Number of students in ${field}: ${count}. List: ${list.join(', ')}`;
        if (entries < fieldCount - 1) {
          responseText += '\n';
        }
        entries += 1;
      }
    }
    resolve(responseText);
  });
});

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route for the /students endpoint
app.get('/students', (req, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_PATH)
    .then((studentData) => {
      responseParts.push(studentData);
      res.send(responseParts.join('\n'));
    })
    .catch((error) => {
      responseParts.push(error.message);
      res.send(responseParts.join('\n'));
    });
});

// Start the server
app.listen(PORT);

// Export the app instance
module.exports = app;
