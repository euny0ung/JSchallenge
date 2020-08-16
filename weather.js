// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "0c2a567fd726aec946479eb1477a658e";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ) //http를 https로 바꾸니까 된다ㅠㅠ
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const myPlace = json.name;
      weather.innerHTML = `${temp}℃ &nbsp;&nbsp; In ${myPlace}`;
    });
} //then은 데이터가 완전히 들어온 후 함수호출, fetch가 완전히 될때까지 다음작업x

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
} //JSON.stringify는 JSON 객체를 string으로 변환

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //console.log(position);
  const coordsObj = {
    latitude,
    longitude
  }; //name과 key값이 같은 경우 생략
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
} //좌표를 가져오는데 성공했을때

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
} //navigator API사용, geolocation은 객체, 내 위치 읽기

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
