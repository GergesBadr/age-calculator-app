// Get wanted elements
const sumbitBtn = document.getElementById("sumbit-btn"),
  yearInput = document.getElementById("year-input"),
  monthInput = document.getElementById("month-input"),
  dayInput = document.getElementById("day-input"),
  yearsNum = document.getElementById("years-num"),
  monthsNum = document.getElementById("months-num"),
  daysNum = document.getElementById("days-num"),
  yearErrorMsg = document.getElementById("year-error-msg"),
  monthErrorMsg = document.getElementById("month-error-msg"),
  dayErrorMsg = document.getElementById("day-error-msg");

sumbitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  calcAge();
});

function calcAge() {
  // Get current time
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();

  // Handle validation
  validateInput(
    yearInput,
    yearErrorMsg,
    (value) => value <= currentYear && value > 0
  );
  validateInput(monthInput, monthErrorMsg, (value) => value <= 12 && value > 0);
  validateInput(dayInput, dayErrorMsg, (value) => value <= 31 && value > 0);

  // Calculate the difference in years, months, and days
  let birthDate = new Date(
    yearInput.value,
    monthInput.value - 1, // Adjust month value to zero-based index
    dayInput.value
  );
  let yearsDiff = currentYear - birthDate.getFullYear();
  let monthsDiff = currentMonth - birthDate.getMonth();
  let daysDiff = currentDay - birthDate.getDate();

  // handle negative months
  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += 12;
  }

  // handle negative days
  if (daysDiff < 0) {
    monthsDiff--;
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    daysDiff += daysInLastMonth;
  }

  // show the result
  let allInputDivs = document.querySelectorAll(".age-calc-form > div");
  let hasInvalidClass = false;
  allInputDivs.forEach((el) => {
    if (el.classList.contains("invalid")) {
      hasInvalidClass = true;
      return;
    }
  });
  if (!hasInvalidClass) {
    yearsNum.textContent = yearsDiff;
    monthsNum.textContent = monthsDiff;
    daysNum.textContent = daysDiff;
  } else {
    return false;
  }
}

function validateInput(inputElement, errorMsgElement, validationConditions) {
  if (inputElement.value === "") {
    inputElement.parentNode.classList.add("invalid");
    errorMsgElement.textContent = "This field is required";
  } else if (!validationConditions(inputElement.value)) {
    inputElement.parentNode.classList.add("invalid");
    errorMsgElement.textContent = "Must be a valid value";
  } else {
    inputElement.parentNode.classList.remove("invalid");
  }
}
