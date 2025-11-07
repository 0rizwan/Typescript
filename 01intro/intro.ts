let greetings: string = "Hello there";
console.log(greetings);

let a: number = 5;
console.log(a, "It is number");

let isLoggedIn: boolean = false;
console.log(isLoggedIn);

function sumTwo(num: number) {
  return num + 2;
}
// sumTwo("sdfbsd");
sumTwo(10);

function getUpper(str: string) {
  return str.toUpperCase();
}
getUpper("hello");
// getUpper(55);

const loginFn = (name: string, email: string, pass: string = 'abc') => {

}
loginFn('s', 'f');

// Never Keyword - 
// If a function always throws an error or runs forever, its return type is never.

function fail(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) { }
}

// Type alias - 
type User = {
  name: string,
  email: string,
  isActive: boolean
}

function createUser(user: User) { }

createUser({ name: "Hary", email: "abc@g.com", isActive: true });


// 🔹 1. Basic Primitive Types
// Type	      Example	        Description
// string	    "hello"	        Text data
// number	    42, 3.14	      Integer or floating - point numbers
// boolean	  true, false	    True / false values
// null	      null	          Explicitly “no value”
// undefined	undefined	      Variable declared but not initialized
// bigint	    9007199254740991n	  Very large integers
// symbol	    Symbol("id")	  Unique, immutable identifiers

// Examples:

let username: string = "John";
let age: number = 25;
let isActive: boolean = true;

let notAssigned: undefined = undefined;
let empty: null = null;

let bigNumber: bigint = 123456789012345678901234567890n;
let uniqueId: symbol = Symbol("id");

// 2. The any Type
// The any type disables type checking.
// It’s useful when migrating JS code, but you should avoid overusing it.

let data: any = 5;
data = "Hello"; // allowed
data = true;    // allowed


// Tip: Prefer unknown over any when possible(we’ll see that next).

// 3. The unknown Type
// Similar to any, but TypeScript forces you to check before using it.

let input: unknown = "Hello";

if (typeof input === "string") {
  console.log(input.toUpperCase()); // Safe
}

// 4. The void Type
// Used in functions that don’t return anything.

function logMessage(message: string): void {
  console.log(message);
}

// 5. The never Type
// Used for functions that never return (e.g., throw errors or infinite loops).

function throwError(message: string): never {
  throw new Error(message);
}

// 6. Arrays
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["Alice", "Bob"];

// Alternative syntax:

let numbersAlt: Array<number> = [1, 2, 3];

// 7. Tuples
// A tuple is a fixed - length array with specific types at each position.

let person: [string, number] = ["Alice", 25];
// person = [25, "Alice"]; ❌ Error

// 8. Enums
// Enums let you define a set of named constants.

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;

// You can also assign custom values:

enum Status {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
}

// 9. Object Types

let user: { name: string; age: number; isAdmin: boolean } = {
  name: "John",
  age: 30,
  isAdmin: false,
};

// 10. Union Types
// You can allow multiple possible types for a variable.

let id: string | number;
id = 101;
id = "abc";

export { }