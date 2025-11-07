"use strict";
// The readonly Keyword in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
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
    var user_1 = {
        id: 1,
        name: "Alice",
    };
    user_1.name = "Bob"; // ✅ OK
    // user.id = 2;         // ❌ Error: Cannot assign to 'id' because it is a read-only property
}
// ✅ You can assign the value to id when creating the object,
// ❌ but you cannot modify it later.
// 🔹 3. Readonly in Arrays
// The readonly keyword can also make arrays immutable — meaning you can’t add, remove, or modify elements.
var numbers = [1, 2, 3];
// numbers[0] = 10;      // ❌ Error
// numbers.push(4);      // ❌ Error
// numbers.pop();        // ❌ Error
// However, you can still read from the array:
console.log(numbers[1]); // ✅ Works fine
// 🔹 4. The ReadonlyArray Type
// TypeScript also provides a built-in ReadonlyArray<T> type that works the same way:
var fruits = ["apple", "banana"];
var p1 = [10, 20];
// p1[0] = 30; // ❌ Error
// This is especially useful for fixed coordinate pairs or data that should never change after initialization.
// 🔹 6. Readonly in Classes
// You can mark class properties as readonly.
// They can be assigned only once, typically in the constructor.
var Car = /** @class */ (function () {
    function Car(brand, model) {
        this.brand = brand; // ✅ Allowed (in constructor)
        this.model = model;
    }
    return Car;
}());
var car = new Car("Toyota", "Camry");
car.model = "Corolla"; // ✅ Allowed
var config = {
    apiKey: "123-abc",
    baseUrl: "https://api.example.com",
    timeout: 5000,
};
config.timeout = 10000; // ✅ OK
var readonlyUser = {
    id: 1,
    name: "Alice",
};
// 🔹 9. readonly vs const
// Feature	readonly	const
// Used on	Object properties, arrays, classes	Variables
// Checked at	Compile-time (TypeScript)	Runtime (JavaScript)
// Scope	Property-level	Variable-level
// ✅ Example:
var person = { name: "John" };
person.name = "Mike"; // ✅ allowed (const affects variable, not property)
var user = { name: "Alice" };
