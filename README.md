# Cookies

---

**Table of contents**

- [Intro to Cookies](#intro-to-cookies)
- [Creating Cookies](#creating-cookies)
  - [Encoding cookies using `encodeURIComponent()`](#encoding-cookies-using-encodeuricomponent)
- [Deleting Cookies](#deleting-cookies)
  - [Deleting cookies using `expires`](#deleting-cookies-using-expires)
  - [Deleting cookies using `max-age`](#deleting-cookies-using-max-age)

## Intro to Cookies

- **Cookie Basics:**
  - Cookies are small text (string) sent by a website to your browser, comprising a semicolon-separated list of associated cookies.
  - Aids in remembering visit information for a more user-friendly experience.
- **HTTP Protocol Involvement:**
  - An integral part of the HTTP protocol.
  - Typically set by the web server using the 'Set-Cookie' HTTP header in the response.
- **The property `document.cookie`:**
  - Allows reading and writing of cookies for the current document.
  - Acts as both a getter and setter for the document's cookies.
- **Encoding and Decoding:**
  - Encoding and decoding ensure cookie validity.
  - Utilize `encodeURIComponent()` for encoding and `decodeURIComponent()` for decoding.
- **Restrictions:**
  - Maximum of 300 cookies in total.
  - Limit of 20 cookies per domain.
  - Cookies are restricted to 4KB in size.
  - Cookies must be in string format.
- See the cookies associated with the current document
  ```jsx
  // See the cookies associated with the current document.
  console.log(document.cookie ? "Cookies available" : "No cookies available");
  console.log(`Cookies length: ${document.cookie.length}`);
  ```

## Creating Cookies

Setting a cookie:
To work properly with cookies we must know how to encode and decode them. We achieve this with `encodeURIComponent()` and `decodeURIComponent()`.

The`document.cookie` property allows you to read and write cookies associated with the document. It acts as both a getter and a setter for the document's cookies.

```jsx
document.cookie = "Name=John";
console.log(document.cookie); // document.cookie: Name=John
```

### Encoding cookies using `encodeURIComponent()`

Encoding cookies is important for ensuring that the data within the cookie is transmitted correctly. This is because cookies can only contain ASCII data and must exclude certain characters like semicolons, commas, and whitespace.

The `encodeURIComponent()` function in JavaScript is used to encode a URI component by replacing each instance of certain characters with one, two, three, or four escape sequences representing the UTF-8 encoding of the character.

The following JavaScript code creates two cookies: one for the first name and another for the city.

```jsx
let firstNameKey = encodeURIComponent("First Name");
let firstNameValue = encodeURIComponent("John Smith");
let city = encodeURIComponent("New York");

document.cookie = `${firstNameKey}=${firstNameValue}`;
document.cookie = `City=${city}`;

console.log(document.cookie);
// document.cookie: First%20Name=John%20Smith; City=New%20York
```

1. `let firstNameKey = encodeURIComponent("First Name");` - This line encodes the string "First Name" to make it safe for use as a cookie key. Spaces are encoded as `%20`.
2. `let firstNameValue = encodeURIComponent("John Smith");` - This line encodes the string "John Smith" to make it safe for use as a cookie value. Again, spaces are encoded as `%20`.
3. `let city = encodeURIComponent("New York");` - This line encodes the string "New York" to make it safe for use as a cookie value.
4. `` document.cookie = `${firstNameKey}=${firstNameValue} ``;`` - This line is setting a cookie with the key "First Name" and the value "John Smith". The cookie string is constructed using template literals.
5. `` document.cookie = `City=${city}`; `` - This line is setting another cookie with the key "City" and the value "New York".
6. `console.log(document.cookie);` - This line is logging the current document's cookies to the console. The output will be `First%20Name=John%20Smith; City=New%20York`.

Remember, the `document.cookie` property allows you to read and write cookies associated with the document. It acts as both a getter and a setter for the document's cookies.

### Decoding cookies using `decodeURIComponent()`

Decoding cookies is necessary when you want to read the data from the cookie. The `decodeURIComponent()` function is used to decode a URI component.

This process of encoding and decoding helps to ensure that the data in the cookie remains valid and intact throughout its lifecycle.

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
