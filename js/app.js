const bill = document.getElementById("bill");

const people = document.querySelector("#selectPeople");

const custom = document.getElementById("custom");

const resetBtn = document.getElementById("reset");

const percentBtns = document.querySelectorAll(".percentage");
const buttons = document.querySelectorAll("button");

const results = document.querySelectorAll(".result");

const inputs = document.querySelectorAll("input");

const errorMsg = document.querySelector(".errorMsg");

percentBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    bill.addEventListener("input", function () {
      if (bill.value >= 1 && people.value >= 1) {
        let tipAmount =
          (bill.value * (parseFloat(btn.innerHTML) / 100)) / people.value;
        let total = bill.value / people.value + tipAmount;
        results[1].innerHTML = total.toFixed(2);
        results[0].innerHTML = tipAmount.toFixed(2);
      } else {
        results[0].innerHTML = "$0.00";
        results[1].innerHTML = "$0.00";
      }
    });
  });
});

percentBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    people.addEventListener("input", function () {
      if (bill.value >= 1 && people.value >= 1) {
        let tipAmount =
          (bill.value * (parseFloat(btn.innerHTML) / 100)) / people.value;
        let total = bill.value / people.value + tipAmount;
        results[1].innerHTML = total.toFixed(2);
        results[0].innerHTML = tipAmount.toFixed(2);
      } else {
        results[0].innerHTML = "$0.00";
        results[1].innerHTML = "$0.00";
      }
    });
  });
});

// -----Remove and add active class----
percentBtns.forEach((btn) => {
  btn.classList.remove("active");
  btn.addEventListener("click", function (evt) {
    custom.value = "";
    percentBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (evt.target.innerHTML == btn.innerHTML) {
        btn.classList.add("active");
      }
    });
  });
});

// ------Calculating via Custom------
custom.addEventListener("input", function () {
  percentBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  bill.addEventListener("input", calcWithCustom());
  people.addEventListener("input", calcWithCustom());
});
// ----Calculate using custom tip----
const calcWithCustom = () => {
  if (bill.value >= 1 && people.value >= 1) {
    let tipAmount = (bill.value * (custom.value / 100)) / people.value;
    let total = bill.value / people.value + tipAmount;
    results[1].innerHTML = total.toFixed(2);
    results[0].innerHTML = tipAmount.toFixed(2);
  } else {
    results[0].innerHTML = "$0.00";
    results[1].innerHTML = "$0.00";
  }
};

// ---People Input Field---
people.addEventListener("input", function () {
  percentBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      if (bill.value >= 1 && people.value >= 1) {
        let tipAmount =
          (bill.value * (parseFloat(event.target.innerHTML) / 100)) /
          people.value;
        let total = bill.value / people.value + tipAmount;
        results[0].innerHTML = tipAmount.toFixed(2);
        results[1].innerHTML = total.toFixed(2);
      } else {
        results[0].innerHTML = "$0.00";
        results[1].innerHTML = "$0.00";
      }
    });
  });

  custom.addEventListener("input", calcWithCustom());

  if (people.value < 1) {
    errorMsg.style.display = "block";
    people.style.outline = "2px solid tomato";
  } else {
    errorMsg.style.display = "none";
    people.style.outline = "2px solid hsl(172, 67%, 45%)";
  }
});

// ----RESET BUTTON----
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (
      Number(bill.value >= 1) ||
      Number(custom.value >= 1) ||
      Number(people.value >= 1)
    ) {
      resetBtn.style.opacity = 1;
    } else {
      resetBtn.style.opacity = 0.2;
    }
  });
});

resetBtn.addEventListener("click", function () {
  // ---Resets all inputs---
  inputs.forEach((input) => {
    if (input) input.value = "";
  });
  results.forEach((result) => {
    result.textContent = "$0.00";
  });

  percentBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  resetBtn.style.opacity = 0.2;
});
