// ********Interfaces in TypeScript******** 

// Interfaces are one of TypeScript’s most important features 
// — they define the shape (structure) of objects, classes, or functions in a clean, reusable, and type-safe way.
// Let’s explore them in depth, step by step. 🚀

// 🔹 1. What Is an Interface?
// An interface in TypeScript defines a contract for the shape of an object — what properties and methods it should have, along with their types.
// Think of it as a blueprint for your objects or classes.
{
    interface User {
        name: string;
        age: number;
    }

    const user: User = {
        name: "Alice",
        age: 25,
    };


    // Here, User defines that any object of type User must have:
    // a name of type string
    // an age of type number
    // If you try to omit or add something invalid:

    // const badUser: User = { name: "Bob" };     // ❌ Error: missing 'age'
}

// 🔹 2. Why Use Interfaces?
// Interfaces provide:
// ✅ Strong typing for object structures
// ✅ Reusability across code
// ✅ Readability and documentation for APIs
// ✅ Extendability — they can inherit from other interfaces

// In essence, interfaces make your code more self-descriptive and safe.

// 🔹 3. Optional Properties
// You can mark properties as optional using the ? symbol.
{
    interface User {
        name: string;
        age?: number;
    }

    const user1: User = { name: "Alice" };         // ✅ OK
    const user2: User = { name: "Bob", age: 30 };  // ✅ OK
}
// Optional properties are often used for config objects, where not all values are required.

// 🔹 4. Readonly Properties
// Use readonly to make a property immutable after initialization.
{
    interface User {
        readonly id: number;
        name: string;
    }

    const user: User = { id: 1, name: "Alice" };
    user.name = "Bob"; // ✅ OK
    // user.id = 2;       // ❌ Error: Cannot assign to 'id' because it is a read-only property
}

// 🔹 5. Index Signatures
// When you don’t know all property names in advance, you can use an index signature.

interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    hello: "Hola",
    goodbye: "Adiós",
    thankYou: "Gracias",
};


// This means:
// "Any property with a string key must have a string value."
// You can also combine it with fixed properties:

interface MixedDictionary {
    id: number;
    [key: string]: string | number;
}

// 🔹 6. Function Types in Interfaces
// Interfaces can describe function signatures.

interface GreetFunction {
    (name: string): string;
}

const greet: GreetFunction = (name) => `Hello, ${name}!`;

console.log(greet("Alice")); // "Hello, Alice!"


// So here, the interface defines how a function should look — its parameters and return type.

// 🔹 7. Interface for Methods in Objects
// You can also describe object methods directly:
{
    interface User {
        name: string;
        greet(): string;
    }

    const user: User = {
        name: "Alice",
        greet() {
            return `Hi, I'm ${this.name}`;
        },
    };

    console.log(user.greet()); // "Hi, I'm Alice"
}

// 🔹 8. Extending Interfaces (Inheritance)
// Interfaces can extend one or more other interfaces — just like class inheritance.

interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
}

const emp: Employee = {
    name: "John",
    age: 28,
    employeeId: 101,
};


// You can extend multiple interfaces:

interface Contact {
    email: string;
}
interface Manager extends Person, Contact {
    department: string;
}


// 🧠 This promotes code reuse and composition.

// 🔹 9. Reopening / Merging Interfaces
// Unlike type aliases, interfaces are open-ended, meaning you can merge multiple declarations of the same name.
{
    interface Box {
        height: number;
    }
    interface Box {
        width: number;
    }

    const box: Box = { height: 20, width: 30 }; // ✅ Works fine
}

// Now Box effectively has both height and width.
// This is a unique feature — type aliases cannot do this.

// 🔹 10. Interface vs Type Alias
// You can describe the same thing with both interface and type, but there are key differences.

// Feature	interface	type
// Object shapes	✅ Yes	✅ Yes
// Can be extended	✅ Yes (extends)	✅ Yes (via intersections &)
// Can be merged	✅ Yes	❌ No
// Can describe unions	❌ No	✅ Yes
// Preferred for	Public APIs, OO-style code	Complex type combinations

// Example equivalence:

interface User {
    name: string;
    age: number;
}
// Same as:
type UserType = {
    name: string;
    age: number;
};

// 🔹 11. Interfaces and Classes

