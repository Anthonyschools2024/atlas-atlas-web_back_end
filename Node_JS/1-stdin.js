/**
 * A program that prompts the user for their name and then prints it back.
 * It also displays a message when the program is closing.
 */

// Display the initial welcome message to the standard output.
// We use console.log which adds a newline, as requested.
console.log('Welcome to Holberton School, what is your name?');

// Listen for the 'readable' event on the standard input stream.
// This event is fired when there is data available to be read.
process.stdin.on('readable', () => {
  // Read the available data chunk.
  const chunk = process.stdin.read();

  // If a chunk was successfully read (i.e., not null), process it.
  if (chunk) {
    // Write the output message. We use process.stdout.write to avoid adding
    // an extra newline character at the end of the user's input.
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Listen for the 'end' event on the standard input stream.
// This event is fired when the stream is closed, either by the user
// pressing Ctrl+D or when input from a pipe has ended.
process.stdin.on('end', () => {
  // Display the closing message, adding a newline for clean formatting.
  console.log('This important software is now closing');
});
