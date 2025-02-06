var currentCell, editTextbox;
function resetCursor(txtElement) {
  if (txtElement.setSelectionRange) {
    // input or textarea
    txtElement.focus();
    txtElement.setSelectionRange(0, 0);
  } else if (txtElement.createTextRange) {
    // all other
    var range = txtElement.createTextRange();
    range.moveStart("character", 0);
    range.select();
  }
}
function onCompleteEdit(event) {
  if (event.keyCode == 13) {
    var currentValue = editTextbox.value;
    currentCell.setAttribute("data-eq", currentValue);
    if (currentValue.startsWith("=")) {
      var valueOnlyEq = transform(currentValue.substr(1));
      currentValue = eval(valueOnlyEq);
    }
    currentCell.setAttribute("data-result", currentValue);
    hideEditTextbox();
  }
}
function onEdit(event) {
  var target = event.target;
  editTextbox.addEventListener("keypress", onCompleteEdit);
}
function hideEditTextbox() {
  editTextbox.classList.add("hide");
  editTextbox.value = "";
  editTextbox.removeEventListener("keypress", onCompleteEdit);
  currentCell.textContent = currentCell.getAttribute("data-result");
}
function onDblClick(event) {
  var storedValue = currentCell.getAttribute("data-eq");

  if (storedValue) {
    editTextbox.value = storedValue;
    currentCell.textContent = "";
  }
  editTextbox.style.top = currentCell.offsetTop + "px";
  editTextbox.style.left = currentCell.offsetLeft + "px";
  editTextbox.classList.remove("hide");
  resetCursor(editTextbox);
}
function onClick(event) {
  var target = event.target;

  if (target.classList.contains("cell")) {
    if (currentCell) {
      currentCell.classList.remove("selected");
      hideEditTextbox();
    }
    currentCell = target;
    currentCell.classList.add("selected");
  }
}
function transform(equation) {
  var OPS_STR = "+-/*",
    OPS_REGEX = /[+,-,/,*]/,
    opSeq = [];
  for (var i = 0; i < equation.length; i++) {
    if (OPS_STR.indexOf(equation[i]) != -1) {
      opSeq.push(equation[i]);
    }
  }
  return equation
    .split(OPS_REGEX)
    .map(function (value, index) {
      var trimmedString = value.trim(),
        prevOp = opSeq[index - 1],
        nextOp = opSeq[index + 1],
        result;
      if (startsWithAlphabet(trimmedString)) {
        var cellValue = document
          .getElementById(trimmedString)
          .getAttribute("data-result");
        if (cellValue) {
          result = cellValue;
        } else if (
          prevOp == "*" ||
          prevOp == "/" ||
          nextOp == "*" ||
          nextOp == "/"
        ) {
          result = 1;
        } else {
          result = 0;
        }
      } else {
        result = trimmedString;
      }
      if (index < opSeq.length) {
        result += opSeq[index];
      }
      return result;
    })
    .join("");
}
function startsWithAlphabet(str) {
  var re = /^[A-Za-z][0-9]+$/;
  return re.test(str);
}

document.body.addEventListener("click", onClick);
document.body.addEventListener("dblclick", onDblClick);
editTextbox = document.createElement("textarea");
editTextbox.id = "edit-textbox";
editTextbox.classList.add("hide");
document.body.appendChild(editTextbox);
editTextbox.addEventListener("input", onEdit);
