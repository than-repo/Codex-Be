### What is a Callback?
### 1. What does "a callback is a function passed as an argument" actually mean?

Imagine you order food delivery:

- You **give your phone number** to the restaurant.
- You say: "Call me when the food is ready."
- Later, **they call you** (they use the number you gave them).

In JavaScript:

- You give a **function** to another piece of code (like setTimeout, addEventListener, fs.readFile).
- You say: "Run this function later when you're done / when something happens."
- When the time comes, **that function gets called** automatically.

That function you "gave away" = **the callback**.

### 2. Why can we do this in JavaScript? → Because functions are "first-class"

In JavaScript, functions are treated like normal values (numbers, strings, objects). You can:

|Ability|Example code|What it means|
|---|---|---|
|Assign function to a **variable**|const sayHi = function() { console.log("Hi"); };|The function lives inside a variable — just like a number: const age = 25;|
|**Pass** function as argument|setTimeout(sayHi, 2000);|You hand the function to setTimeout like handing a phone number|
|**Return** function from another function|function createGreeter() { return function() { console.log("Hello!"); }; }|A function can give birth to another function and hand it back|

Because of these three powers, we can **pass functions around** like any other value → that's what makes callbacks possible.

### Super simple real examples (try them in Node.js!)

**Example 1: Timer (very clear callback)**

JavaScript

```
function sayDone() {
  console.log("Timer finished!");
}

// We PASS the function sayDone to setTimeout
setTimeout(sayDone, 2000);   // "sayDone" is the callback

console.log("This prints immediately");
```

→ Output:

text

```
This prints immediately
(2 seconds later)
Timer finished!
```

**Example 2: Even shorter (anonymous function)**

JavaScript

```
setTimeout(function() {
  console.log("I'm the callback — I ran later!");
}, 1500);
```

Here the callback is created right inside the parentheses — very common style.

**Example 3: File reading in Node.js**

JavaScript

```
const fs = require('node:fs');

fs.readFile('myfile.txt', 'utf8', function(err, data) {
  // ← This whole function is the callback
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log("File content:", data);
});

console.log("Reading file... (this prints first)");
```

→ The function runs **only after** the file is read (maybe 1ms or 500ms later).

### Quick mental model

Think of it like this:

text

```
You → give function to someone/something   →   later they call it back
     (you pass it as argument)                  (they "call you back")
```

That's literally where the name **callback** comes from.

Does this make more sense now?