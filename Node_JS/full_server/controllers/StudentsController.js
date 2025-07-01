import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const databasePath = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(databasePath)
      .then((fields) => {
        let responseText = 'This is the list of our students\n';
        const sortedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        sortedFields.forEach((field, index) => {
          const list = fields[field];
          const count = list.length;
          responseText += `Number of students in ${field}: ${count}. List: ${list.join(', ')}`;
          if (index < sortedFields.length - 1) {
            responseText += '\n';
          }
        });
        response.status(200).send(responseText);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const databasePath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databasePath)
      .then((fields) => {
        const studentList = fields[major] || [];
        response.status(200).send(`List: ${studentList.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
