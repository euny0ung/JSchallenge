import "./styles.css";

const NINE_HOURS_MILLISECONDS = 32400000;
const clockContainer = document.querySelector(".js-clock");

function getTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  let dayOfWeek = "";

  switch (day) {
    case 0:
      dayOfWeek = "일요일";
      break;
    case 1:
      dayOfWeek = "월요일";
      break;
    case 2:
      dayOfWeek = "화요일";
      break;
    case 3:
      dayOfWeek = "수요일";
      break;
    case 4:
      dayOfWeek = "목요일";
      break;
    case 5:
      dayOfWeek = "금요일";
      break;
    case 6:
      dayOfWeek = "토요일";
      break;
    default:
      dayOfWeek = "없음";
  }

  clockContainer.innerHTML = `${year}/${month}/${date} ${dayOfWeek}
   ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
