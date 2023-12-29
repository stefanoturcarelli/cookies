"use strict";

import {
  onEvent,
  getElement,
  select,
  selectAll,
  print,
  sleep,
  randomNumber,
  filterArray,
  create,
} from "./utils.js";

const acceptBtn = select(".accept");
const settingsBtn = select(".settings");
const overlay = select(".overlay");
const cookiesModal = select(".cookies-modal-first");
const settingsModal = select(".cookies-modal-settings");
const savePrefrencesBtn = select(".save");
const browserCheckbox = select(".browser-checkbox");
const operatingSystemCheckbox = select(".os-checkbox");
const screenWidthCheckbox = select(".screen-width-checkbox");
const screenHeightCheckbox = select(".screen-height-checkbox");

const toggleSwitchValuesArray = [
  select(".browser-checkbox"),
  select(".os-checkbox"),
  select(".screen-width-checkbox"),
  select(".screen-height-checkbox"),
];

let browserKey = encodeURIComponent("Browser");
let browserValue = encodeURIComponent(getBrowser());

let operatingSystemKey = encodeURIComponent("Operating System");
let operatingSystemValue = encodeURIComponent(getOS());

let screenWidthKey = encodeURIComponent("Screen Width");
let screenWidthValue = encodeURIComponent(getScreenWidth());

let screenHeightKey = encodeURIComponent("Screen Height");
let screenHeightValue = encodeURIComponent(getScreenHeight());

let lifetime = 15;

function setCookie() {
  if (browserCheckbox.checked) {
    document.cookie = `${browserKey}=${browserValue}; max-age=${lifetime}`;
  } else {
    document.cookie = `${browserKey}=Rejected; max-age=${lifetime}`;
  }
  if (operatingSystemCheckbox.checked) {
    document.cookie = `${operatingSystemKey}=${operatingSystemValue}; max-age=${lifetime}`;
  } else {
    document.cookie = `${operatingSystemKey}=Rejected; max-age=${lifetime}`;
  }
  if (screenWidthCheckbox.checked) {
    document.cookie = `${screenWidthKey}=${screenWidthValue}; max-age=${lifetime}`;
  } else {
    document.cookie = `${screenWidthKey}=Rejected; max-age=${lifetime}`;
  }
  if (screenHeightCheckbox.checked) {
    document.cookie = `${screenHeightKey}=${screenHeightValue}; max-age=${lifetime}`;
  } else {
    document.cookie = `${screenHeightKey}=Rejected; max-age=${lifetime}`;
  }
}

function getCookie() {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split("; ");
  console.log(`Browser: ${cookieArray[0].split("=")[1]}`);
  console.log(`Operating System: ${cookieArray[1].split("=")[1]}`);
  console.log(`Screen Width: ${cookieArray[2].split("=")[1]}`);
  console.log(`Screen Height: ${cookieArray[3].split("=")[1]}`);
}

function getOS() {
  const opSystem = navigator.userAgent;

  const osPatterns = {
    Windows: /Windows/,
    Mac: /Mac/,
  };

  const matchingOS = Object.keys(osPatterns).find((os) =>
    osPatterns[os].test(opSystem)
  );

  return matchingOS || "Unknown";
}

function getBrowser() {
  const userAgent = navigator.userAgent;

  const browserPatterns = {
    Edge: /Edg/,
    Firefox: /Firefox/,
    Chrome: /Chrome/,
  };

  const matchingBrowser = Object.keys(browserPatterns).find((browser) =>
    browserPatterns[browser].test(userAgent)
  );

  return matchingBrowser || "Unknown";
}

function getScreenWidth() {
  return screen.width;
}

function getScreenHeight() {
  return screen.height;
}

function showFirstCookiesModal() {
  overlay.style.opacity = 1;
  cookiesModal.style.visibility = "visible";
}

function hideFirstCookiesModal() {
  cookiesModal.style.display = "none";
  overlay.style.opacity = 0;
  overlay.style.visibility = "hidden";
}

function showSettingsModal() {
  overlay.style.opacity = 1;
  overlay.style.visibility = "visible";
  settingsModal.style.visibility = "visible";
}

function hideSettingsModal() {
  overlay.style.opacity = 0;
  overlay.style.visibility = "hidden";
  settingsModal.style.display = "none";
}

function startCountingSeconds() {
  sleep(15000).then(() => {
    console.log(`Cookies expired`);
  });
}

onEvent("load", window, () => {
  if (document.cookie) {
    getCookie();
  } else {
    sleep(3000).then(() => {
      showFirstCookiesModal();
    });
  }
});

onEvent("click", acceptBtn, () => {
  hideFirstCookiesModal();
  setCookie();
  startCountingSeconds();
  console.log(
    document.cookie ? "Cookies set correctly" : "No cookies available"
  );
});

onEvent("click", settingsBtn, () => {
  hideFirstCookiesModal();
  showSettingsModal();
});

onEvent("click", savePrefrencesBtn, () => {
  hideSettingsModal();
  setCookie();
  getCookie();
  startCountingSeconds();
  console.log(
    document.cookie ? "Cookies set correctly" : "No cookies available"
  );
});

console.log(document.cookie ? "Cookies available" : "No cookies available");
