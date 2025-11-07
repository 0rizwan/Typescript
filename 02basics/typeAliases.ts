// ********Type Aliases********
// A type alias is a way to give a custom name to a type — whether it’s a simple type, a union, an object, or something more complex.

// 1. What Is a Type Alias?
// You create a type alias using the type keyword:

type UserID = string;
type Age = number;

let id: UserID = "abc123";
let age: Age = 25;
// This doesn’t create a new runtime type — it’s just a name for an existing one, purely for type checking and readability.

// 2. Why Use Type Aliases?

// ✅ Makes code cleaner and easier to read
// ✅ Reduces duplication in complex object or union types
// ✅ Helps you refactor types easily in large codebases

// 3. Type Aliases with Objects
// You can define the structure of an object using a type alias.

type User = {
    id: number;
    name: string;
    isAdmin: boolean;
};

const user1: User = {
    id: 1,
    name: "Alice",
    isAdmin: true,
};

// Now you can reuse the User type anywhere — just like a blueprint.

// 4. Type Aliases with Unions
// Type aliases are especially handy for union types (multiple possible types).

type Status = "success" | "error" | "loading";

let currentStatus: Status;
currentStatus = "success";  // ✅
currentStatus = "error";    // ✅
// currentStatus = "failed";   // ❌ Error


// This is great for state management, API responses, or event names.

// 5. Type Aliases with Intersections
// You can also combine multiple types using & (intersection types).
{
    type Person = {
        name: string;
        age: number;
    };

    type Employee = {
        employeeId: number;
        department: string;
    };

    type StaffMember = Person & Employee;

    const staff: StaffMember = {
        name: "John",
        age: 28,
        employeeId: 101,
        department: "HR",
    };

}
// Think of intersection types as “merging” two type definitions.

// 6. Type Aliases with Arrays and Tuples
type NameList = string[];

const names: NameList = ["Alice", "Bob", "Charlie"];

// Or for tuples:

type Coordinate = [number, number];
const point: Coordinate = [10, 20];

// 7. Type Aliases for Functions
// You can describe a function’s shape with a type alias too.

type MathOperation = (x: number, y: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// 8. Nested and Complex Type Aliases
// You can nest types for readability.

type Address = {
    street: string;
    city: string;
    zip: string;
};

type UserProfile = {
    name: string;
    email: string;
    address: Address;
};

const profile: UserProfile = {
    name: "Jane Doe",
    email: "jane@example.com",
    address: {
        street: "123 Main St",
        city: "New York",
        zip: "10001",
    },
};

// ✅ Rule of thumb:
// Use interface for objects and classes.
// Use type for everything else (unions, intersections, function types, etc.).