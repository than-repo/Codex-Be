binding = connector / bridge giữa hai layer code
**C++ binding vẫn là code C++**, nhưng nó được viết để **JavaScript có thể gọi được**.

Ví dụ cụ thể
```js
fs.readFile("a.txt", callback);
```

Flow thật sự là:
```txt
JavaScript (fs.readFile)
        ↓
Node C++ binding
        ↓
libuv
        ↓
OS file system
```

socket A socket is like a "phone line" endpoint for network communication.

A **TCP listening socket** is a special socket that:

- Is bound to an IP address + port (e.g., 0.0.0.0:3000)
- Waits passively for incoming connections (like a server "listening" for phone calls)

A Buffer is a fixed-size chunk of raw memory (a block of bytes) allocated in RAM, but this allocation happens outside the V8 JavaScript heap.

-**Node.js** = runtime environment It provides: file system, HTTP, modules (require), process, event loop (via libuv), etc.
-**V8** = the actual JavaScript engine inside Node.js V8 is the one that takes your .js files, compiles them (via JIT), and executes them.