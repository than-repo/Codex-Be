What is the Timers phase?
Timer phase is phase where callback scheduled by setTimeOut() or setInterval() are executed.
These callback only run when even loop reach Timer phase and Timer's mininal delay threshold has already passed.

Ex:
```js
setTimeout(() => console.log('Timer!'), 100);

fs.readFile('/file', () => {
  while (Date.now() - start < 10) {}
});
```


First, the setTimeOut is registered at time 0 with delay 100ms. Its callback console.log('Timer!') will be executed at least 100ms.

Next, fs.readFile is called. Node.js offloads the file reading task to the libuv the pool, so the event loop continues running without blocking.

When the OS finishes the file reading, it notifies Nodejs. then Nodejs places the fs.readFile callback into Poll queue.

During the poll phase, the callback is executed on main thread. The entire event loop is blocked during that time.

As a result, even if the timer has already expired, its callback cannot run until the blocking operation finish.


**Most important facts for interviews (top points interviewers test):**

1. **Timers are not precise / guaranteed timing**
    - They provide a **minimum delay**, not exact execution.
    - Actual execution can be **delayed** by:
        - Other callbacks running (especially long ones)
        - OS scheduling
        - I/O activity in the **poll phase**
    - Classic example: A 100 ms timeout can easily fire at 105–150 ms (or much later under load).
2. **Poll phase controls when timers are executed** (the trickiest & most asked point)
    - Technically, the **poll phase** (which handles I/O callbacks) decides **when** the timers phase gets another chance to run.
    - If poll has work (I/O callbacks) → it runs them first → can delay return to timers.
    - If poll queue is empty → poll may **wait** (block briefly) until the next timer threshold is reached → then exit poll and go to timers to fire it.
    - Long-running I/O callbacks in poll → starve / delay timers.
    - Official phrase: "Technically, the poll phase controls when timers are executed."
3. **Important change since Node.js 20 (libuv 1.45+)**
    - Timers now run **only after the poll phase** (not before and after like in older versions).
    - This makes timing slightly more predictable in I/O-heavy apps and affects order vs. setImmediate().
4. **Quick comparison table (interview gold)**

|API|Phase executed in|Minimum delay|Typical use case|Precision|
|---|---|---|---|---|
|setTimeout|**timers**|Yes|Delay work (retries, debounce)|Approximate|
|setInterval|**timers**|Yes|Repeat periodically|Approximate|
|setImmediate|**check**|No delay|After current poll / I/O|Runs soon after poll|
|process.nextTick|Before any phase (microtask)|No delay|Highest priority deferral|Almost immediate|

**One-sentence interview answer template** (use this when asked "Explain the timers phase"):

"The timers phase executes callbacks from setTimeout and setInterval whose minimum delay threshold has passed. It's the first major phase in the event loop, but timers are **not precise** — they run as soon as possible after the threshold, though the poll phase (which handles I/O) effectively controls when the timers phase occurs next. This means a setTimeout(fn, 0) or setTimeout(fn, 100) can be delayed by ongoing I/O callbacks or system load."

**Bonus tip for your interview** If they ask for an example, mention the classic docs one (100 ms timeout + 95 ms file read + 10 ms work → fires ~105 ms) and explain why: poll ran the I/O callback → delayed return to timers.

Master these 3 ideas → timers phase, poll controls timers, not precise → and you'll handle 90% of event-loop/timer questions confidently.