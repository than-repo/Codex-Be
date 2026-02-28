1/What is Polymorphism?
**Part 1 – Core Polymorphism (say this first – pure OOP, no Node.js yet)**

“Polymorphism is one of the four fundamental pillars of OOP. The word means **‘many forms’**.

It allows objects of **different classes** to be treated as objects of **a common parent class or interface**, while each class can implement the same method in its own specific way.

This gives us flexibility — we can write code that works with any class that follows the same contract, without knowing the exact type at compile time.”

(Stop here. Pause. Let interviewer react.)

**Part 2 – Node.js/NestJS (say this only if they ask “how about in Node.js?” or “give example”)**

“In Node.js and NestJS, we apply it mainly through **interfaces** and **method overriding**. For example, we create IPaymentService interface, then StripeService and VNPayService both implement it differently. Thanks to NestJS Dependency Injection, we can inject the interface anywhere, and the correct implementation runs at runtime. This makes the system very flexible and easy to extend.”