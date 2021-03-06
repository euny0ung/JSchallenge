import "./styles.css";

const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `${imgNumber + 1}.jpg.PNG`;
  image.classList.add("bgImage");
  body.prepend(image);
  console.log(imgNumber);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
