const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleUserSubmit(event) {
  event.preventDefault();
  const currentName = input.value;
  paintGreeting(currentName);
  saveName(currentName);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleUserSubmit);
}

function modifyName() {
  greeting.classList.remove(SHOWING_CN);
  askForName();
}

function paintGreeting(text) {
  const modifyBtn = document.createElement("button");
  modifyBtn.innerText = "✏";
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
  greeting.appendChild(modifyBtn);
  modifyBtn.addEventListener("click", modifyName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    // she is not
    askForName();
  } else {
    // she is
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
