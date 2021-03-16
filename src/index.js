const pendingForm = document.querySelector(".pendingForm"),
  pendingFormInput = pendingForm.querySelector("input"),
  pendingTitle = document.querySelector(".pending"),
  selectorPendingList = document.querySelector(".pending-list"),
  finishedTitle = document.querySelector(".finished"),
  selectorFinishedList = document.querySelector(".finished-list");

function getRandomNumber() {
  return Math.random() * 100000000000000000;
}

let pendingList = [],
  finishedList = [];

function renderPage(currentValue, array) {
  console.log("------------------렌더 페이지 시작");
  const makeLi = document.createElement("li"),
    makeSpan = document.createElement("span"),
    makeDelBtn = document.createElement("button"),
    makeSwitchBtn = document.createElement("button");

  console.log(currentValue);
  makeDelBtn.innerText = "❌";
  makeDelBtn.classList.add("del-btn");
  makeDelBtn.addEventListener("click", handleDelBtn);
  makeSwitchBtn.innerText = "✅";
  makeSwitchBtn.className = "switch-btn";
  makeSwitchBtn.addEventListener("click", handleSwitchBtn);
  makeSpan.innerText = currentValue.text;
  makeLi.id = currentValue.id;
  makeLi.appendChild(makeSpan);
  makeLi.appendChild(makeDelBtn);
  makeLi.appendChild(makeSwitchBtn);
  if (array == finishedList) {
    selectorFinishedList.appendChild(makeLi);
  } else {
    selectorPendingList.appendChild(makeLi);
  }
}

function saveLocalStorage(array) {
  console.log("----------save local storage를 시작합니다.");
  function truePendingList() {
    const savePending = localStorage.setItem(
      "pending",
      JSON.stringify(pendingList)
    );
    if (savePending === null) {
      console.log("----------저장할 Pending 값이 없습니다. null");
    } else {
      "finished", console.log("----------저장합니다: 팬딩 데이터");
      savePending;
    }
  }
  function trueFinishedList() {
    const saveFinished = localStorage.setItem(
      "finished",
      JSON.stringify(finishedList)
    );
    if (saveFinished === null) {
      console.log("---------저장할 Finished 값이 없습니다. null");
    } else {
      console.log("-----------저장합니다: 피니시 데이터");
      saveFinished;
    }
  }
  if (array == pendingList) {
    truePendingList();
  } else if (array == finishedList) {
    trueFinishedList();
  }
}

function loadLocalStorage() {
  console.log("----------------로드 시작");
  console.log(pendingList);
  console.log(finishedList);
  const loadPending = localStorage.getItem(
    "pending",
    JSON.stringify(pendingList)
  );
  const loadFinished = localStorage.getItem(
    "finished",
    JSON.stringify(finishedList)
  );
  if (loadPending === null) {
    console.log("Pending 값이 없습니다. null");
  } else {
    const parsedPending = JSON.parse(loadPending);
    pendingList = parsedPending;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(pendingList);
    pendingList.forEach(function (list) {
      renderPage(list);
    });
    console.log("--------Pending Render 끝-----");
    console.log(parsedPending);
  }

  if (loadFinished === null) {
    console.log("Finished 값이 없습니다. null");
  } else {
    const parsedFinished = JSON.parse(loadFinished);
    finishedList = parsedFinished;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(finishedList);
    finishedList.forEach(function (list) {
      renderPage(list, finishedList);
    });
    console.log("--------Finishied Render 끝-----");
    console.log(parsedFinished);
  }
  console.log("---------------- 로드 끝");
}

function makeObject(currentValue, array) {
  // console.log(currentValue);
  // console.log(array);
  console.log("---------------make Object 시작.");
  console.log(currentValue);
  console.log(array);
  const newObj = {
    id: getRandomNumber(),
    text: currentValue,
  };
  console.log(newObj);
  array.push(newObj);
  renderPage(newObj, array);
  console.log(array);
  saveLocalStorage(array);
}

function handleSwitchBtn(event) {
  console.log("------------SWITCH------------");
  const btn = event.target,
    li = btn.parentNode,
    div = li.parentNode,
    innerText = li.childNodes[0].innerText;
  // console.dir(li.id);
  // console.log(li.childNodes[0].innerText);
  // console.log(pendingList);
  // console.log(pendingList);

  if (div == selectorPendingList) {
    console.log("-------------switch: pending 클릭");
    selectorPendingList.removeChild(li);
    const newList = pendingList.filter(function (tomato) {
      return tomato.id !== parseInt(li.id);
    });
    pendingList = newList;

    saveLocalStorage(pendingList);
    makeObject(innerText, finishedList);
    // renderPage(innerText, pendingList);
  } else {
    console.log("-------------switch: finished 클릭");
    selectorFinishedList.removeChild(li);
    const newList = finishedList.filter(function (tomato) {
      return tomato.id !== parseInt(li.id);
    });
    finishedList = newList;

    saveLocalStorage(finishedList);
    makeObject(innerText, pendingList);
  }

  // makeObject(currentValue, )
}

function handleDelBtn(event) {
  console.log("------------DELETE------------");
  const btn = event.target,
    li = btn.parentNode,
    div = li.parentNode;
  console.log("---------1");
  console.log(li.id);
  if (div == selectorPendingList) {
    selectorPendingList.removeChild(li);
    const newList = pendingList.filter(function (tomato) {
      return tomato.id !== parseInt(li.id);
    });
    console.log("---------2");
    console.log(newList);

    pendingList = newList;
    saveLocalStorage(pendingList);
  } else {
    const btn = event.target,
      li = btn.parentNode;
    selectorFinishedList.removeChild(li);
    const newList = finishedList.filter(function (toDoo) {
      return toDoo.id !== parseInt(li.id);
    });
    finishedList = newList;
    saveLocalStorage(finishedList);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = pendingFormInput.value;
  makeObject(currentValue, pendingList);
  // loadLocalStorage();
  pendingFormInput.value = "";
}

function init() {
  // 먼저 불러와서 저장해야됨.
  loadLocalStorage();
  pendingForm.addEventListener("submit", handleSubmit);
}

init();
