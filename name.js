import "./styles.css";

const Name = document.querySelector(".js-Name");
const myName = Name.querySelector("input");
const local = document.querySelector(".js-locals");
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintName(text) {
  console.log("USER_LS");
  Name.classList.remove(SHOWING_CN);
  local.classList.add(SHOWING_CN);
  local.innerText = `Hi ${text}`;
}

function askForName() {
  Name.classList.add(SHOWING_CN);
  Name.addEventListener("submit", handleSubmit);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); //엔터쳤을때 글자 사라지지않게
  const currentValue = myName.value; //입력값
  paintName(currentValue);
  saveName(currentValue);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintName(currentUser);
  } //currentUser값이 있어도 이름입력받음.. -> key값을 currentUser로 설정해야함..
}

function init() {
  loadName();
}
init();
