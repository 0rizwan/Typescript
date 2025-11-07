// ********Enums in TypeScript********

// Enums (short for enumerations) are a special TypeScript feature that let you define a set of named constants 
// — a clean way to represent a group of related values.
// They make your code more readable, maintainable, and self-documenting.

// 🔹 1. What Is an Enum?
// An enum is a way to define a collection of named constants that represent a fixed set of possible options.
{

    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    // This defines four constants:

    Direction.Up
    Direction.Down
    Direction.Left
    Direction.Right

}
// Each of them is automatically assigned a number value (starting from 0 by default).

// 🔹 2. How Numeric Enums Work
// By default, TypeScript assigns incrementing numbers starting at 0:
{

    enum Direction {
        Up,      // 0
        Down,    // 1
        Left,    // 2
        Right,   // 3
    }

    console.log(Direction.Up);     // 0
    console.log(Direction.Right);  // 3


    // 🧠 Enums in TypeScript are bi - directional — meaning you can look up the name by value and value by name:

    console.log(Direction[0]); // "Up"
    console.log(Direction.Up); // 0
}

// 🔹 3. Custom Numeric Values
// You can assign custom starting values, and subsequent members auto - increment.
{
    enum Direction {
        Up = 1,
        Down,   // 2
        Left,   // 3
        Right,  // 4
    }



    // Or assign any number to each:

    enum HttpStatus {
        OK = 200,
        NotFound = 404,
        InternalServerError = 500,
    }
}

// 🔹 4. String Enums
// Instead of numbers, you can use string values for readability.
{
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }

    enum Direction2 {
        Up = 1,
        Down = 2,
        Left = 3,
        Right = 4,
    }


    // ✅ Pros:
    // Easier to debug(you see "UP" in logs, not 0).
    // Safer when interacting with external data(e.g., API strings).

    // ❌ Cons:
    // Not bi - directional(can’t reverse lookup by value).

    console.log(Direction2.Up); // "UP"
    console.log(Direction2[2]); // ❌ undefined
}

// 🔹 5. Heterogeneous Enums(Mixing String & Number)
// You can mix numbers and strings — but it’s generally discouraged unless necessary.

enum Mixed {
    No = 0,
    Yes = "YES",
}


// This can be useful in rare cases(like external APIs with inconsistent types).

// 🔹 6. Computed and Constant Members
// Enum members can be:

// Constant: known at compile - time.

// Computed: calculated at runtime.

enum FileAccess {
    None,                // 0
    Read = 1 << 1,       // 2
    Write = 1 << 2,      // 4
    ReadWrite = Read | Write, // 6
    G = "123".length,    // Computed: 3
}


// Here, bitwise operators are used to represent combinations of permissions.

// 🔹 7. Using Enums in Code
{
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    function move(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                console.log("Moving up!");
                break;
            case Direction.Down:
                console.log("Moving down!");
                break;
        }
    }

    move(Direction.Up);   // ✅ "Moving up!"
    move(0);              // ✅ Also valid (since Up = 0)

}
// 🧠 Enums are compiled to JavaScript objects, so they can be used at runtime too.

// 🔹 8. Enums Are Real Objects
// In the compiled JavaScript, the enum above becomes:
{
    "use strict";
    var Direction;
    (function (Direction) {
        Direction[(Direction["Up"] = 0)] = "Up";
        Direction[(Direction["Down"] = 1)] = "Down";
        Direction[(Direction["Left"] = 2)] = "Left";
        Direction[(Direction["Right"] = 3)] = "Right";
    })(Direction || (Direction = {}));

}
// That’s why they’re bi - directional — each name and value maps to the other.

// 🔹 9. Const Enums
// If you don’t need runtime code(and want cleaner, faster JS), use a const enum.
{
    const enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    let move = Direction.Up;


    // Compiles to inline values:

    // var move = 0 /* Direction.Up */;
}

// ✅ Pros:
// No extra JS code.
// Better performance.

// ❌ Cons:
// Can’t access at runtime.
// No reverse lookup.

