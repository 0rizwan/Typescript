// ********The readonly Keyword in TypeScript********

// 🔹 1. What Is readonly?

// The readonly keyword is used to prevent modification of a property after it has been initialized.
// It works with:
// Object properties
// Arrays
// Tuples
// Class properties
// Think of it like a “write-once” rule — you can set the value when the object or variable is created, but not change it later.

// 🔹 2. Using readonly in Object Types
// Here’s a simple example:
{

    type User = {
        readonly id: number;
        name: string;
    };

    const user: User = {
        id: 1,
        name: "Alice",
    };

    user.name = "Bob";   // ✅ OK
    // user.id = 2;         // ❌ Error: Cannot assign to 'id' because it is a read-only property

}

// ✅ You can assign the value to id when creating the object,
// ❌ but you cannot modify it later.

// 🔹 3. Readonly in Arrays
// The readonly keyword can also make arrays immutable — meaning you can’t add, remove, or modify elements.

const numbers: readonly number[] = [1, 2, 3];

// numbers[0] = 10;      // ❌ Error
// numbers.push(4);      // ❌ Error
// numbers.pop();        // ❌ Error


// However, you can still read from the array:

console.log(numbers[1]); // ✅ Works fine

// 🔹 4. The ReadonlyArray Type
// TypeScript also provides a built-in ReadonlyArray<T> type that works the same way:

const fruits: ReadonlyArray<string> = ["apple", "banana"];

// fruits[0] = "mango";   // ❌ Error
// fruits.push("grape");  // ❌ Error


// It’s equivalent to readonly string[].

// 🔹 5. Readonly in Tuples
// You can also use it with tuples:

type Point = readonly [number, number];

const p1: Point = [10, 20];
// p1[0] = 30; // ❌ Error


// This is especially useful for fixed coordinate pairs or data that should never change after initialization.

// 🔹 6. Readonly in Classes
// You can mark class properties as readonly.
// They can be assigned only once, typically in the constructor.

class Car {
    readonly brand: string;
    model: string;

    constructor(brand: string, model: string) {
        this.brand = brand; // ✅ Allowed (in constructor)
        this.model = model;
    }
}

const car = new Car("Toyota", "Camry");
car.model = "Corolla";   // ✅ Allowed
// car.brand = "Honda";     // ❌ Error: Cannot assign to 'brand'


// This pattern is great for properties that should not change (like id, serialNumber, etc.).

// 🔹 7. Combining with Type Aliases or Interfaces
// You can mark some or all properties as readonly:

type Config = {
    readonly apiKey: string;
    readonly baseUrl: string;
    timeout: number;
};

const config: Config = {
    apiKey: "123-abc",
    baseUrl: "https://api.example.com",
    timeout: 5000,
};

config.timeout = 10000;   // ✅ OK
// config.apiKey = "new-key"; // ❌ Error

// 🔹 8. Making Everything Readonly (Utility Type)
// TypeScript has a built-in Readonly<T> utility type that makes all properties in a type readonly.

type User = {
    id: number;
    name: string;
};

const readonlyUser: Readonly<User> = {
    id: 1,
    name: "Alice",
};

// readonlyUser.name = "Bob"; // ❌ Error

// It’s the same as:

type ReadonlyUser = {
    readonly id: number;
    readonly name: string;
};

// 🔹 9. readonly vs const
// Feature          readonly	                const
// Used on          Object properties, arrays, classes	Variables
// Checked at       Compile-time (TypeScript)	Runtime (JavaScript)
// Scope            Property-level	            Variable-level

// ✅ Example:

const person = { name: "John" };
person.name = "Mike"; // ✅ allowed (const affects variable, not property)

type Person = { readonly name: string };
const user: Person = { name: "Alice" };
// user.name = "Bob"; // ❌ Error (readonly affects property)


// 🧠 So:
// Use const to make variables immutable.
// Use readonly to make object properties or class members immutable.

// 🧠 Summary
// Concept	                Example	                    Meaning
// Readonly property	    readonly id: number;	    Cannot change after initialization
// Readonly array	        readonly number[] or        Immutable array
//                          ReadonlyArray<number>	
// Readonly tuple	        readonly [number, number]	Immutable tuple
// Readonly class field	    readonly brand: string	    Settable only in constructor
// Utility type	            Readonly<T>	                Makes every property readonly
// Difference from const    readonly = property-level,  const = variable-level	

export {}