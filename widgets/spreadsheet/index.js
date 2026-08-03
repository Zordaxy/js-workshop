const table = document.querySelector("#spreadsheet");
const formulaBox = document.querySelector("#formula-box");
const cells = [...table.querySelectorAll(".cell")];

let selectedCell = null;
let editingCell = null;

cells.forEach((cell) => {
  cell.dataset.raw = cell.textContent.trim();
});

function selectCell(cell) {
  selectedCell?.classList.remove("selected");

  selectedCell = cell;
  selectedCell.classList.add("selected");

  formulaBox.value = selectedCell.dataset.raw;
}

function startEditing(cell) {
  if (editingCell) {
    finishEditing();
  }

  selectCell(cell);
  editingCell = cell;

  const input = document.createElement("input");
  input.value = cell.dataset.raw;

  cell.replaceChildren(input);
  input.focus();
  input.select();
}

function finishEditing() {
  if (!editingCell) return;

  const cell = editingCell;
  const input = cell.querySelector("input");

  cell.dataset.raw = input.value.trim();
  editingCell = null;

  renderAll();
  selectCell(cell);
}

function cancelEditing() {
  if (!editingCell) return;

  const cell = editingCell;
  editingCell = null;

  renderAll();
  selectCell(cell);
}

function renderAll() {
  cells.forEach((cell) => {
    if (cell === editingCell) return;

    try {
      cell.textContent = evaluateCell(cell);
    } catch {
      cell.textContent = "#ERROR";
    }
  });
}

function evaluateCell(cell, visited = new Set()) {
  const raw = cell.dataset.raw;

  if (!raw.startsWith("=")) {
    return raw;
  }

  if (visited.has(cell.id)) {
    throw new Error("Circular reference");
  }

  visited.add(cell.id);

  // Replace cell references with their evaluated values
  const expression = raw
    .slice(1)
    .replace(/\b[A-Z]+[1-9]\d*\b/gi, (reference) => {
      const referencedCell = document.getElementById(reference.toLowerCase());

      if (!referencedCell) {
        throw new Error("Unknown cell");
      }

      const value = evaluateCell(referencedCell, new Set(visited));

      const number = value === "" ? 0 : Number(value);

      if (!Number.isFinite(number)) {
        throw new Error("Referenced cell is not numeric");
      }

      return `(${number})`;
    });

  return calculate(expression);
}

function calculate(expression) {
  const normalized = expression.replace(/\s+/g, "");

  if (!/^[0-9+\-*/().]+$/.test(normalized)) {
    throw new Error("Invalid formula");
  }

  const result = Function(`"use strict"; return (${normalized})`)();

  if (!Number.isFinite(result)) {
    throw new Error("Invalid result");
  }

  return result;
}

table.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");

  if (!cell) return;

  if (editingCell && editingCell !== cell) {
    finishEditing();
  }

  if (!editingCell) {
    selectCell(cell);
  }
});

table.addEventListener("dblclick", (event) => {
  const cell = event.target.closest(".cell");

  if (cell) {
    startEditing(cell);
  }
});

table.addEventListener("keydown", (event) => {
  if (!editingCell) return;

  if (event.key === "Enter") {
    event.preventDefault();
    finishEditing();
  }

  if (event.key === "Escape") {
    event.preventDefault();
    cancelEditing();
  }
});

renderAll();
