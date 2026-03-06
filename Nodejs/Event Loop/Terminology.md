I/O events are notification from the OS (via libuv) that an asynchronous operation has compeleted or has new data.
- A file read has finished → data is available.
- A TCP socket received new data from the network.
- An HTTP response came back from a server.
- A database query returned results.
- A file write completed.
- A DNS lookup resolved.

I/O callback ( I/O related callback) that execute in poll phase of the Node.js event loop.

```js
// 1. File system (fs module)
fs.readFile('data.txt', 'utf8', (err, data) => {
  // ← This is an I/O callback
  if (err) console.error(err);
  console.log(data);  // runs in poll phase when file read completes
});

// 2. HTTP server (network I/O)
const server = http.createServer((req, res) => {
  // ← This callback runs in poll phase for each incoming request
  res.end('Hello!');
});

// 3. Database (e.g., PostgreSQL or MongoDB driver)
client.query('SELECT * FROM users', (err, result) => {
  // ← I/O callback — executes in poll when DB responds
  console.log(result.rows);
});

// 4. DNS lookup
dns.lookup('example.com', (err, address) => {
  // ← callback runs in poll phase
  console.log(address);
});
```