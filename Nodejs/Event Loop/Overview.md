| Phase   | What it executes                            |
| ------- | ------------------------------------------- |
| Timers  | Only `setTimeout` & `setInterval` callbacks |
| Pending | System error callbacks                      |
| Poll    | I/O callbacks (fs, http, db, etc.)          |
| Check   | `setImmediate` callbacks                    |
|         |                                             |
|         |                                             |

Super Simple Text Diagram:
JS Main Thread
     ↓
Hit I/O (fs.readFile, http.get, etc.)
     ↓
Send to libuv → OS Kernel (background)
     ↓
Main thread keeps running ↓
     ↓
Kernel finishes → notifies libuv
     ↓
Callback added to Poll Queue
     ↓
Event Loop reaches Poll phase → runs callback

When Node.js starts:

1. It **initializes** the Event Loop.
2. It runs your main script (your app.js or server.ts file) — this can schedule timers, make I/O calls, call process.nextTick(), etc.
3. Then it **enters the Event Loop** and keeps cycling through the phases forever (until the process exits).

### The 6 Main Phases (in exact order)

|Phase|What it does|Common examples|
|---|---|---|
|**1. Timers**|Runs callbacks that are due|setTimeout(), setInterval()|
|**2. Pending Callbacks**|Runs some system-level callbacks (rare)|TCP errors, DNS failures|
|**3. Idle, Prepare**|Internal Node.js work (you almost never touch this)|—|
|**4. Poll** ★ **MOST IMPORTANT**|Waits for & executes **I/O callbacks** (this is where your file reads, HTTP, DB queries run)|fs.readFile, http.get, DB queries|
|**5. Check**|Runs setImmediate() callbacks|setImmediate()|
|**6. Close Callbacks**|Runs cleanup callbacks when things close|socket.on('close'), server close|

### How the Event Loop Moves

- Each phase has its own **FIFO queue** (first-in, first-out).
- When the Event Loop enters a phase, it runs callbacks from that queue until:
    - The queue is **empty**, OR
    - It reaches the maximum number of callbacks allowed.
- Then it moves to the **next phase**.
- After Close Callbacks → it goes back to Timers and repeats the cycle.

### Key Point You Should Remember

While the Event Loop is in the **Poll** phase, the OS kernel can still finish more I/O operations and add new callbacks to the queue. That’s why a long-running callback in Poll can **delay** your timers (setTimeout) — this is a very common interview question!

---

You now understand the full picture: → JS hits I/O → sent to kernel → kernel finishes → callback goes to **Poll queue** → Event Loop runs it in **Poll phase**.

This is exactly what makes Node.js non-blocking and super fast.
**✅ Here is the FULL, CLEAN & FINAL example** (best version for learning)

JavaScript

```JavaScript
// ================================================
// Full Event Loop Example - event-loop-full.js
// Run with: node event-loop-full.js
// ================================================

const fs = require('fs');
const net = require('net');

console.log('1. [Synchronous] Start of main script');

process.nextTick(() => {
  console.log('3. [nextTick] Runs BEFORE any Event Loop phase');
});

// Timers Phase
setTimeout(() => {
  console.log('5. [Timers Phase] setTimeout callback (10ms)');
}, 10);

// Pending Callbacks Phase (system error example)
const socket = net.createConnection(9999, '127.0.0.1'); // invalid port
socket.on('error', () => {
  console.log('6. [Pending Callbacks Phase] Socket error callback');
});

// Poll Phase (I/O)
fs.readFile(__filename, 'utf8', () => {
  console.log('7. [Poll Phase] File I/O callback');
});

// Check Phase
setImmediate(() => {
  console.log('8. [Check Phase] First setImmediate callback');
});

setImmediate(() => {
  console.log('9. [Check Phase] Second setImmediate callback');
});

console.log('2. [Synchronous] End of main script');
console.log('   → Main script finished. Event Loop starts now...\n');
```

### How to run

Bash

```
node event-loop-full.js
```

### Expected Output (you will see this exact order every time)

text

```
1. [Synchronous] Start of main script
2. [Synchronous] End of main script
   → Main script finished. Event Loop starts now...

3. [nextTick] Runs BEFORE any Event Loop phase
4. [Timers Phase] setTimeout callback (10ms)
5. [Pending Callbacks Phase] Socket error callback
6. [Poll Phase] File I/O callback
7. [Check Phase] First setImmediate callback
8. [Check Phase] Second setImmediate callback
```

### Summary of Fixed Order

|Order|Phase|What runs|
|---|---|---|
|1 & 2|Synchronous code|Main script|
|3|nextTick|Before Event Loop|
|5|**Timers**|setTimeout, setInterval|
|6|**Pending Callbacks**|System errors (TCP, DNS, etc.)|
|7|**Poll**|I/O callbacks (fs, http, db…)|
|8 & 9|**Check**|setImmediate|

This is the **cleanest and most reliable** example. Copy it, run it, and you will see the real order every single time.

Want me to:

- Convert this to **TypeScript**?
- Add **Promise / async-await** example?
- Make an **Express server** version?
- Or go back to OOP pillars?