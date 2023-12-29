"use strict";

// ! Deleting cookies using `max-age`

// See the cookies associated with the current document.
console.log(document.cookie ? "Cookies available" : "No cookies available");
console.log(`Cookies length: ${document.cookie.length}`);

// Create a lifetime variable and set it to 20 seconds
let lifetime = 20;

// Create the cookie using the lifetime we have created
document.cookie = `Job=Instructor;  path=/; max-age=${lifetime}; SameSite=Lax; Secure`;

// After 20 seconds, this code will run, and the cookies will be gone.
// lifetime * 1000 milliseconds gives us 20 seconds.
setTimeout(() => {
  console.log("20 seconds have passed");
  console.log(`Cookies in this document: ${document.cookie}`);
  console.log(document.cookie ? "Cookies available" : "No cookies available");
  console.log(`Cookies length: ${document.cookie.length}`);
}, lifetime * 1000);
