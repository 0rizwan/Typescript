// ********Arrays in TypeScript********

// 🔹 1. What is an Array?

// An array in TypeScript is a special data structure used to store multiple values in a single variable.
// In plain JavaScript:
{
    let numbers = [1, 2, 3, 4];
}


// In TypeScript, we define what type of elements the array holds:
{
    let numbers: number[] = [1, 2, 3, 4];
}

// Now, TypeScript will ensure that only numbers can go inside this array.

// 🔹 2. Declaring Arrays (Two Syntaxes)
// There are two valid ways to declare an array type:

// ✅ Option 1: Bracket notation
{
    let names: string[] = ["Alice", "Bob", "Charlie"];
}

// ✅ Option 2: Generic Array<Type> notation
{
    let names: Array<string> = ["Alice", "Bob", "Charlie"];
}


// Both are exactly the same internally — it’s just a matter of style.
// 🧠 Most developers prefer the bracket notation (string[]) because it’s shorter.

// 🔹 3. Mixed-Type Arrays (Union Types)
// If you want an array that can hold more than one type of value, use a union type:

let mixed: (string | number)[] = ["Alice", 25, "Bob", 30];

// Now the array can contain both strings and numbers, but nothing else.

// 🔹 4. Array with Custom Types
// You can create arrays that hold objects or custom type aliases.

type User = {
    name: string;
    age: number;
};

let users: User[] = [
    { name: "Alice", age: 22 },
    { name: "Bob", age: 30 },
];


// If you try to add a user without the right shape:

// users.push({ name: "Charlie" }); // ❌ Error: age is missing

// 🔹 5. Readonly Arrays (Immutable Arrays)
// If you don’t want anyone to modify an array, mark it as readonly.
{
    const numbers: readonly number[] = [1, 2, 3];
    // numbers.push(4); // ❌ Error: Property 'push' does not exist on type 'readonly number[]'
}

// Alternatively, use the built-in type:
{
    const numbers: ReadonlyArray<number> = [1, 2, 3];
}


// ✅ You can still read elements, but not modify them.

// 🔹 6. Multi-Dimensional Arrays
// You can define arrays of arrays — known as multi-dimensional arrays.

let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
];


// TypeScript checks that each inner array also contains only numbers.

// 🔹 7. Array Methods and Type Safety
// All regular JavaScript array methods (push, map, filter, forEach, etc.) work — but now TypeScript knows what type they return.

// Example:
let numbers: number[] = [1, 2, 3, 4];

numbers.push(5);        // ✅ OK
// numbers.push("hi");     // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'

let doubled = numbers.map(n => n * 2);  // inferred as number[]

// TypeScript infers that doubled is number[] automatically.

// 🔹 8. Array Destructuring
// You can use destructuring just like in JS, but TypeScript tracks the types.
{
    let colors: string[] = ["red", "green", "blue"];
    let [first, second] = colors; // first: string, second: string
}


// You can also combine it with tuples for more precise typing (more on that below).

// 🔹 9. Tuple vs. Array (Important Difference)
// Feature	        Array	            Tuple
// Length	        Flexible	        Fixed
// Element Types	Usually all same	Can be different
// Example	        number[] = [1,2,3]	[string, number] = ["Alice", 25]

// Example of a tuple:

let person: [string, number] = ["Alice", 25];

// If you try to push a wrong type:

// person.push(true); // ❌ Error

// 🔹 10. Array with Optional Elements
// You can make some elements optional in tuple-like arrays:

type OptionalTuple = [string, number?];

let person1: OptionalTuple = ["Alice"];        // OK
let person2: OptionalTuple = ["Bob", 30];      // OK


// But note — regular arrays don’t support “optional elements” at specific indexes; only tuples do.

// 🔹 11. Generic Array Functions
// You can define functions that accept arrays of any type using generics.

function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstNum = getFirstElement([1, 2, 3]);       // inferred as number
const firstName = getFirstElement(["a", "b"]);     // inferred as string

// Here, T stands for a generic type — it adapts automatically to whatever array type you pass.

// 🔹 12. Spread Operator and Type Checking
// You can use the spread operator (...) safely with arrays:

let arr1: number[] = [1, 2];
let arr2: number[] = [3, 4];
let combined: number[] = [...arr1, ...arr2]; // ✅ OK


// If you try to spread arrays of incompatible types, TypeScript will complain:

let arr3: string[] = ["a", "b"];
// let combined2: number[] = [...arr1, ...arr3]; // ❌ Error

// 🔹 13. Readonly vs Mutable Array Methods
// Mutable (Changes Array)	            Immutable (Returns New Array)
// push(), pop()                        map()
// splice(), shift(), unshift()     	filter(), 
// sort(), reverse()                    concat(), slice()

// If your array is readonly, only immutable methods are allowed.
// Example:

const nums: readonly number[] = [1, 2, 3];
nums.map(x => x * 2); // ✅ OK
// nums.push(4);         // ❌ Error

// 🔹 14. as const for Immutable Arrays
// You can make an array completely immutable using as const.
{
    const colors = ["red", "green", "blue"] as const;

    // TypeScript infers this as readonly ["red", "green", "blue"]
    // colors[0] = "yellow"; // ❌ Error
}


// This makes the array:
// Readonly
// Fixed in length
// Each element’s type is literal, not generic 'string'

// 🧠 Summary
// Concept	                Example	                    Description
// Basic Array	       let nums: number[] = [1, 2, 3];	Only numbers allowed
// Generic syntax	        Array<string>	            Alternative declaration
// Mixed types	            (string | number)[]	        Multiple possible types
// Custom object arrays	    User[]	                    Arrays of structured data
// Readonly arrays	        readonly number[]	        Immutable arrays
// Multi-dimensional arrays	  number[][]	            Arrays inside arrays
// Generic functions	    <T>(arr: T[]) => T	        Type-safe array utilities
// Spread operator	        [...arr1, ...arr2]	        Combine safely
// as const	                ["a", "b"] as const	        Immutable literal array

export { }