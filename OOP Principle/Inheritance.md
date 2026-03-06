### Level 1: Core Pillar Understanding (Screening / Junior-Mid)

1. What are the four fundamental pillars of OOP? Why is **Inheritance** considered one of them and not just a “code reuse tool”?
2. How does **Inheritance** enable **Polymorphism**? Give one real-life example (from any project) where you used inheritance + method overriding to achieve runtime polymorphism.
3. Explain the relationship between **Inheritance** and **Abstraction**. When do you make a base class abstract, and how does it help hide details from the derived classes?
4. How does **Inheritance** work together with **Encapsulation**? Why do we use protected members in a base class, and what problems can they cause?

### Level 2: Pillar Interactions (Most Common Mid-Level Questions)

5. “Inheritance represents an **is-a** relationship.” Using a real-life example, explain when this relationship holds and when it violates the other pillars (especially Liskov Substitution).
6. Compare **Inheritance** vs **Composition**. In which scenario would using inheritance break **Encapsulation** or **Abstraction**, and why do most senior developers prefer composition today?
7. How does **Inheritance** support **Polymorphism** through method overriding? Show with a small example how the same method call behaves differently based on the actual object type.
8. Explain how **abstract classes** (Inheritance + Abstraction) differ from **interfaces** in supporting the four pillars. In Java or C#, when would you choose one over the other?

### Level 3: Deep / Senior-Level (Behavioral + Conceptual)

9. Many people say “Inheritance breaks Encapsulation.” Do you agree? Defend your answer with a real scenario you have seen or built.
10. What is the **diamond problem**? In which pillar does it create the biggest issue, and how do Java/C# solve it while still keeping Inheritance and Polymorphism intact?
11. Explain **Liskov Substitution Principle (LSP)** and how it directly protects the correct use of **Inheritance** with respect to **Polymorphism** and **Abstraction**. Give a classic real-world violation example (Square-Rectangle is fine, but add another one if you can).
12. “Inheritance is for specialization, not for code reuse.” Do you agree or disagree? Explain how your answer affects all four pillars with one practical example.

These questions are the exact ones interviewers use to check whether you truly understand **Inheritance as a pillar** — not just syntax or “extends” keyword.

What is inheritance in OOP?
“Inheritance is one of the four fundamental pillars of OOP. It is a mechanism that allows a child class (subclass) to inherit properties and methods from an existing class (parent or superclass). 
This creates an ‘is-a’ relationship — for example, a Dog is-a Animal. 
The child class gets all the traits from the parent, can add new ones, and can override existing ones. This promotes code reuse and helps build a clean hierarchy, like a family tree. 

