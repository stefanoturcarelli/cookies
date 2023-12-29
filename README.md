# Cookies

---

**Table of contents**

- [Intro to Cookies](#intro-to-cookies)
- [Deleting Cookies](#deleting-cookies)
  - [Deleting cookies using `expires`](#deleting-cookies-using-expires)
  - [Deleting cookies using `max-age`](#deleting-cookies-using-max-age)

## Intro to Cookies

- **Cookie Basics:**

  - Small text sent by a website to your browser.
  - Aids in remembering visit information for a more user-friendly experience.

- **HTTP Protocol Involvement:**

  - An integral part of the HTTP protocol.
  - Typically set by the web server using the 'Set-Cookie' HTTP header in the response.

- **`document.cookie`:**

  - Allows reading and writing of cookies for the current document.
  - A string comprising a semicolon-separated list of associated cookies.
  - Acts as both a getter and setter for the document's cookies.
  - See the cookies associated with the current document:
    ```jsx
    // See the cookies associated with the current document.
    console.log(document.cookie ? "Cookies available" : "No cookies available");
    console.log(`Cookies length: ${document.cookie.length}`);
    ```

- **Encoding and Decoding:**

  - Encoding and decoding ensure cookie validity.
  - Utilize `encodeURIComponent()` for encoding and `decodeURIComponent()` for decoding.

- **Restrictions:**
  - Maximum of 300 cookies in total.
  - Limit of 20 cookies per domain.
  - Cookies are restricted to 4KB in size.
  - Cookies must be in string format.

## Creating Cookies

## Deleting Cookies

There are two ways of deleting cookies:

1. Using `expires`
2. Using `max-age`

### Deleting cookies using `expires`

1. Create a `date` object and set it to the current date and time.

   ```jsx
   const date = new Date();
   ```

2. Use `setSeconds()` to set the seconds for the specified `date` according to the local time

   ```jsx
   date.setSeconds(date.getSeconds() + 20);
   ```

3. Convert the `date` to a string.

   ```jsx
   let dateString = date.toDateString();
   ```

4. Convert the `date` to a UTC string.

   ```jsx
   let UTCDate = date.toUTCString();
   ```

5. Set the expiration date (in UTC format)

   ```jsx
   document.cookie = `ExpireDate=${dateString}; path=/; expires=${UTCDate}`;
   ```

6. Wait for 20 seconds and refresh the browser. The cookies will be gone.

**Full example:**

```jsx
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
```

### Deleting cookies using `max-age`

1. Create a `lifetime` variable and set it to 20 seconds.

   ```jsx
   let lifetime = 20;
   ```

2. Create a cookie using the `lifetime` we have created.

   ```jsx
   document.cookie = `Job=Instructor;  path=/; max-age=${lifetime}; SameSite=Lax; Secure`;
   ```

3. Wait for 20 seconds and refresh the browser. The cookies will be gone.

**Full example:**

````jsx
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
```

## Demo

[Click here to see the demo](https://stefanoturcarelli.github.io/cookies/)
````
