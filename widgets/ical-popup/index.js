let list = document.querySelector(".calendar-list");

document.querySelector("#calendar-holder").addEventListener("click", (e) => {
  showList(e);
});

function showList(e) {
  list.classList.remove("hidden");
  list.style.left = `${e.clientX - 12}px`;
  list.style.top = `${e.clientY - 12}px`;
  document.addEventListener("click", clearList);
  e.stopPropagation();
}

function clearList(e) {
  console.log("triggered");
  list.classList.add("hidden");
}
