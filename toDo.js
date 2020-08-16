//js는 localStorage에 string형식만 저장함. boolx datax 따라서 JSON.stringify 사용해서 object를 string화
//filter, forEach 중요

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"), //입력값
  toDoList = document.querySelector(".js-toDoList"),
  finishList = document.querySelector(".js-finishList"); // finished List dom 선택

const TODOS_LS = "toDos";
let toDos = []; //toDos=cleanToDos를 해주기 위해서 let으로 선언
const FIN_LS = "Finish";
let Finish = []; // finish let 선언
let text = ""; // todo -> finish시에 text 뽑아오기위한 전역변수
function FinishToDo(event) {
  // todo -> finish
  const btn = event.target;
  const li = btn.parentNode;
  gettodo(li.id); // todo -> finish text 뽑아오는 함수

  toDoList.removeChild(li); //삭제기능
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을때, toDo.id는 정수고 li.id는 string
  });
  toDos = cleanToDos; //예전 todo를 새 todo로 교체
  saveToDos(); // 현재 todo 저장
  paintfini(text); //finish 다시 그리기
  savefini(); // 현재 finish 저장
}

function reDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  getfini(li.id);

  finishList.removeChild(li);
  const cleanFinish = Finish.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  Finish = cleanFinish;
  savefini();
  paintToDo(text); //finish 다시 그리기
  saveToDos(); // 현재 finish 저장
}

function deleteToDo(event) {
  //console.log(event.target.parentNode); //어떤 버튼이 눌린건지 확인
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); //삭제기능
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을때, toDo.id는 정수고 li.id는 string
  });
  toDos = cleanToDos; //예전 todo를 새 todo로 교체
  saveToDos();
  //const cleanToDos=toDos.filter(filterFn);
  // filter함수는 매개변수로 들어온 함수가 체크된 아이템들의 array를 줌
} //매개변수에 firterFn 넣으면 id가 1인 값만 리턴

function deletefini(event) {
  //console.log(event.target.parentNode); //어떤 버튼이 눌린건지 확인
  const btn = event.target;
  const li = btn.parentNode;
  finishList.removeChild(li); //삭제기능
  const cleanfini = Finish.filter(function (fini) {
    return fini.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을때, toDo.id는 정수고 li.id는 string
  });
  Finish = cleanfini; //예전 fini를 새 fini로 교체
  savefini(); // 현재 fini 저장
  //const cleanToDos=toDos.filter(filterFn);
  // filter함수는 매개변수로 들어온 함수가 체크된 아이템들의 array를 줌
} //매개변수에 firterFn 넣으면 id가 1인 값만 리턴

function paintfini(text) {
  // fini그리기 (X만 하기)
  const li = document.createElement("li"); //쿼리셀럭터는 html에서 요소를 가져오는것이고 이 함수는 직접 요소 만들기
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖"; //html에서 meta 꼭 해주기
  delBtn.style.color = "skyblue";
  delBtn.style.border = "1px solid skyblue";
  delBtn.style.margin = "3px";
  delBtn.style.cursor = "pointer";
  delBtn.addEventListener("click", deletefini); //click 이벤트
  const span = document.createElement("span");
  const finiBtn = document.createElement("button");
  finiBtn.innerText = "⬅";
  finiBtn.style.color = "skyblue";
  finiBtn.style.border = "1px solid skyblue";
  finiBtn.style.cursor = "pointer";
  finiBtn.addEventListener("click", reDo);
  const newId = Finish.length + 1;
  span.innerText = text;

  li.appendChild(span); //appendChild는 부모 클래스?에 하위기능 붙이기
  li.appendChild(delBtn);
  li.appendChild(finiBtn);
  li.id = newId; //나중에 어떤 li를 지워야할지 알게하게끔
  finishList.appendChild(li);
  const finiObj = {
    text: text,
    id: newId
  }; //input하면 text랑 id 정보 저장, localStorage에도 저장됨
  Finish.push(finiObj);
  savefini(); //반드시 push 다음에 호출. push 전에 하면 toDos가 비어있어서 저장할게 없음
}

function paintToDo(text) {
  const li = document.createElement("li"); //쿼리셀럭터는 html에서 요소를 가져오는것이고 이 함수는 직접 요소 만들기
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖"; //html에서 meta 꼭 해주기
  delBtn.style.color = "skyblue";
  delBtn.style.border = "1px solid skyblue";
  delBtn.style.margin = "3px";
  delBtn.style.cursor = "pointer";
  delBtn.addEventListener("click", deleteToDo); //click 이벤트
  const finiBtn = document.createElement("button"); // fini 가는 버튼!
  finiBtn.innerText = "✔";
  finiBtn.style.color = "skyblue";
  finiBtn.style.border = "1px solid skyblue";
  finiBtn.style.cursor = "pointer";
  finiBtn.addEventListener("click", FinishToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;

  li.appendChild(span); //appendChild는 부모 클래스?에 하위기능 붙이기
  li.appendChild(delBtn);
  li.appendChild(finiBtn);
  li.id = newId; //나중에 어떤 li를 지워야할지 알게하게끔
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  }; //input하면 text랑 id 정보 저장, localStorage에도 저장됨
  toDos.push(toDoObj);
  saveToDos(); //반드시 push 다음에 호출. push 전에 하면 toDos가 비어있어서 저장할게 없음
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function savefini() {
  localStorage.setItem(FIN_LS, JSON.stringify(Finish)); // fini localstorage에 저장
}

function handleSubmit(event) {
  event.preventDefault(); //엔터쳤을때 글자 사라지지않게
  const currentValue = toDoInput.value; //입력값
  paintToDo(currentValue);
  toDoInput.value = ""; //엔터쳤을때 초기화?
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //string형식으로 저장된걸 다시 object 형식으로 변환
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    }); //forEach는 배열이 가진 함수. 각각에 대해 paredToDos를 실행한다
    //function(toDo)함수를 안에 넣어준것.
  }
}
function gettodo(id) {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      if (id == toDo.id) {
        text = toDo.text;
      }
    });
  }
}

function loadfini() {
  // fini load!
  const loadedfini = localStorage.getItem(FIN_LS);
  if (loadedfini !== null) {
    const parsedfinish = JSON.parse(loadedfini);
    parsedfinish.forEach(function (fini) {
      paintfini(fini.text);
    });
  }
}

function getfini(id) {
  const loadedfini = localStorage.getItem(FIN_LS);
  if (loadedfini !== null) {
    const parsedfinish = JSON.parse(loadedfini);
    parsedfinish.forEach(function (fini) {
      if (id == fini.id) {
        text = fini.text;
      }
    });
  }
}

function init() {
  loadToDos();
  loadfini();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
