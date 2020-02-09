const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  trashIcon = document.querySelector(".icon");

const TODOS_LS = "toDos";

let toDos = [];

function clickTrashIcon() {
  const li = document.querySelectorAll("li");

  for (let i = 0; i < li.length; i++) {
    if (toDos[`${i}`].id === parseInt(li[`${i}`].id, 10)) {
      toDoList.removeChild(li[`${i}`]);
    }
  }

  toDos = [];
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const checkInput = document.createElement("input");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  checkInput.type = "checkbox";
  span.innerText = text;
  li.appendChild(checkInput);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
    trashIcon.addEventListener("click", clickTrashIcon);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
