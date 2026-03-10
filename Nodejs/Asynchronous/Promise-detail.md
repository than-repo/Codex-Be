
### The 3 most worth-memorizing Promise patterns
### Pattern 1: Creating a new Promise (the foundation)

**Memorize this because** every custom Promise starts here — you’ll use it to wrap callbacks, events, timeouts, manual control logic, etc.

JavaScript

```JavaScript
const myPromise = new Promise((resolve, reject) => {  // executor function — runs immediately
  // your logic (sync or async)
  setTimeout(() => {
    const success = Math.random() > 0.3;           // example condition

    if (success) {
      resolve("Everything worked! 🎉");           // fulfill → .then() or await gets value
    } else {
      reject(new Error("Failed on purpose"));     // reject → .catch() or try/catch gets error
    }
  }, 1200);
});
```

### Pattern 2: Consuming a Promise with async/await (daily bread & butter)

**Memorize this because** this is how you write almost all async code in Node.js apps today — clean, readable, error-safe.

JavaScript

```JavaScript
async function usePromise() {
  try {
    const result = await somePromiseFunction();   // ← pause here until resolved
    console.log("Success:", result);              // value from resolve()
    
    // more awaits possible
    const second = await anotherPromise();
    console.log(second);
  } catch (err) {
    console.error("Failed:", err.message);        // catches any reject() or thrown error
    // optional: handle / retry / rethrow
  }
}

usePromise();   // call it (returns Promise automatically)
```

### Pattern 3: Running multiple Promises in parallel with Promise.all

**Memorize this because** parallel execution is one of the biggest performance wins in Node — fetching many things at once (files, APIs, DB queries) without sequential waiting.

JavaScript

```JavaScript
async function fetchAll() {
  try {
    const [file1, file2, apiData] = await Promise.all([     // ← all or nothing
      fs.readFile('config.json', 'utf8'),                   // rejects → whole Promise.all rejects
      fs.readFile('users.json', 'utf8'),
      fetch('https://api.example.com/data').then(r => r.json())
    ]);

    console.log("All done in parallel:", { file1, file2, apiData });
  } catch (err) {
    console.error("One or more failed:", err);
  }
}

fetchAll();
```

Bonus tiny variant you’ll see constantly (map + Promise.all):

JavaScript

```js
const results = await Promise.all(
  items.map(item => processItemAsync(item))   // runs all in parallel
);
```

These three patterns are the core “building blocks”. Master them (copy-paste + understand the resolve/reject/await/try-catch/Promise.all flow) and you can handle 90%+ of Promise-related code you’ll ever write or debug.



### Priority Ranking (2026 Node.js reality)

1. **Promise.all() + async/await version** — Highest priority (daily + interviews)
    - Use when **all tasks must succeed** (parallel loading of critical data)
    - Real work: Fetch multiple APIs/files/DB queries at once → fastest when everything is required
    - Interview favorite: "How do you load user profile + settings + posts in parallel?"
    - Pattern to practice:
        
        JavaScript
        
        ```js
        const [user, settings, posts] = await Promise.all([
          getUser(id),
          getSettings(id),
          getPosts(id)
        ]);
        ```
        
    - Gotcha: Rejects fast on first error → good for "fail fast"
2. **Promise.allSettled()** — Very high (resilient batch jobs)
    - Use when **you want all results regardless of failures** (partial success OK)
    - Real work 2026: Batch processing (send emails, update multiple records, analytics pings, health checks), logging failures without stopping everything
    - Interview: "How do you handle partial failures in a batch API call?"
    - Pattern:
        
        JavaScript
        
        ```
        const results = await Promise.allSettled(promisesArray);
        // results = [{status:'fulfilled', value:…}, {status:'rejected', reason:…}]
        ```
        
3. **Promise.any()** — Medium-high (growing in 2025–2026)
    - Use when **first success wins** (redundancy/failover)
    - Real work: Hit multiple CDNs/mirrors, fallback APIs, fastest server response
    - Interview: "Implement retry with fallback endpoints"
    - Pattern:
        
        JavaScript
        
        ```
        const fastest = await Promise.any([
          fetchFromPrimary(),
          fetchFromMirror1(),
          fetchFromMirror2()
        ]);
        ```
        
4. **Promise.race()** — Medium (niche but classic)
    - Use for **timeout** or **first to respond** (including errors)
    - Real work: Add timeout wrapper around slow operations
    - Interview: "Implement a promise with timeout"
    - Pattern: Promise.race([task, timeoutPromise])
5. **Promise.resolve() / Promise.reject()** — Low-medium
    - Quick wrappers (e.g., return Promise.resolve(value) in sync code)
    - Useful in utils/helpers
6. **Promise.withResolvers()** — Emerging but low frequency now
    - New (2024+), nice for event-based or manual control (e.g., expose resolve from outside)
    - Real work: Rare in most apps, more in libs or advanced patterns
    - Interview: Might appear in "advanced async" questions
7. **Promise.try()** — Very low / almost never in Node 2026
    - Not native yet (proposal stage or polyfill), rarely mentioned in current docs/interviews
    - Skip for now unless you see it in a specific library