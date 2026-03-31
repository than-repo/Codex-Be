1. **Put all synchronous code that does NOT depend on async results BEFORE any async operation starts.**
    
    - This is safe and common (e.g., load config sync → then start async server/database calls).
    - Once you call anything async, **everything after it in the same scope runs immediately** (before the async finishes).
2. **Any code that DEPENDS on the result of an async operation MUST be placed INSIDE its completion handler.**
    
    - In callbacks: inside the callback function
    - In Promises: inside .then() / .catch()
    - With async/await: after an await (inside an async function)
    
    If you put sync code right after an async call (without awaiting or .then), it **will run too early** — that's the classic bug (file deleted before read, variable undefined, etc.).
    

**Real-world one-sentence summary everyone agrees on:**

**Either keep the entire flow synchronous, or make the entire flow asynchronous — never half-and-half in the same sequential block.**

- Preferred modern way: go full async/await everywhere possible (cleanest, least error-prone).
- Avoid .sync methods almost always (they block the event loop → kill performance in servers).
- Mixing is only "safe" in very limited cases (startup config, CLI tools, tests) — and even then people usually regret it later.

Your understanding is solid


### Example

### Classic production bug pattern (very common in file cleanup / temp files)

Many apps (e.g., upload handlers, report generators, thumbnail services) hit this:

JavaScript

```js
// WRONG — seen in countless real projects (including SO questions & personal war stories)
app.post('/upload', (req, res) => {
  // ... receive file, save to temp path
  const tempPath = '/tmp/uploaded-' + Date.now() + '.pdf';

  fs.writeFile(tempPath, req.body.fileData, err => {
    if (err) return res.status(500).send('Write failed');

    // Process / read the file async
    fs.readFile(tempPath, (readErr, data) => {
      if (readErr) return res.status(500).send('Read failed');

      // ... do something with data (parse PDF, generate thumbnail, etc.)
      console.log('Processed', data.length, 'bytes');

      // Cleanup — but this runs BEFORE readFile callback in most cases!
      fs.unlinkSync(tempPath);   // ← file often deleted here → readFile gets ENOENT or partial read
    });
  });

  res.send('Upload received');   // ← even worse, response sent way too early
});
```

**Real-world consequences reported**:

- Intermittent ENOENT: no such file or directory on read → failed processing / 500 errors under load
- Corrupted / incomplete thumbnails or parsed data (file truncated mid-read)
- Seen in production upload APIs, PDF invoice processors, image resize services

**Fix actually used in production** (full async chain):

JavaScript

```js
app.post('/upload', async (req, res) => {
  const tempPath = `/tmp/uploaded-${Date.now()}.pdf`;

  await fs.promises.writeFile(tempPath, req.body.fileData);

  const data = await fs.promises.readFile(tempPath);
  // process data...

  await fs.promises.unlink(tempPath);   // now guaranteed after read

  res.send('OK');
});
```


### Another frequent real-world case: Config + async server start

Seen in Express/Koa apps that crash or behave weirdly on restart:

JavaScript

```js
// Common mistake in older production apps
const config = JSON.parse(fs.readFileSync('config.json'));  // sync → ok if small

app.listen(3000, () => {
  console.log('Listening');
});

db.connect();   // async, but code after this assumes config is fully loaded
// → race: sometimes db.connect runs before config parse finishes (very rare but devastating)
```

**Real reports**: Startup fails with undefined config values, or db connects with stale/wrong settings → data corruption or auth failures.

**Production fix**: Move sync to top (independent), or go full async:

JavaScript

```js
(async () => {
  const configRaw = await fs.promises.readFile('config.json', 'utf8');
  const config = JSON.parse(configRaw);

  // now safe
  await db.connect(config.db);
  app.listen(3000);
})();
```

### Sync blocking inside async flow (high-impact perf bug)

From real war stories (Medium posts by senior devs):

JavaScript

```js
async function handleManyFiles() {
  const files = await getFileList();   // async

  files.forEach(file => {
    const content = fs.readFileSync(file);   // ← blocks event loop for each file!
    process(content);
  });

  // under load → entire server freezes for seconds per request
}
```

**Real damage**:

- One dev reported ~$100k lost revenue from frozen Node servers during peak (single readFileSync in hot path)
- Another: API response time jumped from 50ms → 5+ seconds under concurrent requests

**Production fix**:

JavaScript

```js
const contents = await Promise.all(
  files.map(file => fs.promises.readFile(file))
);
```