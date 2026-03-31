### Table of Contents: Streams for Interviews (2026 Focus)

1. **What are Streams? Core Definition & Purpose**
2. **The 4 Types of Streams (Always Asked First)**
    - Readable (source: fs.createReadStream, http.IncomingMessage, process.stdin)
    - Writable (sink: fs.createWriteStream, http.ServerResponse, process.stdout)
    - Duplex (both: net.Socket, WebSocket, TCP connections)
    - Transform (modify on-the-fly: zlib.Gzip, crypto streams, custom parsers)
3. **Modes of Readable Streams**
    - Flowing mode (auto emits 'data') vs Paused mode (manual .read() / 'readable' event)
    - How to switch (on('data') → flowing; pause()/resume())
4. **Backpressure (Top Advanced Question)**
    - What it is: writable buffer full → slows readable to prevent overflow
    - How Node handles: .write() returns false → wait for 'drain'
    - .pipe() auto-manages it (why pipe() is powerful & safe)
5. **Key Methods & APIs (Practice These)**
    - .pipe(destination)
    - stream.pipeline() / stream.promises.pipeline() (error-safe chaining, auto cleanup)
    - for await...of (async iteration over readable)
    - .on('data'), .on('end'), .on('error'), .on('finish'), .on('drain')
6. **Object Mode**
    - { objectMode: true } → chunks are objects (not Buffer/string)
    - Use cases: parsers, RxJS interop, custom streams
7. **Real-World Use Cases (Interview Gold)**
    - File copy / large file handling
    - HTTP request/response streaming (uploads/downloads)
    - Compression (gzip)
    - Video/audio streaming with range requests
    - Network sockets, crypto encryption/decryption
8. **NestJS-Specific Streams (Very Common for Your Role)**
    - File uploads: Multer + file.stream.pipe(writeStream) (avoid .buffer for large files)
    - Streaming responses: res.pipe() or range handling for video
    - Interceptors/guards for on-the-fly transforms
    - Why: prevents OOM on 100MB+ uploads in production APIs
9. **Top Interview Questions on Streams (2025–2026 Real Ones)**
    - What are the 4 stream types? Give examples.
    - Explain backpressure & how .pipe() handles it.
    - Streams vs Buffers: when each?
    - Why use streams for large files instead of readFile?
    - How to handle errors in streams/pipeline?
    - Readable flowing vs paused?
    - Transform stream example (e.g., compression)?
    - NestJS: stream a file upload without buffering entire file?
    - How does Node handle backpressure in HTTP streams?
    - Object mode use case?
10. **Quick Prep / Code Snippets to Master**
    - Basic pipe: fs.createReadStream('big.txt').pipe(fs.createWriteStream('copy.txt'))
    - Pipeline with transform: await pipeline(read, gzip, write)
    - NestJS upload streaming example
    - Range-request video streaming

**Bottom line (honest 2026 reality)**:

- Junior roles → know types + basic pipe + why streams exist.
- Mid/senior/NestJS → expect backpressure explanation + real code (upload/stream response) + "how to avoid OOM on 10GB file".
- Not knowing streams well = red flag for I/O-heavy roles.