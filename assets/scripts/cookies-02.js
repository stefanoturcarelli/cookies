"use strict";

// ! Deleting cookies using `expires`

// See the cookies associated with the current document.
console.log(document.cookie ? "Cookies available" : "No cookies available");
console.log(`Cookies length: ${document.cookie.length}`);

// Create a date object and set it to the current date and time
const date = new Date();

// setSeconds() sets the seconds for a specified date according to local time
// The cookie will be deleted after 20 seconds
date.setSeconds(date.getSeconds() + 20);

// Convert the date object to a string
let dateString = date.toDateString();

// Convert the date object to a UTC string
let UTCDate = date.toUTCString();

// Create the cookie using the ExpireDate and `expires` values
document.cookie = `ExpireDate=${dateString}; path=/; expires=${UTCDate}`;
console.log(`Cookie we created: ${document.cookie}`);

// After 20 seconds, this code will run, and the cookies will be gone.
setTimeout(() => {
  console.log("20 seconds have passed");
  console.log(`Cookies in this document: ${document.cookie}`);
  console.log(document.cookie ? "Cookies available" : "No cookies available");
  console.log(`Cookies length: ${document.cookie.length}`);
}, 20000);
