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

5. **Give a real NestJS example of abstraction.** → “I create IUserRepository interface so my service depends only on the contract. I can swap Prisma → TypeORM → Mongo without changing any service code.”

1/ What is abstraction?
“Abstraction is one of the four fundamental pillars of Object-Oriented Programming.

It means **hiding the complex internal implementation details** and **exposing only the necessary and relevant features** — the ‘what’ — to the user.

In short, abstraction focuses on **what** an object does, rather than **how** it does it.

We usually achieve this using abstract classes or interfaces.”

(You can stop here — it’s clean and confident)

**One-sentence version (if they say “in one sentence”):**

“Abstraction is hiding the complex internal implementation details and exposing only the essential features so that we focus on what an object does, rather than how it does it.”

**Real-world example of Abstraction:**

“A very common real-world example is driving a car.

As a driver, you only interact with the **steering wheel, accelerator, and brake pedal**. You don’t need to know or care about how the engine converts fuel into motion, how the transmission works, or what’s happening inside the brakes.

You just press the pedal and the car moves.

All the complex internal details are **hidden** so you can focus on the simple interface. This is exactly what abstraction does in OOP — it hides the complexity behind a clean, simple interface (like an abstract class or interface in code).

And unlike encapsulation, here the complexity is hidden mainly for simplicity and ease of use, not for protection.”

2/

| Aspect       | **Abstraction**                                 | **Encapsulation**                          |
| ------------ | ----------------------------------------------- | ------------------------------------------ |
| Focus        | Hide complexity → show only essential interface | Hide data → protect internal state         |
| Level        | Design level                                    | Implementation level                       |
| How achieved | Abstract classes, Interfaces                    | private / #private + public methods        |
| Solves       | “Too many details” problem                      | “Invalid data / direct tampering” problem  |
| Real-world   | TV remote (only power, volume, channel)         | Medicine capsule (chemicals hidden inside) |
| In NestJS    | Service interfaces, Repository interfaces       | Private fields in @Injectable() classes    |

"Sure, Abstraction and Encapsulation are both OOP principles that involve hiding information, but they focus on different things and operate at different levels. Let me compare them step by step.

First, on **focus**: Abstraction hides complexity by showing only the essential interface to the user — like, you don't need to know the inner workings, just how to use it. Encapsulation, on the other hand, hides data to protect the internal state, making sure nothing messes with it directly.

In terms of **level**: Abstraction is more about the design level, where you're planning the overall structure. Encapsulation is at the implementation level, dealing with how the code actually works under the hood.

**How they're achieved**: For Abstraction, we use things like abstract classes or interfaces to define what needs to be done without the details. For Encapsulation, it's through private or protected access modifiers combined with public methods that control access.

What **problems do they solve**? Abstraction tackles the 'too many details' issue, simplifying things for the user. Encapsulation prevents invalid data or direct tampering, keeping the internal state safe and consistent.

A **real-world example** for Abstraction is a TV remote — you only see buttons for power, volume, and channel; the complex electronics are hidden. For Encapsulation, think of a medicine capsule: the chemicals are hidden inside, protected, and you interact with it safely through the outer shell."