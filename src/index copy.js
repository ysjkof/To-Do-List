const toDoForm = document.querySelector(".pendingForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".pending");

const TODOS_LS = "toDos";

function paintToDo(text) {
  console.log(text + " :paintToDo");
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
  console.log(currentValue + " :handleSubmit");
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
