const selectorPendingForm = document.querySelector(".pendingForm"),
  selectorPendingFormInput = selectorPendingForm.querySelector("input"),
  selectorPendingTitle = document.querySelector(".pending"),
  selectorPendingList = document.querySelector(".pending-list"),
  selectorFinishedTitle = document.querySelector(".finished"),
  selectorFinishedList = document.querySelector(".finished-list");

function getRandomNumber() {
  return Math.random() * 100000000000000000;
}

let pendingList = [],
  finishedList = [];

function deleteList(event) {
  // console.dir(event.target);
  // console.log(event.target.parentNode);
  // console.log(event.target.parentNode.parentNode);
  // console.log(event);
  const btn = event.target;
  const li = btn.parentNode;
  const div = li.parentNode;

  if (div == selectorFinishedList) {
    selectorFinishedList.removeChild(li);
    const newList = finishedList.filter(function (toDoo) {
      return toDoo.id !== parseInt(li.id);
    });
    finishedList = newList;
    saveLocalStorage(finishedList);
  } else {
    selectorPendingList.removeChild(li);
    const newList = pendingList.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    pendingList = newList;
    saveLocalStorage(pendingList);
  }
}

function loadPendingList() {
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

  if (loadLocalStoragePending !== null) {
    parsedPending.forEach(function (loadedLocalStorage) {
      paintDcoument(loadedLocalStorage.text, selectorPendingList);
    });
  } else {
    console.log("팬딩 불러오기에서 에러");
  }

  if (loadLocalStorageFinished !== null) {
    parsedFinished.forEach(function (loadedLocalStorage) {
      paintDcoument2(loadedLocalStorage.text, selectorFinishedList);
    });
  } else {
    console.log("피니시 불러오기에서 에러");
  }
}

function saveLocalStorage(targetList) {
  if (targetList == finishedList) {
    localStorage.setItem("finished", JSON.stringify(finishedList));
  } else {
    localStorage.setItem("pending", JSON.stringify(pendingList));
  }
}

function switchList(event) {
  console.log(event);
  console.log("switch list");

  const btn = event.target;
  const li = btn.parentNode;
  const div = li.parentNode;

  if (div == selectorFinishedList) {
    selectorFinishedList.removeChild(li);
    const newList = finishedList.filter(function (toDoo) {
      return toDoo.id !== parseInt(li.id);
    });
    const switchList = finishedList.filter(function (toDoo) {
      return toDoo.id == parseInt(li.id);
    });
    finishedList = newList;
    pendingList.push(switchList[0]);
    saveLocalStorage(finishedList);
    saveLocalStorage(pendingList);
  } else {
    selectorPendingList.removeChild(li);
    const newList = pendingList.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    const switchList = pendingList.filter(function (toDoo) {
      return toDoo.id == parseInt(li.id);
    });
    pendingList = newList;
    finishedList.push(switchList[0]);
    saveLocalStorage(pendingList);
    saveLocalStorage(finishedList);
  }
}

function paintDcoument(currentValue, selectList) {
  const makeLi = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteList);
  const switchBtn = document.createElement("button");
  switchBtn.innerHTML = "✅";
  switchBtn.addEventListener("click", switchList);
  const makeSpan = document.createElement("span");
  const newId = pendingList.length + getRandomNumber();
  // <span>currentValue</span>
  makeSpan.innerText = currentValue;

  // 위에 선언한 makeLi 안에 chile를 넣는다 id선택자도 입력한다.
  // <li><span>currentValue</span><button>❌</button>
  makeLi.appendChild(makeSpan);
  makeLi.appendChild(delBtn);
  makeLi.appendChild(switchBtn);
  makeLi.id = newId;
  selectList.appendChild(makeLi);

  // // 로컬스토리지에 value를 여러개 쓰려면 객체 형식으로 전달해야 한다. 그냥하면 마지막 1개로 갱신됨.
  const newObj = {
    id: newId,
    text: currentValue,
  };

  pendingList.push(newObj);
  saveLocalStorage(pendingList);
}

function paintDcoument2(currentValue, selectList) {
  const makeLi = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteList);
  const switchBtn = document.createElement("button");
  switchBtn.innerHTML = "✅";
  switchBtn.addEventListener("click", switchList);
  const makeSpan = document.createElement("span");
  const newId = finishedList.length + getRandomNumber();
  // <span>currentValue</span>
  makeSpan.innerText = currentValue;

  makeLi.appendChild(makeSpan);
  makeLi.appendChild(delBtn);
  makeLi.appendChild(switchBtn);
  makeLi.id = newId;
  selectList.appendChild(makeLi);

  const newObj = {
    id: newId,
    text: currentValue,
  };

  finishedList.push(newObj);
  saveLocalStorage(finishedList);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = selectorPendingFormInput.value;
  paintDcoument(currentValue, selectorPendingList);
}

function init() {
  selectorPendingForm.addEventListener("submit", handleSubmit);
  loadPendingList();
}

init();
