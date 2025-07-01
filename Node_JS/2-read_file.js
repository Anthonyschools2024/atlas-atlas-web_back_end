const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {string} path The path to the CSV file.
 */
function countStudents(path) {
  try {
    // Attempt to read the file content synchronously with UTF-8 encoding.
    const fileContent = fs.readFileSync(path, 'utf8');

    // Split the content into lines and filter out any empty lines.
    const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

    // The first line is the header, the rest are student data.
    // If there are no lines after the header, there are no students.
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const studentLines = lines.slice(1);
    const totalStudents = studentLines.length;
    console.log(`Number of students: ${totalStudents}`);

    // Use an object to store lists of students for each field.
    const fields = {};

    for (const line of studentLines) {
      // Split the CSV line. The 4th element is the field, 1st is the firstname.
      const studentData = line.split(',');
      if (studentData.length >= 4) {
        const field = studentData[3];
        const firstname = studentData[0];

        // If the field hasn't been seen before, initialize its array.
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    }

    // Iterate over the fields found and print the summary for each.
    for (const field in fields) {
      // It's good practice to check if the key is a direct property of the object.
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const list = fields[field];
        const count = list.length;
        console.log(`Number of students in ${field}: ${count}. List: ${list.join(', ')}`);
      }
    }
  } catch (error) {
    // If fs.readFileSync fails (e.g., file not found), it throws an error.
    // We catch it and throw our custom error as required.
    throw new Error('Cannot load the database');
  }
}

// Export the function to make it available to other modules.
module.exports = countStudents;
