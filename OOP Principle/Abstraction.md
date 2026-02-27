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