// 🔹 10. Enum as Types
// Each enum creates a type automatically.
{
    enum Direction {
        Up,
        Down,
    }

    let move: Direction;

    move = Direction.Up;   // ✅ OK
    move = 0;              // ✅ OK (number enum)
    move = 2;              // ❌ Error (invalid number)


    // 🧠 With string enums, only declared values are allowed:

    enum Direction {
        Up = "UP",
        Down = "DOWN",
    }

    let dir: Direction = Direction.Up; // ✅
    // dir = "UP"; // ❌ Error (must be Direction.Up)
}

// 🔹 11. Enum with Functions
// You can pass enums to functions to make your logic cleaner:

enum Role {
    User,
    Admin,
    Guest,
}

function checkAccess(role: Role) {
    if (role === Role.Admin) {
        console.log("Full access granted!");
    } else {
        console.log("Limited access.");
    }
}

checkAccess(Role.User);  // "Limited access."
checkAccess(Role.Admin); // "Full access granted!"

// 🔹 12. Enum with Type Narrowing
// TypeScript can narrow down enums just like other types:

enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case ShapeKind.Circle:
            return Math.PI * shape.radius ** 2;
        case ShapeKind.Square:
            return shape.side * shape.side;
    }
}


// Enums + discriminated unions = very powerful combination 💥

// 🔹 13. Reverse Mapping(Numeric Enums Only)
enum Status {
    Ready,
    Waiting,
}

console.log(Status.Ready);   // 0
console.log(Status[0]);      // "Ready"


// But this doesn’t work for string enums:

enum Color {
    Red = "RED",
}

// console.log(Color["RED"]); // ❌ undefined

// 🔹 14. Enums vs Literal Unions
// These two look similar — but have different trade - offs.
{
    // Literal Union:
    type Direction = "up" | "down" | "left" | "right";

    // Enum:
    enum Direction2 {
        Up,
        Down,
        Left,
        Right,
    }
}

// Feature	            Enum	            Literal Union
// Runtime presence	    ✅ Yes(object)      ❌ No(type - only)
// Performance	        Slight overhead     Lighter
// Reverse lookup	    ✅ Yes(numeric)	    ❌ No
// Use case	When you need runtime constants	When you only need compile - time types

// 🧠 Rule of thumb:
// Use literal unions when you only need typing.
// Use enums when you need both typing + actual constants in runtime logic.

// 🔹 15. Enums with keyof typeof
// To extract enum values as a type:
{
    enum Direction {
        Up = "UP",
        Down = "DOWN",
    }

    type DirectionType = keyof typeof Direction;
    // "Up" | "Down"

    type DirectionValues = (typeof Direction)[DirectionType];
    // "UP" | "DOWN"

}
// Now you can use DirectionValues as a union of all enum values — very useful for validation or serialization.

// 🔹 16. Real - World Examples
// 🧭 Example 1: HTTP Status Codes
enum HttpStatus {
    OK = 200,
    NotFound = 404,
    BadRequest = 400,
}

function isError(code: HttpStatus): boolean {
    return code >= HttpStatus.BadRequest;
}

console.log(isError(HttpStatus.OK));        // false
console.log(isError(HttpStatus.NotFound));  // true

// ⚙️ Example 2: Logging Levels
enum LogLevel {
    Info = "INFO",
    Warning = "WARN",
    Error = "ERROR",
}

function logMessage(level: LogLevel, message: string) {
    console.log(`[${level}] ${message}`);
}

logMessage(LogLevel.Info, "Application started");

// 🎮 Example 3: Game Directions
{
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }

    function movePlayer(direction: Direction) {
        console.log(`Player moved ${direction}`);
    }

    movePlayer(Direction.Left);
}
// 🧠 Summary
    // Concept              Example                     Description
// Numeric enum	        enum A { X, Y }	        Values auto-increment (0, 1, 2...)
// String enum	        enum A { X = "x" }	    Fixed string values
// Const enum	        const enum A { X }	    Inline values, no runtime object
// Custom values	enum A { X = 10, Y = 20 }	Custom numbers
// Reverse lookup	    A[0] → "X"	            Only for numeric enums
// Heterogeneous	enum A { X = 1, Y = "Y" }	Mix types (rare)
// keyof typeof	    Extract enum keys or values	  For advanced typing
// Literal unions	      "up" | "down"	        Lightweight alternative


// ✅ In short:

// Use enum when you need both runtime and compile-time representations.
// Use string enums for readability.
// Use const enum for performance-critical or config-heavy code.
// Use literal unions for type-only flexibility.

export { }