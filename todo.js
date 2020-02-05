const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".pendingList"),
  finishedList = document.querySelector(".finishedList");

const PENDING_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let pendArr = [],
  finArr = [];

function saveFinItem() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finArr));
}

function savePendItem() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendArr));
}

function addPendList(event) {
  const btn = event.target;
  const pendLi = btn.parentNode;
  const text = pendLi.childNodes[0].innerText;
  //Finished List에서 삭제
  finishedList.removeChild(pendLi);
  const cleanFinArr = finArr.filter(function(toDo) {
    return toDo.id !== parseInt(pendLi.id, 10);
  });
  finArr = cleanFinArr;
  saveFinItem();
  //PendingList Html 추가
  paintPendingList(text);
}

function delFinList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinArr = finArr.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  finArr = cleanFinArr;
  saveFinItem();
}

function delPendList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPendArr = pendArr.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  pendArr = cleanPendArr;
  savePendItem();
}

function addFinishedList(event) {
  const btn = event.target;
  const pendLi = btn.parentNode;
  const text = pendLi.childNodes[0].innerText;
  //pending List에서의 삭제
  pendingList.removeChild(pendLi);
  const cleanPendArr = pendArr.filter(function(toDo) {
    return toDo.id !== parseInt(pendLi.id, 10);
  });
  pendArr = cleanPendArr;
  savePendItem();
  //finished List에서의 html 추가
  paintFinishedList(text);
}

function paintFinishedList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const pendBtn = document.createElement("button");
  const newId = finArr.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  pendBtn.innerText = "⏩";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(pendBtn);
  li.id = newId;
  delBtn.addEventListener("click", delFinList);
  pendBtn.addEventListener("click", addPendList);
  finishedList.appendChild(li);
  //localStorage에 추가
  const finObj = {
    text: text,
    id: newId
  };
  finArr.push(finObj);
  saveFinItem();
}

function paintPendingList(text) {
  //html에 추가
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const newId = pendArr.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  finBtn.innerText = "✅";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  delBtn.addEventListener("click", delPendList);
  finBtn.addEventListener("click", addFinishedList);
  pendingList.appendChild(li);
  //localStorage에 추가
  const pendObj = {
    text: text,
    id: newId
  };
  pendArr.push(pendObj);
  savePendItem();
}

function handleSubmit(event) {
  event.preventDefault();
  const task = toDoInput.value;
  paintPendingList(task);
  toDoInput.value = "";
}

function loadedList() {
  const pList = localStorage.getItem(PENDING_LS);
  const fList = localStorage.getItem(FINISHED_LS);
  if (pList !== null) {
    const parsePList = JSON.parse(pList, 10);
    parsePList.forEach(function(toDo) {
      paintPendingList(toDo.text);
    });
  }
  if (fList !== null) {
    const parseFList = JSON.parse(fList);
    parseFList.forEach(function(toDo) {
      paintFinishedList(toDo.text);
    });
  }
}

function init() {
  loadedList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
