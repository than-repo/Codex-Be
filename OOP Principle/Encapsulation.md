Means:
Hide the internal details (states and methods) of an object and how control others interact with it

Private variables, getter/setter; those are tools, not core mean

Core:
Protect internal state ( attribute )
Control behavior ( methods)
Prevent misuse

5️⃣ Real Backend Example
Let’s say you have a User entity:
Bad design:
```java
user.password = "123";
```
Good design:
```java
user.setPassword("123");
```
Inside setPassword:
Hash password
Validate length
Log audit

Now you control the rule.

Without encapsulation → security disaster.
