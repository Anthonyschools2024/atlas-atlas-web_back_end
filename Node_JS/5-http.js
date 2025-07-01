const http = require('http');
const fs = require('fs');

const PORT = 1245;
const DB_PATH = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {string} path The path to the CSV file.
 * @returns {Promise<string>} A promise that resolves with the formatted student data.
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

/**
 * The main application, a small HTTP server.
 */
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(DB_PATH)
      .then((studentData) => {
        res.end(studentData);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    // Although not required, it's good practice to handle other routes.
    res.writeHead(404);
    res.end('Not Found');
  }
});

app.listen(PORT);

module.exports = app;
