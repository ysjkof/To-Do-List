const selectorPendingForm = document.querySelector(".pendingForm"),
  selectorPendingFormInput = selectorPendingForm.querySelector("input"),
  selectorPendingTitle = document.querySelector(".pending"),
  selectorPendingList = document.querySelector(".pending-list"),
  selectorFinishedTitle = document.querySelector(".finished"),
  selectorFinishedList = document.querySelector(".finished-list"),
  result = document.querySelector(".result");

const makeLi = document.createElement("li"),
  makeSpan = document.createElement("span"),
  delBtn = document.createElement("button"),
  switchBtn = document.createElement("button");

function getRandomNumber() {
  return Math.random() * 100000000000000000;
}

let pendingList = [],
  finishedList = [];

function renderPage() {
  loadLocalStorage();

  finishedList.forEach((value) => document.write(value.text));
  // delBtn.innerHTML = "❌";
  // switchBtn.innerHTML = "✅";
  // makeSpan.innerText = currentValue;
  // makeLi.id = pendingList.text
  // makeLi.appendChild(makeSpan);
  // makeLi.appendChild(delBtn);
  // makeLi.appendChild(switchBtn);
  // selectList.appendChild(makeLi);
  // }
}

function loadLocalStorage() {
  const loadLocalStoragePending = localStorage.getItem(
    "pending",
    JSON.stringify(pendingList)
  );
  const loadLocalStorageFinished = localStorage.getItem(
    "finished",
    JSON.stringify(finishedList)
  );

  const parsedPending = JSON.parse(loadLocalStoragePending);
  const parsedFinished = JSON.parse(loadLocalStorageFinished);

  pendingList.push(parsedPending);
  finishedList.push(parsedFinished);
  // console.log(pendingList);
  // console.log(finishedList);
}

function saveLocalStorage(targetList) {
  if (targetList == finishedList) {
    localStorage.setItem("finished", JSON.stringify(finishedList));
  } else {
    localStorage.setItem("pending", JSON.stringify(pendingList));
  }
}

function makeObject(currentValue, array) {
  // console.log(currentValue);
  // console.log(array);
  const loadLocalStoragePending = localStorage.getItem(
    "pending",
    JSON.stringify(pendingList)
  );
  const loadLocalStorageFinished = localStorage.getItem(
    "finished",
    JSON.stringify(finishedList)
  );
  const newId = getRandomNumber();
  const newObj = {
    id: newId,
    text: currentValue,
  };
  array.push(newObj);
  saveLocalStorage(array);
}

function handleSwitchBtn(event) {
  event.preventDefault();
  const currentValue = switchBtn.value();
}

function handleDelBtn(event) {
  event.preventDefault();
  // console.log(event);
  const currentValue = delBtn.value();
  // console.log(currentValue);
  // const btn = event.target;
  // const li = btn.parentNode;
  // const div = li.parentNode;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = selectorPendingFormInput.value;
  makeObject(currentValue, pendingList);
}

function init() {
  selectorPendingForm.addEventListener("submit", handleSubmit);
  delBtn.addEventListener("click", handleDelBtn);
  switchBtn.addEventListener("click", handleSwitchBtn);
  renderPage();
}

init();
