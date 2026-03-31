1/What is Polymorphism?
Polymorphism is one of the four fundamental pillars of OOP. It means ‘many forms’.

It allows different classes to have the **same method name**, but each class can do that method in its own way.

(Stop here. Pause. Let interviewer react.)

**Part 2 – Node.js/NestJS (say this only if they ask “how about in Node.js?” or “give example”)**

“In Node.js and NestJS, we apply it mainly through **interfaces** and **method overriding**. For example, we create IPaymentService interface, then StripeService and VNPayService both implement it differently. Thanks to NestJS Dependency Injection, we can inject the interface anywhere, and the correct implementation runs at runtime. This makes the system very flexible and easy to extend.”