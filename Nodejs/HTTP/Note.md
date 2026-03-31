### 1. Core Concepts You Must Memorize (Exact Interview Takeaways)

- http.createServer([requestListener]) → returns a Server (EventEmitter). Most common question: “Write a minimal server without frameworks.”
- req = IncomingMessage (Readable stream) Key props: method, url, headers (always lower-cased), rawHeaders. Body comes only via 'data' + 'end' events (or req.pipe()).
- res = ServerResponse (Writable stream) Must set status/headers **before** first write() or end(). Use writeHead() or implicit.
- **Critical rule**: ALWAYS listen to req.on('error') and res.on('error') — otherwise the whole Node process crashes. This kills candidates in live-coding rounds.
- Routing = manual if (req.method === 'POST' && req.url === '/echo').
- Body collection pattern (most asked):
    
    JavaScript
    
    ```
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      // now parse JSON etc.
    });
    ```
    
- Pro tip interviewers love: req.pipe(res) for echo/proxy servers (zero-copy, perfect for AI streaming).

### 2. Top 8 Interview Questions (Real 2025–2026 Vietnam + AI Twist)

These appear in 70%+ of backend rounds (from GeeksforGeeks, Devinterview.io, local VN LinkedIn posts).

1. **“Create a simple HTTP server that echoes POST body.”** (They give 5 mins live code.) Expected: use streams + error handling.
2. **“Why are headers lower-cased? What if client sends duplicate headers?”** Answer: HTTP spec + Node design. Use rawHeaders for case/original.
3. **“What happens if you forget req.on('error')?”** Process crashes → production outage. (They ask this after you write the server.)
4. **“How do you handle large request bodies without OOM?”** 2026 AI answer: Use stream + limit size (e.g., 1MB) or switch to busboy/multer. Never Buffer.concat blindly.
5. **“Explain req vs res streams and when to use pipe().”** Real-world: proxying OpenAI/Groq streaming responses without buffering entire JSON.
6. **“Difference between http module and Express? When would you drop to raw http?”** Answer: Debugging, custom protocols, ultra-high perf microservices, or when frameworks add latency in AI inference paths.
7. **“How to support HTTP/2 or HTTP/3 in 2026?”**http2 module or undici (native fetch uses it). AI companies care because streaming tokens faster = better UX.
8. **AI-specific (new in 2026):** “Your backend proxies ChatGPT streaming. Client gets partial responses delayed. Why?” Answer: You buffered the whole body instead of piping chunks. Fix = req.pipe(res) + proper Content-Type: text/event-stream.

### 3. Real-World Practicing (Vietnam 2026 AI Projects That Get You Hired)

Vietnam market 2026: Backend roles = 37% of IT demand, AI engineers exploding. Companies need Node devs who can **build fast AI backends** for fintech (ZaloPay, Momo), e-commerce (Shopee, Tiki), and outsourcing (FPT, VTI). Salaries: Junior ~12–25M VND, Senior 40–55M+ VND (ITviec 2025-2026 report). AI skill premium = +15–20%.

**Project that lands jobs right now:** Build an **AI Chat Proxy Server** (exactly what outsourcing clients ask):

JavaScript

```
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/chat' && req.method === 'POST') {
    // Forward to OpenAI/Groq with streaming
    const options = { /* your AI endpoint */ };
    const proxy = http.request(options, aiRes => {
      res.writeHead(aiRes.statusCode, aiRes.headers);
      aiRes.pipe(res); // ← this is the 2026 golden line
    });
    req.pipe(proxy); // client → AI
  }
});
server.listen(3000);
```

Why this wins interviews:

- Handles SSE streaming (LLM tokens arrive chunk-by-chunk).
- Zero extra memory.
- Add rate-limiting, auth, Vietnamese UTF-8 logging → you look senior.

**Common production problems you should practice fixing:**

- Unhandled stream errors → server crash (fix: req.on('error', ...) + process.on('uncaughtException')).
- Large JSON from AI tools → OOM (fix: stream parsers).
- Vietnamese charset issues → use Buffer + utf8.
- High concurrency (10k req/s) → cluster + PM2 or move to Fastify (but know why raw http is faster).

### 4. How to Prepare & Stand Out in Vietnam Interviews 2026

- **Daily practice**: Rebuild the exact echo server from the official page, then add streaming AI proxy, then add rate-limit + Redis.
- **Frameworks on top**: Fastify > Express (faster in AI era). Interviewers ask “Why Fastify?” → because it uses streams natively.
- **Tools**: Postman + Wireshark (see raw HTTP), Artillery for load test.
- **Portfolio**: GitHub repo “ai-proxy-node-http” with README showing 2x faster streaming than Express version.
- **Bonus edge**: Mention HTTP/3 (QUIC) + Node 22+ native fetch for AI edge deployments (many VN outsourcing clients moving to Vercel/Cloudflare).

Master this one module + streaming = you beat 80% of candidates who only know app.post('/api', ...).

In 2026 AI Vietnam, the winners are devs who understand **the pipe between client and LLM** at the HTTP level. That’s exactly what the page you read teaches.

Go code the proxy tonight — you’ll thank me in your next FPT or foreign outsourcing interview. Good luck!