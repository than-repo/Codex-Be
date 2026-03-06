1/What is encapsulation?
Encapsulation is one of the four fundamental pillars of OOP.
It has two closely related aspects.: Bundling and Data hiding.

Bundling means wrapping data( fields/attribute) and behavior(methods) that operate on that data into a single unit, such as class.

Data hiding means the internal state of the object is hidden from outside world. External code can't access and modify it directly. Instead, They must go through controlled public interfaces such as method or getters/setters.

2/Difference between encapsulation and abstraction? → "Abstraction is about hiding complexity (what), encapsulation is about hiding implementation (how) and protecting data."

3/How do you achieve encapsulation in JS/TS?
"Encapsulation in JavaScript can be achieved in several ways depending on the era and whether we're using TypeScript or plain JS.

In **modern JavaScript (ES2022+)** and TypeScript, we use the **#private field syntax** (true runtime privacy) or TypeScript’s private modifier.

Here’s a clean example:"

TypeScript

```ts
// TypeScript version (most common in interviews)
class BankAccount {
    private id: string;           // TS private (compile-time only)
    #balance: number;             // True private field (runtime privacy, works in JS too)
    public readonly name: string; // immutable public field

    constructor(id: string, initialBalance: number, name: string) {
        this.id = id;
        this.#balance = Math.max(initialBalance, 0);
        this.name = name;
    }

    // Controlled public interface
    public getBalance(): number {
        console.log("Performing validation and logging...");
        // You can add any business rules here
        return this.#balance;
    }

    public deposit(amount: number): void {
        if (amount <= 0) throw new Error("Deposit must be positive");
        this.#balance += amount;
    }

    public withdraw(amount: number): boolean {
        if (amount <= 0 || amount > this.#balance) return false;
        this.#balance -= amount;
        return true;
    }
}

// Usage
const acc = new BankAccount("123", 500, "John");
console.log(acc.getBalance());   // works
// console.log(acc.#balance);    // SyntaxError - truly private
// acc.balance = -1000;          // Error in TS, or ignored in plain JS if using only #
```

---

### Full Spoken Answer You Should Give (≈40–50 seconds)

"Encapsulation in JavaScript is achieved by **hiding internal state** and exposing only a controlled public interface.

In plain modern JavaScript (ES2022+), we use the **hash #private syntax**, which provides real runtime privacy — even subclasses and external code cannot access #balance.

In TypeScript, we can additionally use the private keyword, which gives us compile-time safety.

So in this BankAccount example:

- id and #balance are private/hidden.
- name is intentionally public and immutable (readonly).
- External code cannot directly read or modify balance.
- All interaction happens through getBalance(), deposit(), and withdraw() — where I can put validation, logging, authorization, etc.

This way, I can completely change how balance is stored internally (e.g. switch to BigDecimal or even a Map) without breaking any code that uses the class."