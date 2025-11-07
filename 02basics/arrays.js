"use strict";
// Arrays in TypeScript
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// 🔹 1. What is an Array?
// An array in TypeScript is a special data structure used to store multiple values in a single variable.
// In plain JavaScript:
{
    var numbers_1 = [1, 2, 3, 4];
}
// In TypeScript, we define what type of elements the array holds:
{
    var numbers_2 = [1, 2, 3, 4];
}
// Now, TypeScript will ensure that only numbers can go inside this array.
// 🔹 2. Declaring Arrays (Two Syntaxes)
// There are two valid ways to declare an array type:
// ✅ Option 1: Bracket notation
{
    var names = ["Alice", "Bob", "Charlie"];
}
// ✅ Option 2: Generic Array<Type> notation
{
    var names = ["Alice", "Bob", "Charlie"];
}
// Both are exactly the same internally — it’s just a matter of style.
// 🧠 Most developers prefer the bracket notation (string[]) because it’s shorter.
// 🔹 3. Mixed-Type Arrays (Union Types)
// If you want an array that can hold more than one type of value, use a union type:
var mixed = ["Alice", 25, "Bob", 30];
var users = [
    { name: "Alice", age: 22 },
    { name: "Bob", age: 30 },
];
// If you try to add a user without the right shape:
// users.push({ name: "Charlie" }); // ❌ Error: age is missing
// 🔹 5. Readonly Arrays (Immutable Arrays)
// If you don’t want anyone to modify an array, mark it as readonly.
{
    var numbers_3 = [1, 2, 3];
    // numbers.push(4); // ❌ Error: Property 'push' does not exist on type 'readonly number[]'
}
// Alternatively, use the built-in type:
{
    var numbers_4 = [1, 2, 3];
}
// ✅ You can still read elements, but not modify them.
// 🔹 6. Multi-Dimensional Arrays
// You can define arrays of arrays — known as multi-dimensional arrays.
var matrix = [
    [1, 2, 3],
    [4, 5, 6],
];
// TypeScript checks that each inner array also contains only numbers.
// 🔹 7. Array Methods and Type Safety
// All regular JavaScript array methods (push, map, filter, forEach, etc.) work — but now TypeScript knows what type they return.
// Example:
var numbers = [1, 2, 3, 4];
numbers.push(5); // ✅ OK
// numbers.push("hi");     // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
var doubled = numbers.map(function (n) { return n * 2; }); // inferred as number[]
// TypeScript infers that doubled is number[] automatically.
// 🔹 8. Array Destructuring
// You can use destructuring just like in JS, but TypeScript tracks the types.
{
    var colors = ["red", "green", "blue"];
    var first = colors[0], second = colors[1]; // first: string, second: string
}
// You can also combine it with tuples for more precise typing (more on that below).
// 🔹 9. Tuple vs. Array (Important Difference)
// Feature	        Array	            Tuple
// Length	        Flexible	        Fixed
// Element Types	Usually all same	Can be different
// Example	        number[] = [1,2,3]	[string, number] = ["Alice", 25]
// Example of a tuple:
var person = ["Alice", 25];
var person1 = ["Alice"]; // OK
var person2 = ["Bob", 30]; // OK
// But note — regular arrays don’t support “optional elements” at specific indexes; only tuples do.
// 🔹 11. Generic Array Functions
// You can define functions that accept arrays of any type using generics.
function getFirstElement(arr) {
    return arr[0];
}
var getFirstElement2 = function (arr) {
    return arr[0];
};
var firstNum = getFirstElement2([1, 2, 3]); // inferred as number
var firstName = getFirstElement2(["a", "b"]); // inferred as string
console.log(firstName, firstNum);
// Here, T stands for a generic type — it adapts automatically to whatever array type you pass.
// 🔹 12. Spread Operator and Type Checking
// You can use the spread operator (...) safely with arrays:
var arr1 = [1, 2];
var arr2 = [3, 4];
var combined = __spreadArray(__spreadArray([], arr1, true), arr2, true); // ✅ OK
// If you try to spread arrays of incompatible types, TypeScript will complain:
var arr3 = ["a", "b"];
// let combined2: number[] = [...arr1, ...arr3]; // ❌ Error
// 🔹 13. Readonly vs Mutable Array Methods
// Mutable (Changes Array)	            Immutable (Returns New Array)
// push(), pop()                        map()
// splice(), shift(), unshift()     	filter(), 
// sort(), reverse()                    concat(), slice()
// If your array is readonly, only immutable methods are allowed.
// Example:
var nums = [1, 2, 3];
nums.map(function (x) { return x * 2; }); // ✅ OK
// nums.push(4);         // ❌ Error
// 🔹 14. as const for Immutable Arrays
// You can make an array completely immutable using as const.
{
    var colors = ["red", "green", "blue"];
    // TypeScript infers this as readonly ["red", "green", "blue"]
    // colors[0] = "yellow"; // ❌ Error
}
