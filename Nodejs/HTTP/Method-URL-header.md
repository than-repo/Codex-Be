### 1. Method & URL

- Extract directly from the request object (http.IncomingMessage):
    ```JavaScript
    const { method, url } = request;
    ```
- method: HTTP verb (GET, POST, PUT, DELETE…)
- url: path + query string (everything after host/port, e.g. /users?id=123)
### 2. Headers
- Available as lowercase object:
    ```JavaScript
    const { headers } = request;
    const userAgent = headers['user-agent'];
    ```
- All keys are **lowercased** automatically
- Repeated headers → values are joined with comma (or sometimes overwritten)
- For raw / unprocessed values → use request.rawHeaders

### 3. Request Body (POST/PUT/etc.)
- request is a **ReadableStream**
- You must manually collect the body (no automatic parsing like Express):
    ```JavaScript
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk);           // chunk is Buffer
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // now body is the full string (e.g. JSON, form data…)
        // you can JSON.parse(body) if needed
      });
    ```

.on() is method that is registered to run something(callbackFn) when somethings happen. => when has HTTP request arrives to server, callbackFn in on()method will execute.

request.on(eventName, callbackFunction)
first argument in callbackFn is always data from that event.

when HTTP request body arrive to server, it does not arrive at once. It comes in small pieces (usually 8–64 KB each, depending on the system/network) so-called chunk


```js
import http from "http";

const server = http.createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);

  if (req.method === "GET" || req.method === "HEAD") {
    // No body expected → respond immediately
    res.end("Hello from GET/HEAD");
    return;
  }

  // For methods that usually have body (POST, PUT, PATCH…)
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log("Full body:", fullBody);

      // Now it's safe to respond
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Received body:\n${fullBody}`);
    })
    .on("error", (err) => {
      console.error("Request stream error:", err);
      res.writeHead(500);
      res.end("Server error while reading body");
    });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```