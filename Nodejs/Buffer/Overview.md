**Table of Contents: Node.js Buffers for Interviews**

1. **What is a Buffer? Core Definition & Purpose**
    - Why Buffers exist in Node.js
    - Binary data vs JavaScript strings (UTF-16 issue)
    - Raw memory allocation outside V8 heap
2. **Key Characteristics of Buffers**
    - Fixed-length, immutable length (mutable content)
    - Subclass of Uint8Array
    - Global class (no import needed, but explicit import recommended)
3. **Buffer Creation Methods (Most Asked)**
    - Buffer.alloc(size) vs Buffer.allocUnsafe(size) vs Buffer.allocUnsafeSlow(size)
    - Differences, security implications (zero-filling), performance trade-offs
    - Buffer.from() (string, array, another Buffer, etc.)
    - Deprecated ways (new Buffer() — know why it's bad)
4. **Common Buffer Operations & Methods**
    - .toString(encoding) / .write(string, offset, length, encoding)
    - .copy(), .subarray() (preferred over .slice())
    - .concat()
    - Byte-level read/write: .readUIntBE(), .writeIntLE(), etc. (endianness)
    - .fill(), .indexOf(), .includes()
5. **Encodings & Conversions**
    - Supported encodings ('utf8', 'hex', 'base64', 'ascii', etc.)
    - Buffer ↔ String conversion pitfalls
    - Handling binary data (images, files, crypto)
6. **Buffers vs Other Types**
    - Buffer vs Array / Uint8Array
    - Buffer vs Stream (when to use each)
    - Buffer in HTTP request bodies (buffering large payloads → OOM risk)
7. **Real-World Use Cases & Best Practices**
    - File I/O, network sockets, crypto, image processing
    - Avoiding memory leaks / sensitive data exposure
    - When to prefer streams over full Buffers
    - NestJS/Express: Multer memory vs disk storage, streaming uploads
8. **Top Interview Questions on Buffers**
    - alloc vs allocUnsafe (with security example)
    - Why Buffers for binary data?
    - How does Node.js buffer incoming HTTP bodies? When problematic?
    - Buffer global deprecation status
    - Convert Buffer to/from string safely
9. **Advanced / Trap Questions**
    - Backpressure relation (Buffers as stream chunks)
    - Object mode in streams vs Buffer chunks
    - Performance: when allocUnsafe is safe
    - Buffer in modern Node (v20+ interop with Web APIs)
10. **Quick Practice / Code Snippets to Prepare**
    - Safe Buffer creation demo
    - Binary manipulation example
    - Encoding/decoding round-trip