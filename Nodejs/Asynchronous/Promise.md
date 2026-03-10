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

Promise.all()

definition
.all() is function
accept an array of Promises
return
	resolve once all promises are fulfilled
	reject if any promise is rejected. 
Even if rejection occurs, the rest of promises continue to execute. That can strain the system's memory.


