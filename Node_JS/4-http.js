const http = require('http');

/**
 * Creates a small HTTP server.
 * The server listens on port 1245 and responds with a simple text message.
 */
const app = http.createServer((req, res) => {
  // Set the response header to indicate plain text content.
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the response body.
  res.end('Hello Holberton School!');
});

// Define the port for the server to listen on.
const PORT = 1245;

// Start the server.
app.listen(PORT);

// Export the server instance as required.
module.exports = app;
