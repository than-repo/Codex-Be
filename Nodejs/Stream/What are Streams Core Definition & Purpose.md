1. **What are Streams? Core Definition & Purpose**

Docs:
A Stream is an abstract interface for working with streaming data in Nodejs.

Short analogies:
Streams are an array over time

Main Purpose (why they exist):
**Most frequently mentioned / expected (top 3)**:

1. **Memory efficiency** — Process huge data without loading everything → prevents OOM crashes (e.g., large files, uploads).
2. **Time efficiency / Faster start** — Start processing/sending data immediately (early TTFB, no wait for full payload) → better UX/performance.
3. **Backpressure** — Automatically handle speed differences between producer and consumer → prevents memory spikes under load.

**Your other two** (composability/piping + real-time/continuous data) are **excellent additions**:

- Piping/composability is very commonly praised (Unix-like chaining, clean code for gzip + encrypt + send).
- Real-time fits perfectly for logs, WebSockets, HTTP req/res.


2. **The 4 Types of Streams (Always Asked First)**
