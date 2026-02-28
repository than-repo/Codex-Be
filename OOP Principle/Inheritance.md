- **What is inheritance in OOP?** Expected: Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass), promoting code reuse and hierarchy. Example: In JS, class Child extends Parent {}.
- **What are the benefits and drawbacks of using inheritance?** Expected: Benefits: Code reuse, reduces duplication, supports polymorphism. Drawbacks: Can lead to tight coupling, fragile base class problem (changes in parent break children). Use composition over inheritance when possible for flexibility.
- **Explain the difference between classical inheritance and prototypal inheritance.** Expected: Classical (e.g., Java): Based on classes and blueprints. Prototypal (JS/Node.js): Objects inherit directly from other objects via prototypes (e.g., Object.create() or class extends). JS uses prototypal under the hood even with ES6 classes.
- **How does inheritance work in Node.js, and what's util.inherits?** Expected: Node.js uses prototypal inheritance. util.inherits(Child, Parent) sets up the prototype chain (older style; now use ES6 extends). Common in custom EventEmitters or modules.
- **Give an example of inheritance in NestJS.** Expected: In NestJS (TS-based), use for extending base services/controllers. E.g., class BaseService { commonMethod() {} } then class UserService extends BaseService {} for shared logic, reducing duplication in big systems.
- **When would you use inheritance in a backend system like Node.js/NestJS?** Expected: For base classes in microservices (e.g., BaseController for auth checks), or extending errors (e.g., class NotFoundError extends Error {}). Avoid deep hierarchies; prefer for "is-a" relationships.
- **What's the difference between inheritance and composition in OOP?** Expected: Inheritance: "is-a" relationship (e.g., Dog is-a Animal). Composition: "has-a" (e.g., Car has-an Engine). Composition is more flexible, avoids inheritance pitfalls; favored in modern design (e.g., SOLID principles).
- **How can inheritance lead to tight coupling, and how does NestJS help with loose coupling?** Expected: Deep inheritance chains make classes interdependent. NestJS uses modules, DI, and providers for loose coupling—e.g., inject services instead of inheriting.



What is inheritance in OOP?
“Inheritance is one of the four fundamental pillars of OOP. It is a mechanism that allows a child class (subclass) to inherit properties and methods from an existing class (parent or superclass). 
This creates an ‘is-a’ relationship — for example, a Dog is-a Animal. 
The child class gets all the traits from the parent, can add new ones, and can override existing ones. This promotes code reuse and helps build a clean hierarchy, like a family tree. 
In NestJS/TypeScript we use it with the extends keyword, for example extending a BaseService.”

