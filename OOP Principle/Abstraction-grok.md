**Abstraction** is the second core pillar of OOP (after Encapsulation) and one of the **most frequently confused** topics in interviews.

Interviewers love asking: “Explain abstraction and how it is different from encapsulation” or “How do you apply abstraction in a real NestJS service?”

Here’s the **deep, interview-ready** breakdown tailored for you (Java/C++ background + NestJS/Node.js).

![What are four basic principles of Object Oriented Programming? | by Munish  Chandel | Medium](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRve2q4lxIJ4F0Gm1picaZihEDe2b8nTX7DDg&s)

[medium.com](https://medium.com/@cancerian0684/what-are-four-basic-principles-of-object-oriented-programming-645af8b43727)

![Introduction to Object Oriented Programming (OOP) in Golang | Arsh Sharma](https://arshsharma.com/posts/2024-12-16-oops-golang/oops.png)

[arshsharma.com](https://arshsharma.com/posts/2024-12-16-oops-golang/)

### Precise Definition (What Interviewers Expect You to Say)

**Abstraction** means **hiding the complex internal implementation details** and exposing only the **necessary and relevant features** (the “what”) to the user.

It focuses on **“what an object does”** rather than **“how it does it”**.

### Short one-sentence version (great when they say “tell me in one sentence”)

“Abstraction is hiding the complex implementation details and showing only the essential features so that the user interacts with what the object does, not how it does it.”

### Other

You create a **simple, high-level interface** so the consumer doesn’t need to know or care about the low-level complexity.

**Key point to always mention** (this separates average from strong candidates): Abstraction is achieved at the **design level** (using abstract classes or interfaces), while encapsulation is achieved at the **implementation level** (private fields + getters/setters).

![Difference between Abstraction vs Encapsulation in Java - Dinesh on Java](https://i0.wp.com/www.dineshonjava.com/wp-content/uploads/2017/04/Difference-between-Abstraction-vs-Encapsulation.png?fit=784%2C369&ssl=1&resize=1280%2C720)

[dineshonjava.com](https://www.dineshonjava.com/difference-between-abstraction-and-encapsulation-in-java/)

![50+ OOP Interview Questions and Answers in 2026](https://cdn.hackr.io/uploads/posts/attachments/16405260789srwTTtXQL.png)

[hackr.io](https://hackr.io/blog/oop-interview-questions)

### Classic Car Analogy (Use This – Interviewers Love It)

**Encapsulation** = The engine, wires, and ECU are **hidden inside** a metal box (private). You can’t touch them directly → protects the data.

**Abstraction** = You only see the **steering wheel, accelerator, and brake pedal**. You don’t need to know how the engine converts fuel into motion — you just press the pedal and the car moves. The complexity is hidden **for simplicity**, not just for protection.

![Design Patterns vs Object Oriented Programming: Simple Guide with Real  Examples | FAUN.dev() 🐾](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYwNfit6h9P6IBMzaPS-PEg7bcpIYfmMTgg&s)

[faun.pub](https://faun.pub/object-oriented-programming-oop-vs-design-patterns-simple-guide-with-real-examples-for-fb99f3bca2e4)

![What is object-oriented programming? OOP explained in depth - DEV Community](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fbz2fv071s1mzg9uyaal6.png)

[dev.to](https://dev.to/educative/what-is-object-oriented-programming-oop-explained-in-depth-7nn)

### Abstraction vs Encapsulation (Most Common Trap Question)

| Aspect       | **Abstraction**                                 | **Encapsulation**                          |
| ------------ | ----------------------------------------------- | ------------------------------------------ |
| Focus        | Hide complexity → show only essential interface | Hide data → protect internal state         |
| Level        | Design level                                    | Implementation level                       |
| How achieved | Abstract classes, Interfaces                    | private / #private + public methods        |
| Solves       | “Too many details” problem                      | “Invalid data / direct tampering” problem  |
| Real-world   | TV remote (only power, volume, channel)         | Medicine capsule (chemicals hidden inside) |
| In NestJS    | Service interfaces, Repository interfaces       | Private fields in @Injectable() classes    |

### How to Achieve Abstraction (Code Examples)

#### 1. Java (Your University Strength)

Java

```Java
// Abstraction using Interface (100% abstract)
public interface PaymentService {
    void processPayment(double amount);   // only signature
    String getStatus();
}

// Abstraction using Abstract Class (partial implementation)
public abstract class AbstractPaymentService implements PaymentService {
    protected double balance;   // shared state

    public abstract void processPayment(double amount); // still abstract

    public String getStatus() {   // concrete method
        return "Balance: " + balance;
    }
}

public class CreditCardService extends AbstractPaymentService {
    @Override
    public void processPayment(double amount) {
        // complex Stripe + fraud check logic hidden
        System.out.println("Processing credit card...");
    }
}
```

#### 2. C++ (University Style)

C++

```C++
class PaymentService {          // Abstract class
public:
    virtual void processPayment(double amount) = 0;  // pure virtual
    virtual std::string getStatus() = 0;
    virtual ~PaymentService() = default;
};

class CreditCardService : public PaymentService {
public:
    void processPayment(double amount) override {
        // implementation hidden
    }
    std::string getStatus() override { return "OK"; }
};
```

#### 3. TypeScript / NestJS (What You’ll Actually Use in Interviews)

TypeScript

```TypeScript
// 1. Interface (most common in NestJS - 100% abstraction)
export interface IPaymentService {
  processPayment(amount: number): Promise<PaymentResult>;
  getStatus(): string;
}

// 2. Abstract class (when you want shared code)
export abstract class BasePaymentService implements IPaymentService {
  protected balance: number = 0;

  abstract processPayment(amount: number): Promise<PaymentResult>;

  getStatus(): string {
    return `Balance: ${this.balance}`;
  }
}

// Concrete implementation
@Injectable()
export class StripePaymentService extends BasePaymentService {
  async processPayment(amount: number): Promise<PaymentResult> {
    // All Stripe SDK, webhooks, retry logic is hidden here
    console.log('Calling Stripe API...');
    this.balance += amount;
    return { success: true, transactionId: 'tx_123' };
  }
}
```

**In NestJS you inject via interface** (best practice):

TypeScript

```TypeScript
constructor(@Inject('IPaymentService') private paymentService: IPaymentService) {}
```

This is **pure abstraction** — your controller doesn’t know if it’s Stripe, PayPal, or even a fake mock.

### Benefits (Mention These)

- Reduces complexity → easier to understand and maintain large systems
- Promotes loose coupling (you depend on interface, not concrete class)
- Enables polymorphism (same interface, different implementations)
- Makes code extensible (add new payment method without changing existing code)
- Improves testability (easy to mock interfaces in NestJS)

### Drawbacks / Advanced Trade-offs (Shows Senior Thinking)

- Over-abstraction → “interface hell” (too many tiny interfaces)
- Slight performance cost (virtual method calls in C++/Java, negligible in JS)
- Can hide too much → debugging becomes harder

**Best Practices in NestJS (2026)**

- Always code against **interfaces** (IPaymentService, IUserRepository)
- Use abstract classes only when you need shared implementation
- Keep interfaces small (Interface Segregation Principle – part of SOLID)
- Use NestJS @Injectable() with custom tokens for abstraction

### Common Interview Questions & Model Answers

1. **What is abstraction?** → Use the definition + car analogy + one-line code example.
2. **Difference between abstraction and encapsulation?** → Show the table above + “Abstraction is for the user, encapsulation is for the developer.”
3. **How do you achieve abstraction in TypeScript/NestJS?** → Show the IPaymentService example above.
4. **Abstract class vs Interface?** (Very common)

| Feature                 | Abstract Class         | Interface                           |
| ----------------------- | ---------------------- | ----------------------------------- |
| Can have implementation | Yes (partial)          | No (until TS 5.0+ abstract methods) |
| Can have fields         | Yes                    | No (only in TS)                     |
| Multiple inheritance    | No (single extends)    | Yes (multiple implements)           |
| Use case                | Shared code + template | Contract / pure abstraction         |
|                         |                        |                                     |


### 1. Overall Comparison (General OOP Concept)

|Feature|**Interface**|**Abstract Class**|
|---|---|---|
|**Purpose**|Define a **contract** (what must be done)|Provide **partial implementation** + contract|
|**Implementation**|Only method signatures (no body)|Can have both abstract methods + **concrete methods**|
|**Fields / Properties**|Only constants (in most languages)|Can have fields, properties, constructors|
|**Access Modifiers**|Only public|public, protected, private|
|**Inheritance**|Multiple (a class can implement many interfaces)|Single (a class can extend only **one** abstract class)|
|**Instantiation**|Cannot create object|Cannot create object (abstract)|
|**When to use**|Define capabilities / behaviors|Share common code + enforce structure|

**Simple rule of thumb**:

- **Interface** → “What” (pure contract)
- **Abstract Class** → “What + some How” (partial code reuse)

---

### 2. In Node.js (TypeScript / JavaScript) — Very Important!

TypeScript adds some special differences because it compiles to plain JavaScript.

|Feature|**Interface** (TS)|**Abstract Class** (TS)|
|---|---|---|
|**Exists at runtime?**|**No** (completely erased after compile)|**Yes** (becomes real JS class)|
|**Bundle size**|Smaller (better for performance)|Slightly bigger|
|**Can use instanceof?**|No|Yes|
|**Access modifiers**|Only public|public / protected / private|
|**Can have constructor**|No|Yes|
|**Can have implemented methods**|No|Yes|
|**Multiple "inheritance"**|Yes (extend multiple interfaces)|No (only one abstract class)|
|**Declaration merging**|Yes (very powerful in TS)|No|
|**Best for**|DTOs, API contracts, Repository, Services contracts|Base services, shared logic, Template Method pattern|

**Real-world Node.js advice (2026 best practices)**:

**Use Interface when**:

- You define types for API responses / requests
- Repository / Service contracts (for dependency injection)
- You want multiple unrelated classes to follow the same shape
- You want clean, small compiled JavaScript

**Use Abstract Class when**:

- You have common logic to share (e.g., logging, error handling, database connection setup)
- You need protected methods or properties
- You want to use super() or constructor logic
- You are building a base class for controllers/services (e.g., BaseService)

---

### Code Examples in TypeScript (Node.js)

TypeScript

```
// ==================== INTERFACE ====================
interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
}

// Multiple interfaces → no problem
interface Logger {
  log(message: string): void;
}

class UserRepo implements UserRepository, Logger {
  // must implement all methods
}

// ==================== ABSTRACT CLASS ====================
abstract class BaseService {
  protected logger: Logger;           // protected is allowed

  constructor(logger: Logger) {
    this.logger = logger;
  }

  // Concrete method (shared code)
  protected logOperation(operation: string) {
    this.logger.log(`Operation: ${operation}`);
  }

  // Abstract method (must be implemented by child)
  abstract execute(): Promise<void>;
}

class UserService extends BaseService {
  execute() {
    this.logOperation("Get User");   // reuse from parent
    // ...
  }
}
```

---

### Interview Answer Template (you can say this)

> "In general OOP, **Interface** is a pure contract while **Abstract Class** allows partial implementation. In TypeScript (Node.js), the biggest difference is that **interfaces are compile-time only** (no runtime cost), while **abstract classes exist at runtime** and support instanceof, protected members, and shared logic. I usually use **interfaces** for contracts and dependency injection, and **abstract classes** when I need to share common code between related services."

---

Would you like me to:

1. Give you **real Node.js project examples** (e.g., Express + Prisma + Repository pattern)?
2. Show **when to choose one over the other** with 5 common scenarios?
3. Prepare the **full spoken answer** for interview (1–2 minutes version)?

Just say the number or “give me all” and I’ll send it right away.

You’re asking the exact right questions — keep going! Your interview prep is getting very strong 🔥
5. **Give a real NestJS example of abstraction.** → “I create IUserRepository interface so my service depends only on the contract. I can swap Prisma → TypeORM → Mongo without changing any service code.”

### Final Interview Tips

- Always say: “Abstraction helps us follow the **Dependency Inversion Principle** (DIP) — high-level modules depend on abstractions, not concrete implementations.”
- Draw the diagram on whiteboard: Controller → Interface → Concrete Service.
- If they ask for code, start with the **interface** first, then implementation.

Your OOP foundation is getting stronger every step. You already mastered encapsulation conceptually — abstraction is the natural next layer.

Would you like me to: A) Give you **3 polished spoken answers** for “Explain abstraction” (short/medium/detailed) B) Practice the **exact follow-up** they always ask after this (“Difference from encapsulation”) C) Move to the next pillar: **Inheritance** (or directly to SOLID since you use NestJS)

Just say A, B, or C and we continue the drill. You’re building a very strong profile for NestJS interviews! 🔥