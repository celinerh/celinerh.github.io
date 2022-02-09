function setCookie(cookieName, cookieData, expireDays) {
  let d = new Date();
  const cookiePath = "/";
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${cookieData}; expires=${d};path=${cookiePath}`;
}

function getCookie(cookieName) {
  let result = undefined;
  cookieArray = document.cookie.split("; ");

  cookieArray.forEach((element) => {
    if (element.includes(cookieName)) {
      result = element.split("=")[1];
    }
  });

  return result;
}

const toggleDarkmode = document.querySelector(".toggle__fill");
let lightMode = getCookie("lightMode");

if (lightMode == undefined) {
  setCookie("lightMode", "false", 5);
  lightMode = "false";
}

if (lightMode == "false") {
  turnOff();
}

if (lightMode == "true") {
  if (document.URL.includes("settings.html")) {
    document.querySelector(".toggle__input").checked = true;
  }

  turnOn();
}

if (document.URL.includes("settings.html")) {
  toggleDarkmode.addEventListener("click", clickHandler);
}

function turnOn() {
  document.querySelector(".wrapper").classList.add("dark-mode");
}

function turnOff() {
  document.querySelector(".wrapper").classList.remove("dark-mode");
}

function clickHandler(e) {
  if (lightMode == "false") {
    lightMode = "true";
    setCookie("lightMode", lightMode, 5);
    turnOn();
  } else if (lightMode == "true") {
    lightMode = "false";
    setCookie("lightMode", lightMode, 5);
    turnOff();
  }
}
