const fs = require('fs');

/**
 * Counts the students in a CSV data file asynchronously.
 * @param {string} path The path to the CSV file.
 * @returns {Promise<void>} A promise that resolves when the processing is done.
 */
function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Attempt to read the file asynchronously.
    // The result is handled in a callback function.
    fs.readFile(path, 'utf8', (err, data) => {
      // If an error occurred (e.g., file not found), reject the promise.
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      // If successful, process the data.
      // This logic is the same as the synchronous version.
      const lines = data.split('\n').filter((line) => line.trim() !== '');

      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve(); // Resolve even if there are no students.
        return;
      }

      const studentLines = lines.slice(1);
      const totalStudents = studentLines.length;
      console.log(`Number of students: ${totalStudents}`);

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

      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          const list = fields[field];
          const count = list.length;
          console.log(`Number of students in ${field}: ${count}. List: ${list.join(', ')}`);
        }
      }

      // Once all processing and logging is complete, resolve the promise.
      resolve();
    });
  });
}

// Export the function.
module.exports = countStudents;
