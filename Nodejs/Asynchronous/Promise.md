### What is a Promise ?
Is a object
represent the eventual completion (or failure) of an asynchronous operation.
Promise is a placeholder for a value that's not yet available but will be in the future.

## Promise States

A Promise can be in one of three states:
Pending
Fulfilled
Rejected

### How to Import the Promise-based File System (fs.promises)

- **Import fs.promises (only 2 lines you need to remember)**
    
       
    ```JavaScript
    // Most common & recommended in 2026
    import fs from 'node:fs/promises';           // ESM (modern)
    // or
    const fs = require('node:fs/promises');      // CJS (old projects)
    ```
    
- **async/await template (copy-paste this forever)**
    
    ```JavaScript
    async function doSomething() {
      try {
        const result = await someAsyncFunction();
        // your code
      } catch (err) {
        console.error('Error:', err);
      }
    }
    
    doSomething();   // ← always call it
    ```

### Top-Level Await

### Real-world examples you'll see/use in Node apps (2026 style)

1. **Load config or env at startup**
    JavaScript
    ```JavaScript
    import fs from 'node:fs/promises';
    
    const config = JSON.parse(
      await fs.readFile('./config.json', 'utf8')
    );
    
    console.log("Config loaded:", config);
    ```

2. **Wait for DB connection before exporting**
       
    ```JavaScript
    import { connect } from './db.js';
    
    const db = await connect();  // blocks module until connected
    
    export const getUser = (id) => db.query(`SELECT * FROM users WHERE id = ${id}`);
    ```


## Advanced Promise Methods

### Promise.all()

definition
- .all() is a function
- Takes an array of promises
- Returns a new promise that
    - resolves → when **all** promises succeed (gives array of results, same order)
    - rejects immediately → if **any** one fails (gives that first error)
- Even after it rejects, the other promises **keep running** in the background
- → This can waste resources or strain memory (especially with heavy tasks)

**One-sentence summary for interview (very clean):**

"Promise.all waits for all promises to resolve and returns their results in order, but rejects as soon as the first one fails — and the other promises continue running anyway, which can be inefficient."


**Most common actual flow / what they really ask about Promise.all():**

1. **Basic definition** (very often asked, but briefly) → “Promise.all takes many promises, waits for all to resolve → returns array of results in order. Rejects immediately on first error.”
    
2. **The almost guaranteed follow-up** (very frequent) → “What happens if one promise rejects?” → or “Difference between Promise.all and Promise.allSettled?”
    
    Answer they expect:
    
    - Promise.all → rejects fast (first error wins), other promises **keep running** (not cancelled)
    - Promise.allSettled → always waits for everything, returns array of {status: 'fulfilled'/'rejected', value/reason} objects
3. **Other very common next questions** (pick 1–3 depending on level):
    
    - Difference: Promise.all vs Promise.race vs Promise.any vs Promise.allSettled
    - “Implement Promise.all() from scratch” (polyfill / hand-write it) — asked more at bigger companies
    - “How do you cancel / stop the other promises after rejection?” (realistic answer: you can’t with native Promise.all → need AbortController + custom logic)
    - “When would you choose allSettled over all in production?” (e.g. fetching dashboard widgets — you want partial results even if one API fails)
    - Edge cases: empty array? non-promise values? order of results?


### Promise.allSettled()

Definition
This method waits for all promise either resolve or reject.
return an array of objects that describe the outcome of each Promises.
array of objects like:
- { status: 'fulfilled', value: ... } for successes
- { status: 'rejected', reason: ... } for failures"


1. **They ask the basic question** → "What does Promise.allSettled do?" or "Tell me about Promise.allSettled()"
    **Your version** ("waits for all promises to either resolve or reject, returns array of objects describing outcome") is **correct and good enough** as a starting point. Interviewers accept short, accurate answers like yours.
    
2. **They almost always follow up immediately** (this is the practical part — seen in nearly every source):
    - "How is it different from Promise.all()?" (most frequent by far)
    - "When would you use .allSettled instead of .all?"
    - "What does the result look like exactly?" (they expect the {status, value/reason} format)
    - Edge: "Implement Promise.allSettled from scratch" (more at FAANG/big tech or senior roles)
    - "Give a real-world example where you'd choose allSettled"

**What interviewers expect / value most (honest from recent sources):**
- Know it **never rejects** (always resolves, even if everything fails)
- Returns array of objects: { status: 'fulfilled', value: … } or { status: 'rejected', reason: … }
- Waits for **all** to settle → no early exit
- Use case: partial results are ok (e.g., load multiple dashboard widgets → show what loaded, show errors for failed ones)
- Contrast: .all() is "all or nothing" (fast-fail), .allSettled is "give me everything anyway"

**Safe, practical answer you can give (your style + what wins points):**

"Promise.allSettled() takes an array of promises and waits until **all** of them settle — meaning each one either resolves or rejects. It always resolves with an array of objects, one for each promise:

- { status: 'fulfilled', value: result } if successful
- { status: 'rejected', reason: error } if failed

Unlike Promise.all(), it doesn't reject early if one fails — it gives you the full outcome for everything. Useful when you want partial success, like fetching multiple independent API calls for a page."


### Promise.race()
This method resolves or rejects as soon as the first promise settles.( whether it reject or resolve)
Regardless of which promise settles first, all promise are executed fully.

**One-sentence version (great for interviews):**
"Promise.race() runs promises in parallel and returns the result of the fastest one to settle — whether it succeeds or fails — ignoring the rest after that."

**Key differences from the others (interviewers love this follow-up):**

- vs Promise.all(): .all waits for **all** to succeed (rejects on first fail)
- vs Promise.allSettled(): .allSettled waits for **all** to finish (always resolves with statuses)
- vs Promise.any(): .any waits for the **first success** (ignores rejections until one succeeds; rejects only if **all** fail)
- .race() is the "first to finish wins" (success **or** failure)

**Real-world / common interview use cases (very practical):**

- Implementing **timeout** for a fetch/API call: race your real promise against a delay-that-rejects promise Example: Promise.race([fetch(url), timeoutPromise(5000)]) → fail fast if too slow
- Trying multiple servers/endpoints → take the fastest response (e.g., CDN fallback, A/B testing)
- Race conditions where you want the quickest result, don't care about others

**Short bullet-point answer you can give:**

- Takes array of promises
- Settles with the **first** one that resolves **or** rejects
- Returns its value or error
- Others continue running
- Classic use: add timeout to async operations


### Promise.any()
This method resolves as soon as one of the Promises resolves.
If all promises rejected, it will reject with an AggregateError

**Key differences (interviewers ask this next almost always):**

- vs Promise.all(): .all needs **all** to succeed (rejects on first fail)
- vs Promise.allSettled(): .allSettled waits for **all** to finish (always resolves with statuses)
- vs Promise.race(): .race settles with **first to finish** (win or lose)
- .any() is "first success wins" (ignores rejections, opposite of .all())

**Real-world / common interview use cases (practical examples from recent sources):**

- Fetching the same data from multiple APIs/backups/CDNs → take the fastest successful response (e.g., primary server, fallback server, cache)
- Redundant services/microservices → get data from whichever responds first successfully
- Resilient queries where partial failures are ok, but you need at least one good result

**Short bullet-point answer you can give:**

- Takes array of promises
- Resolves with the **first** successful value
- Ignores rejections until **all** fail
- Rejects only if **every** promise rejects (with AggregateError of all errors)
- Use case: try multiple sources, return the quickest good one