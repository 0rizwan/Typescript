"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greetings = "Hello there";
console.log(greetings);
var a = 5;
console.log(a, "It is number");
var isLoggedIn = false;
console.log(isLoggedIn);
function sumTwo(num) {
    return num + 2;
}
// sumTwo("sdfbsd");
sumTwo(10);
function getUpper(str) {
    return str.toUpperCase();
}
getUpper("hello");
// getUpper(55);
var loginFn = function (name, email, pass) {
    if (pass === void 0) { pass = 'abc'; }
};
loginFn('s', 'f');
// Never Keyword - 
// If a function always throws an error or runs forever, its return type is never.
function fail(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) { }
}
