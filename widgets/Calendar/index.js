class Calendar {
  selectedDate = new Date();

  getMonthData() {
    const firstDay = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1
    ).getDay();
    const lastDateObj = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      0
    );

    const lastDay = lastDateObj.getDay();
    const lastDate = lastDateObj.getDate();

    let week = [];
    let month = [];
    for (let d = 0; d < firstDay; d++) week.push(0);
    console.log(firstDay, lastDay);
    for (let d = 1; d <= lastDate; d++) {
      week.push(d);
      if (week.length === 7) {
        month.push(week);
        week = [];
      }
    }

    if (week.length) {
      for (let d = lastDay + 1; d < 7; d++) week.push(0);
      month.push(week);
    }

    return month;
  }
}

const calendar = new Calendar();
generateDays(calendar.getMonthData());
console.log(calendar.getMonthData());
addListener();

function generateDays(monthData) {
  let container = document.querySelector(".days");

  monthData.forEach((week) => {
    let row = document.createElement("tr");
    row.classList.add("week");
    week.forEach((day) => {
      let cell = document.createElement("td");
      cell.textContent = day || "_";
      row.appendChild(cell);
    });
    container.appendChild(row);
  });

  return container;
}

function addListener() {
  let container = document.querySelector(".days");
  let left = document.querySelector(".left");

  document.addEventListener("click", (e) => {
    let target = e.target;
    if (target.tagName === "TD" && target.textContent !== "_") {
      left.textContent = target.textContent;
    }
  });
}
