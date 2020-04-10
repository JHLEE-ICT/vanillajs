const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".js-clockTitle"),
  jsHour = clockTitle.querySelector(".js-hour"),
  jsMin = clockTitle.querySelector(".js-min"),
  jsSec = clockTitle.querySelector(".js-sec");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  jsHour.innerHTML = `${hours < 10 ? `0${hours}` : hours}`;
  jsMin.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}`;
  jsSec.innerHTML = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
