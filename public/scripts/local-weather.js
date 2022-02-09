const $cityElement = document.querySelector(".city__title");
const $weatherIcon = document.querySelector(".local-weather__icon");
const $weatherElement = document.querySelector(".weather");
const $temperatureElement = document.querySelector(".temperature");
const $feelsLike = document.querySelector(".feels-like__temperature");
const $sunriseElement = document.querySelector(".sunrise__time");
const $sunsetElement = document.querySelector(".sunset__time");
const $humidityElement = document.querySelector(".humidity");
const $atmosphericPressureElement = document.querySelector(
  ".atmospheric-pressure"
);
const $windSpeedElement = document.querySelector(".wind-speed");
const $cloudinessElement = document.querySelector(".cloudiness");

getLocation();

// Get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByLocation);
  } else {
    $cityElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// Get weather information at location
async function getWeatherByLocation(position) {
  const API_KEY = "fe6676708c9a78cc437287b5063ab7aa";
  const API_UNITS = "metric";
  const URL_LOCATION = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=${API_UNITS}`;

  let response = await fetch(URL_LOCATION);
  let json = await response.json();

  // Set city
  $cityElement.textContent = json.name;

  //
  //getInformationAboutCity();

  // Set weather icon
  $weatherIcon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;

  // Set current weather description
  let weatherDescription = json.weather[0].description;

  $weatherElement.textContent =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

  // Set current temperature
  $temperatureElement.innerHTML = `${Math.round(json.main.temp)}&deg; C`;

  // Set feels like temperature
  $feelsLike.innerHTML = `${Math.round(json.main.feels_like)}&deg; C`;

  // Set sunrise
  $sunriseElement.textContent = convertTimestampToTime(json.sys.sunrise);

  // Set sunset
  $sunsetElement.textContent = convertTimestampToTime(json.sys.sunset);

  // Set humidity
  $humidityElement.textContent = `${json.main.humidity} %`;

  // Set atmospheric pressure
  $atmosphericPressureElement.textContent = `${json.main.pressure} hPa`;

  // Set wind speed
  $windSpeedElement.textContent = `${json.wind.speed} m/s`;

  // Set cloudiness
  $cloudinessElement.textContent = `${json.clouds.all} %`;
}

function convertTimestampToTime(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  const date = new Date(timestamp * 1000);

  // Hours part from the timestamp
  const hours = "0" + date.getHours();

  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  // Will display time in 06:30 or 10:30 format
  return hours.slice(-2) + ":" + minutes.slice(-2);
}

// https://en.wikipedia.org/w/api.php?action=query&format=json&titles=Roskilde&prop=extracts&exintro&explaintext

// async function getInformationAboutCity() {
//   // const URL_WIKI = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${city}&prop=extracts&exintro&explaintext`;

//   const URL_WIKI = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=Roskilde`;
//   let response = await fetch(URL_WIKI);
//   let json = await response.json();

//   console.log(json);

// var url = "https://www.mediawiki.org/w/api.php";

// var params = {
//   action: "query",
//   format: "json",
//   titles: "Roskilde",
//   prop: "extracts&exintro&explaintext",
// };

// url = url + "?origin=*";
// Object.keys(params).forEach(function (key) {
//   url += "&" + key + "=" + params[key];
// });

// console.log(url);
// fetch(url)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     var pages = response.query.pages;
//     console.log(pages);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }
