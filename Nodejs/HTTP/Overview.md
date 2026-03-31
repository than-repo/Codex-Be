**Under the hood of a Node.js HTTP server (http.createServer + listen)** — very brief version:

1. **JavaScript layer**
    - http.createServer() → creates http.Server instance (inherits from net.Server)
    - It registers your callback as the 'request' event listener
2. **net.Server layer**
    - When you call server.listen(port) → Node asks libuv to create a **non-blocking TCP socket** and start listening
    - libuv uses OS-specific async mechanism:
        - Linux → epoll
        - macOS → kqueue
        - Windows → IOCP
3. **libuv event loop** (the real heart — single main thread)
    - Runs forever in phases (timers → pending callbacks → poll ← most important for network)
    - Poll phase waits (non-blocking) for new connections or data on existing ones
    - New connection arrives → libuv accepts it → creates new socket → emits 'connection' event
4. **Flow when a request comes**
    - TCP connection → 'connection' event
    - net.Socket created
    - HTTP parser (C++) reads data from socket
    - When full HTTP request arrives → http.Server emits 'request'
    - Your callback runs: (req, res) => { … }
    - You call res.end() → libuv writes data async → socket eventually closed

**Key facts**

- **Single JS thread** — all your code + event loop callbacks run here
- Network I/O → pure kernel async (no threads)
- File I/O, DNS, some crypto → offloaded to libuv's **4-worker thread pool**
- Everything is callback/promise/event driven → non-blocking

Result: one cheap process can handle thousands of concurrent connections efficiently.

Want deeper dive into any piece (event loop phases, http_parser, thread pool)?