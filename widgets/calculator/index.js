const display = document.getElementById("display");
const calculator = document.getElementById("calculator");

let current = "";
let previous = null;
let operator = null;

function calculate() {
  if (current === "") return;

  const number = Number(current);

  if (previous === null) {
    previous = number;
  } else if (operator === "+") {
    previous += number;
  }

  current = "";
  display.textContent = previous;
}

calculator.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !calculator.contains(button)) return;

  // Number pressed
  if (button.classList.contains("num-key")) {
    current += button.textContent.trim();
    display.textContent = current;
    return;
  }

  // Operator pressed
  if (button.classList.contains("op-key")) {
    calculate();
    operator = button.textContent.trim();
    return;
  }

  // Equals pressed
  if (button.id === "solve-key") {
    calculate();
    operator = null;
  }
});

display.textContent = "0";
