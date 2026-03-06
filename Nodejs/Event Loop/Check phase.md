**What is it?** The phase dedicated to executing callbacks scheduled with **setImmediate()**.

**Core meaning & purpose**:

- setImmediate(callback) schedules a callback to run **immediately after the current poll phase finishes** — in its own separate phase called **check**.
- Unlike timers (setTimeout/setInterval), setImmediate has **no delay threshold** — it’s designed to run **as soon as possible after I/O (poll) work is done**, without waiting for new events.
- It’s a way to **defer execution until after the current event loop “turn”** (after poll), but **before** the next full loop starts.

Interview one-liner: "The check phase executes callbacks scheduled via setImmediate(). It runs immediately after the poll phase completes if any were queued, allowing code to defer execution until after current I/O work without blocking or waiting for new events."