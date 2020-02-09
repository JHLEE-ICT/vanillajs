const weatherContainer = document.querySelector(".js-weather");

const API_KEY = "23fd58ec47b8383168f4b7e28a7c81ce";
const COORDS = "coords";

function getWeather(lat, lon) {
  //데이터를 얻으려면 fetch를 이용
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const locationWeather = json.weather[0].main;
      const temperature = json.main.temp;
      const place = json.name;
      weatherContainer.innerText = `${locationWeather} ${temperature}°C @${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  //첫번째 인자 : geo를 가져오는 것을 성공했을 때의 함수
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //getWheather
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
