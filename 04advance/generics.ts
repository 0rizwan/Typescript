// ***********Generics in TypeScript************

// Generics are what make TypeScript truly scalable and reusable for complex applications.
// They allow you to write flexible, reusable, and strongly typed code that adapts to any data type while maintaining type safety.

// Let’s go step-by-step and cover everything about them 👇

// 🔹 1. What Are Generics?
// Generics allow you to define components (functions, classes, interfaces, etc.) that can work with any type, while still keeping strong typing.
// Think of them as placeholders for types — you tell TypeScript:
// “I don’t know the type yet, but I’ll specify it when I use this.”


function identity<T>(value: T): T {
  return value;
}

const num = identity(42);        // T = number
const str = identity("Hello");   // T = string


// Here, T is a generic type parameter.
// When you call the function:

// TypeScript infers that T is number for identity(42)

// and T is string for identity("Hello").

// 🔹 2. Why Use Generics?
// Without generics, you might use any, which loses type safety:

function identityAny(value: any): any {
  return value;
}

let x = identityAny("Hello");
x.toFixed(2); // ❌ No error at compile-time, but runtime crash


// With generics, TypeScript enforces the correct type:

function identity2<T>(value: T): T {
  return value;
}

let y = identity2("Hello");
y.toFixed(2); // ❌ Error at compile-time (since y is string)


// ✅ Safer and smarter than any.

// 🔹 3. Generic Function Syntax
// You define a generic by adding <T> before parameters:

function functionName<T>(param: T): T {
  return param;
}


// You can name the type parameter anything, but T (for Type) is the convention.

// Multiple generics:

function pair<T, U>(first: T, second: U) {
  return [first, second];
}

const result = pair("Hello", 42); // [string, number]

// 🔹 4. Generic Type Inference
// TypeScript usually infers generic types automatically:

function identity3<T>(value: T): T {
  return value;
}

identity3("Hi"); // T inferred as string


// But you can also explicitly specify it:

identity3<number>(100);

// 🔹 5. Using Generics with Arrays
// You can define generics that work with arrays:

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const first = getFirstElement(["apple", "banana", "mango"]); // string


// Or use the built-in Array<T> syntax:

function getLastElement<T>(arr: Array<T>): T {
  return arr[arr.length - 1];
}

// 🔹 6. Constraints with Generics (extends)

// Sometimes, you want a generic to only accept certain types.
// That’s where constraints come in.


function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("Hello");         // ✅ string has length
getLength([1, 2, 3]);       // ✅ array has length
getLength({ length: 10 });  // ✅ object with length works
getLength(42);              // ❌ Error: number has no 'length'


// 🧠 T extends { length: number } means

"T must have a length property."

// 🔹 7. Default Type Parameters
// You can give generics default types:

function createPair<T = string, U = number>(a: T, b: U) {
  return [a, b];
}

const pair1 = createPair("Alice", 42); // [string, number]
const pair2 = createPair("Bob", true); // [string, boolean]
const pair3 = createPair();            // [string, number] (defaults)

// 🔹 8. Generic Interfaces
// Interfaces can also be generic — useful for reusable structures.

interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 42 };


// You can even make nested generics:

interface ApiResponse<T> {
  data: T;
  status: number;
}

const response: ApiResponse<string> = {
  data: "Success",
  status: 200,
};

// 🔹 9. Generic Classes
// Classes can use generics to store or operate on different data types.

class StorageBox<T> {
  private content: T;
  constructor(value: T) {
    this.content = value;
  }
  get(): T {
    return this.content;
  }
}

const stringStorage = new StorageBox<string>("Apple");
const numberStorage = new StorageBox<number>(123);

console.log(stringStorage.get().toUpperCase()); // ✅ Works

// 🔹 10. Generic Constraints with extends
// You can restrict a generic class or interface as well:

interface HasId {
  id: number;
}

class Entity<T extends HasId> {
  constructor(public data: T) {}
  getId(): number {
    return this.data.id;
  }
}

const userEntity = new Entity({ id: 1, name: "Alice" });
console.log(userEntity.getId()); // 1

// 🔹 11. Generics with Keyof (Type Relationships)
// You can create generics that depend on keys of another type.

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person = { name: "Alice", age: 30 };

console.log(getProperty(person, "name")); // ✅ string
console.log(getProperty(person, "age"));  // ✅ number
console.log(getProperty(person, "email")); // ❌ Error


// 🧠 K extends keyof T means
// “K must be one of the keys of T.”

// 🔹 12. Generic Type Aliases
// You can also use generics in type aliases:

type Pair<T, U> = {
  first: T;
  second: U;
};

const p: Pair<string, number> = { first: "Hello", second: 123 };

// 🔹 13. Generics with Functions + Interfaces Combined
interface Transformer<T, U> {
  (input: T): U;
}

const toString: Transformer<number, string> = (x) => x.toString();
const toLength: Transformer<string, number> = (x) => x.length;

// 🔹 14. Generics with Promises (Common Use)
// You’ll often see generics with async code:

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}

interface User {
  id: number;
  name: string;
}

const user = await fetchData<User>("https://api.example.com/user");


// ✅ TypeScript now knows user is a User object — full IntelliSense and safety.

// 🔹 15. Generic Utility Types (Built-In)

// TypeScript’s standard library uses generics everywhere.
// Some key ones:

// Utility	            Example                 Description
// Array<T>	            Array<number>	        Generic array type
// Promise<T>	        Promise<string>	        Async result
// Partial<T>	        Partial<User>	        Makes all properties optional
// Readonly<T>	        Readonly<User>	        Makes all props readonly
// Record<K, T>	        Record<string,          number>	Key-value map
// Pick<T, K>	        Pick<User, "name">	    Extracts specific props
// Omit<T, K>	        Omit<User, "age">	    Removes specific props
// ReturnType<T>	    ReturnType<typeof fn>	Gets a function’s return type

// Each of these is implemented using generics under the hood!

// 🔹 16. Constraining Multiple Generics Together
// You can make one generic depend on another:

function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const merged = merge({ name: "Alice" }, { age: 25 });
// merged: { name: string; age: number }

// Here, the result is an intersection (T & U).

// 🔹 17. Generic Default Parameters with Constraints
// You can mix both constraints and defaults:

interface Response<T = any> {
  data: T;
  success: boolean;
}

const res1: Response = { data: 42, success: true }; // T = any
const res2: Response<string> = { data: "Hello", success: true };

// 🔹 18. Advanced Example — Generic Repository Pattern
interface Entity {
  id: number;
}

class Repository<T extends Entity> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find((i) => i.id === id);
  }
}

interface User extends Entity {
  name: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Alice" });
console.log(userRepo.getById(1)); // { id: 1, name: "Alice" }


// This is how you build type-safe data layers with generics.

// 🧠 Summary
// Concept	            Example                 Description
// Basic generic	 function id<T>(x: T): T	Type-safe flexibility
// Multiple types	    <T, U>	                Two or more generic params
// Constraint	        <T extends X>	        Restrict allowed types
// Default type	        <T = string>	        Default type parameter
// Generic class	    class Box<T>	        Type-safe containers
// keyof constraint	    <K extends keyof T>	    Limit to object keys
// Nested generics	    Promise<Array<T>>	    Common in async data
// Utility types	    Partial<T>, Omit<T>	    Built-in generics
// Merge objects	    <T, U>(a: T, b: U)	    Combine types dynamically

// ✅ In short:
// - Generics are type parameters that make your code reusable and type-safe.
// - Use them for functions, classes, interfaces, and types.
// - Combine them with extends, keyof, and utility types for advanced use cases.
// - They’re the backbone of most of TypeScript’s power — including libraries like React, Angular, and RxJS.