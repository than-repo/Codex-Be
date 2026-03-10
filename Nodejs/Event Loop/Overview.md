> "The Event Loop is the heart of Node.js that makes it non-blocking and allows it to handle many concurrent operations with just a single thread.
> 
> "Node.js uses the **libuv** library under the hood, which provides the event loop and the thread pool.
> 
> The event loop has several phases — and they run in this fixed order in every **tick**:

1. **Timers** → executes setTimeout() and setInterval() callbacks that are ready
2. **Pending callbacks** → some OS-level callbacks (e.g. TCP errors)
3. **Idle, Prepare** → internal
4. **Poll** → most important phase — retrieves new I/O events, executes I/O callbacks (fs.readFile, http, etc.)
5. **Check** → setImmediate() callbacks
6. **Close callbacks** → e.g. socket.on('close')

> Between phases (mostly after Poll), it also does:
> 
> - Microtask queue → process.nextTick() and Promise callbacks (.then, .catch, await)

> So the correct order of execution is usually remembered like this:

text

```
call stack → microtasks (nextTick + promises) → event loop phases (timers → poll → check …)
```

> That's why setImmediate() and setTimeout(..., 0) **do not** have predictable order — it depends on when the poll phase finishes."

Add one or more of these:

- "process.nextTick() has **higher priority** than any event loop phase — it runs **before** the next event loop tick even starts."
- "Microtasks (promises) run **after** the current operation but **before** the next event loop phase."
- "That's why doing while(true) inside nextTick or recursive nextTick can **starve** the event loop."
- "The **Poll** phase is special — if there are no timers, it can wait indefinitely for new I/O (that's why Node is so good at I/O-heavy apps)."
- "In Node 11+ the behavior of setTimeout(0) vs setImmediate() became **more deterministic** in many cases, but you still shouldn't rely on their order."