// ********Union Types********

// - Union types are what make TypeScript flexible yet strongly typed 
// - they let you express that a value can be one of several possible types without losing safety or autocompletion.
// Let’s break it down thoroughly. 

// 🔹 1. What Is a Union Type?

// A union type allows a variable, parameter, or property to hold more than one possible type.
// You define it using the pipe (|) symbol.

let value: string | number;

value = "Hello"; // ✅ OK
value = 42;      // ✅ OK
// value = true;    // ❌ Error (boolean not allowed)


// 🧠 Think of a union as saying:
// “This can be either X or Y (or more).”

// 🔹 2. Why Union Types?

// Union types are great when:
// A value can have multiple forms (e.g. API data, user input)
// You’re migrating from JS and need flexibility with safety
// You want to handle different types in a single variable or function

function printId(id: number | string) {
    console.log("Your ID:", id);
}

// 🔹 3. Type Narrowing (How TS Knows What Type You’re Using)

// TypeScript doesn’t know which type is being used in a union until you check it.
// This process is called type narrowing.

function printId2(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase()); // ✅ Works: id is string here
    } else {
        console.log(id.toFixed(2));    // ✅ Works: id is number here
    }
}

// The typeof check tells TypeScript exactly which branch has which type.

// 🔹 4. Union with Multiple Types
// You can combine as many as you want:

let data: string | number | boolean;

data = "hello"; // ✅
data = 123;     // ✅
data = false;   // ✅
// data = {};      // ❌ Error

// 🔹 5. Union with Custom Types (Type Aliases)
// You can also use custom type aliases inside unions.

type SuccessResponse = { status: "success"; data: string };
type ErrorResponse = { status: "error"; message: string };

type ApiResponse = SuccessResponse | ErrorResponse;

const response: ApiResponse = {
    status: "success",
    data: "User created successfully",
};

// TypeScript checks that the object matches one of the union shapes.

// 🔹 6. Working with Unions of Objects (Discriminated Unions)
// This is one of the most powerful TypeScript features: discriminated unions (also known as tagged unions).
// It’s used to model multiple “variants” of a type safely.

type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "rectangle":
            return shape.width * shape.height;
        default:
            const _exhaustive: never = shape; // ✅ Compile-time check
            return _exhaustive;
    }
}

// 🧠 TypeScript automatically narrows the type of shape in each case block based on the kind property.
// If you forget to handle a case, the compiler warns you — that’s type-safe polymorphism.

// 🔹 7. Union in Arrays
// You can define arrays that contain multiple allowed types.

// Example 1: Union for elements
let mixedArray: (string | number)[] = ["Alice", 25, "Bob", 30];

// Example 2: Union for entire array
let ids: string[] | number[];

ids = [1, 2, 3];           // ✅ OK
ids = ["a", "b", "c"];     // ✅ OK
// ids = [1, "a"];            // ❌ Error (mixed not allowed)


// The parentheses are important — (string | number)[] is different from string[] | number[].

// 🔹 8. Union in Function Parameters
// A very common pattern:

function formatInput(input: string | number) {
    return typeof input === "number" ? input.toFixed(2) : input.trim();
}

// Here, TypeScript requires you to narrow the type before calling methods like .trim() or .toFixed().

// 🔹 9. Union and Intersection Combined
// You can mix union (|) and intersection (&) types for powerful modeling.
{
    type A = { name: string };
    type B = { age: number };
    type C = { gender: string };

    type Combined = (A | B) & C;

    const person: Combined = { name: "John", gender: "male" }; // ✅ OK (A + C)
}

// This means:
// “Either A or B, but must also satisfy C.”

// 🔹 10. Literal Unions (Specific Allowed Values)
// You can make a variable accept specific string or number literals.

type Direction = "up" | "down" | "left" | "right";

let move: Direction;

move = "up";    // ✅ OK
move = "right"; // ✅ OK
// move = "north"; // ❌ Error: not one of the allowed strings

// This is extremely common for defining enums, modes, or status types.

// 🔹 11. Type Narrowing with in Operator
// When your union is made of objects, use the in operator to check which one you’re dealing with.

type Dog = { bark: () => void };
type Cat = { meow: () => void };

function makeSound(animal: Dog | Cat) {
    if ("bark" in animal) {
        animal.bark(); // ✅ animal is Dog
    } else {
        animal.meow(); // ✅ animal is Cat
    }
}

// 🔹 12. Type Narrowing with instanceof
// Useful when working with classes:

class Car { drive() { } }
class Bike { ride() { } }

function move3(vehicle: Car | Bike) {
    if (vehicle instanceof Car) {
        vehicle.drive(); // ✅ Car
    } else {
        vehicle.ride();  // ✅ Bike
    }
}

// 🔹 13. Type Guards for Unions
// If you find yourself repeating narrowing checks, you can create custom type guard functions.

type Bird = { fly: () => void };
type Fish = { swim: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function move2(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim(); // ✅ TypeScript knows it's Fish
    } else {
        pet.fly();
    }
}


// 🧠 pet is Fish tells TypeScript that inside that block, pet must be of type Fish.

// 🔹 14. Common Pitfall — No Shared Properties
// When you access a property or method on a union, it must exist on all types in that union.

type A = { name: string };
type B = { age: number };

function print(x: A | B) {
    // console.log(x.name); // ❌ Error: 'name' does not exist on type 'B'
}

// ✅ Fix it with narrowing:

function print2(x: A | B) {
    if ("name" in x) {
        console.log(x.name); // OK
    }
}
print2({ name: "Hello" });

// 🔹 15. Union Types vs any
// Feature	Union Type	any
// Type safety	✅ Yes	❌ No
// Autocompletion	✅ Full	❌ None
// Requires type checking	✅ Yes	❌ No
// Use case	Controlled flexibility	Temporary escape hatch

// 🧠 Prefer union types whenever possible — they give you flexibility and safety.

// 🔹 16. Practical Examples
// 🧭 Example 1: Handling different data inputs
function parseInput(input: string | number) {
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    return input.toFixed(2);
}

// ⚙️ Example 2: Status handling
type Status = "loading" | "success" | "error";

function showStatus(status: Status) {
    switch (status) {
        case "loading":
            console.log("Loading...");
            break;
        case "success":
            console.log("Success!");
            break;
        case "error":
            console.log("Something went wrong!");
            break;
    }
}

// 🧮 Example 3: Union of return types
function getValue(): string | number {
    return Math.random() > 0.5 ? "hello" : 42;
}

// 🧠 Summary
// Concept	                    Example	                Description
// Basic union	                `string	                number`
// Type narrowing	         typeof, in, instanceof	    Tell TypeScript which type branch you’re in
// Literal unions	            "up" | "down"	        Only specific values allowed
// Discriminated unions	 { kind: "circle" } | { kind: "square" }	Safe polymorphic types
// Union arrays	                (string | number)[]	    Mixed elements
// Custom guard	                pet is Fish	                User-defined type checks
// Union + intersection	        (A | B) & C	             Combine flexibility and strictness

export { }