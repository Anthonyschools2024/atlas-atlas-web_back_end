const express = require('express');

/**
 * Creates a small HTTP server using the Express module.
 */
const app = express();
const PORT = 1245;

// Define a route handler for GET requests to the root URL ('/').
app.get('/', (req, res) => {
  // Use res.send() to send the response body.
  // Express handles setting the Content-Type and status code automatically.
  res.send('Hello Holberton School!');
});

// Start the server and have it listen on the specified port.
app.listen(PORT, () => {
  // Optional: Log a message to the console once the server is running.
  // console.log(`Server listening on port ${PORT}`);
});

// Export the Express app instance.
module.exports = app;