// You can use an interface to enforce structure on a class.

interface Vehicle {
    brand: string;
    drive(): void;
}

class Car implements Vehicle {
    constructor(public brand: string) { }
    drive() {
        console.log(`${this.brand} is driving`);
    }
}

const car = new Car("Toyota");
car.drive(); // "Toyota is driving"


// ✅ The implements keyword ensures that Car satisfies the Vehicle interface.

// If you miss a method or property, you get a compile-time error:

class BrokenCar implements Vehicle {
    brand = "Ford";
    // ❌ Error: Property 'drive' is missing
}

// 🔹 12. Interfaces for Function Constructors

// Interfaces can even define constructor signatures (for classes).

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("Beep beep");
    }
}

const clock = createClock(DigitalClock, 12, 30);
clock.tick(); // "Beep beep"

// 🔹 13. Extending Classes with Interfaces

// Interfaces can also extend classes, inheriting their members (but not implementations).

class Animal {
    name!: string;
}

interface Dog extends Animal {
    breed: string;
}

const dog: Dog = { name: "Rex", breed: "German Shepherd" };

// 🔹 14. Optional vs Readonly vs Index Signatures

// You can combine them all:

interface Config {
    readonly id: string;
    name?: string;
    [key: string]: string | number | undefined;
}

const cfg: Config = { id: "123", version: 1 };
cfg.id = "456"; // ❌ Error

// 🔹 15. Interfaces with Generics

// You can make generic interfaces for reusable patterns.

interface Box<T> {
    contents: T;
}

const stringBox: Box<string> = { contents: "Hello" };
const numberBox: Box<number> = { contents: 123 };


// Now you can create boxes for any type, keeping strong typing intact.

// 🔹 16. Extending Generic Interfaces

// You can even extend a generic interface with another generic.

interface Result<T> {
    data: T;
    success: boolean;
}

interface ApiResponse<T> extends Result<T> {
    status: number;
}

const response: ApiResponse<string> = {
    data: "OK",
    success: true,
    status: 200,
};

// 🔹 17. Interface with Hybrid Types (Function + Object)

// Interfaces can describe objects that are both callable and have properties.

interface Counter {
    (start: number): string;
    reset(): void;
}

function getCounter(): Counter {
    let count = 0;
    const counter = ((start: number) => `Count: ${start + count}`) as Counter;
    counter.reset = () => (count = 0);
    return counter;
}

const counter = getCounter();
console.log(counter(10)); // "Count: 10"
counter.reset();


// This is used in libraries like React or Express where functions have attached properties (e.g. app.get, app.post).

// 🔹 18. Interfaces in Real-World Scenarios
// ✅ Example 1: API Response Model
interface ApiResponse<T> {
    status: number;
    data: T;
    error?: string;
}

const response: ApiResponse<string> = {
    status: 200,
    data: "Success",
};

// ✅ Example 2: Config Objects
interface Config {
    apiKey: string;
    timeout?: number;
    debug?: boolean;
}

function setup(config: Config) {
    console.log(config.apiKey);
}

// ✅ Example 3: Component Props
interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

// 🔹 19. Differences Between Interfaces and Classes
// Feature	Interface	Class
// Defines	Shape / contract	Implementation
// Can extend	Other interfaces	Classes
// Can implement	Classes	Interfaces
// Generates JS code	❌ No	✅ Yes
// Use case	Typing and contracts	Object creation and logic
// 🧠 Summary
// Concept	Example	Description
// Basic interface	interface A { x: number }	Defines object shape
// Optional property	x?: number	Not required
// Readonly property	readonly x: number	Immutable
// Index signature	[key: string]: string	Dynamic keys
// Function type	(a: string) => void	Defines callable type
// Extend interface	interface B extends A {}	Inheritance
// Merge interfaces	interface A {}; interface A {}	Auto-merged
// Generic interface	interface Box<T>	Reusable templates
// Implements class	class A implements I {}	Contract enforcement
// Hybrid type	interface F { (): void; reset(): void }	Function-object combo

// ✅ In short:

// Use interfaces to describe object and class structures.

// They’re extendable, mergeable, and generic-friendly.

// Prefer them when defining public contracts or API schemas.

// Use type for unions, intersections, or more advanced type compositions.