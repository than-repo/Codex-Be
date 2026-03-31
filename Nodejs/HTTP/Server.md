### Create server
### In JS layer
1. **TCP connection arrives** → carrying HTTP data inside (the bytes of the HTTP request: method, path, headers, body…)
    
2. **http.Server** (through the lower layers: net.Socket + http_parser) → **receives** those bytes → **reads** them from the socket → **parses** them into structured parts (method = GET, url = /hello, headers = {…}, etc.)
    
3. Once a **complete** HTTP request is parsed (headers fully read + body if any is complete) → **http.Server** emits the 'request' **event** **once**
    
4. Node.js (the event loop) → sees the 'request' event → **calls your callback function** → passes **two freshly created objects** as arguments:
    
    - req = IncomingMessage object ← **this is the parsed request** (your "this 'request' is req" is correct!)
    - res = ServerResponse object ← empty response you fill and send back

So the chain is:

TCP bytes → http_parser reads & parses → 'request' event emitted → your (req, res) => {} runs → req contains what the client sent

**Key clarification**

- The event name is 'request' (a string/event name)
- The argument named req is the actual **parsed request object** They are **not** the same thing — the event **triggers** your function and **gives** you the req object.


### In net.Server layer
- **You call server.listen(port)** (or port + host/backlog/etc.)
    - net.Server (JS object, extends EventEmitter) receives the call.
- **JS → C++ bindings**
    - Node's internal C++ code (net bindings) calls **libuv** functions.
- **libuv creates TCP handle & socket**
    - libuv asks OS kernel to:
        - Create a **TCP socket** (file descriptor)
        - Bind it to IP:port (usually 0.0.0.0:port)
        - Put it in **listening mode** (listen() syscall with backlog queue)
    - This is a **passive listening socket** — waits for incoming TCP connections.
- **Register with OS async notification**
    - libuv adds the listening socket's file descriptor to the platform-specific polling system:
        - Linux → **epoll** (epoll_ctl to watch for EPOLLIN)
        - macOS/BSD → **kqueue**
        - Windows → **IOCP** (I/O Completion Ports)
    - Socket is now monitored **non-blocking** — OS will notify when a new connection arrives.
- **Client initiates TCP connection** (SYN packet → handshake)
    - OS kernel completes 3-way handshake.
    - OS sees a **ready new connection** on the listening socket → notifies libuv via epoll/kqueue/IOCP.
- **libuv accepts the connection**
    - libuv calls accept() (or equivalent) → gets a **new TCP socket** for this client.
    - Creates a new **uv_tcp_t** / **uv_stream_t** handle in libuv for the accepted socket.
- **libuv emits the event upward**
    - Calls the JS callback registered for this (internal onconnection handler in net.js).
    - net.Server creates a **net.Socket** object (duplex stream) wrapping the new socket.
    - net.Server**emits 'connection'** event → passes the new net.Socket as argument.
- **Your code can listen**
    ```js
    server.on('connection', (socket) => {
      // socket is ready: you can socket.on('data'), socket.write(), etc.
    });
    ```
    
    - (For HTTP: http.Server auto-listens to this 'connection' and attaches the HTTP parser.)



###  Real process

-- Client initiates TCP connection → **3-way handshake** happens in the OS kernel.
- OS notifies **libuv** (via epoll/kqueue/IOCP etc.) that a new connection is ready.
- libuv calls its internal accept logic (equivalent to uv_accept) → creates a new socket handle.
- This socket is wrapped into a **C++ TCPWrap** object → exposed to JS as a **net.Socket** instance.
- **net.Server** emits the 'connection' event with this socket.
- **http.Server** (which listens on 'connection' internally) takes the socket → attaches an **HTTP parser** and starts reading/parsing incoming data.
- Once a full HTTP request is parsed (headers complete, body if needed), **http.Server** emits the 'request' event with req (IncomingMessage) and res (ServerResponse).
- Node.js calls your registered callback (req, res) => { ... } to handle the request.


When the HTTP headers are **fully parsed** (request line + all headers), http.Server emits the 'request' event right away.

Then Node.js calls your handler function A(req, res) => { ... } **while the body** (if present) is **still arriving** chunk by chunk over the TCP connection.