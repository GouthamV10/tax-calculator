var annualIncome = document.getElementById("annual-income");
var extraIncome = document.getElementById("extra-income");
var age = document.getElementById("age");
var deductions = document.getElementById("deductions");
var outputContainer = document.querySelector(".output-container");
var errorMessageBox = document.getElementById("error3");

let selectedAge = null;

var error1 = document.getElementById("errorm1");
var error2 = document.getElementById("errorm2");
var error4 = document.getElementById("errorm4");

//function to show hint messages
function showMessage(event, id) {
  var messageBox = document.getElementById(id);
  messageBox.classList.add("message-toggle");
  event.target.addEventListener("mouseout", function () {
    messageBox.classList.remove("message-toggle");
  });
}

//function to show hint error messages
function showErrorMessage(event, id) {
  var errorMessageBox = document.getElementById(id);
  errorMessageBox.classList.add("error-message-toggle");
  event.target.addEventListener("mouseout", function () {
    errorMessageBox.classList.remove("error-message-toggle");
  });
}

//error validation
annualIncome.addEventListener("input", (event) => {
  validateError(event, error1);
});
extraIncome.addEventListener("input", (event) => {
  validateError(event, error2);
});
deductions.addEventListener("input", (event) => {
  validateError(event, error4);
});

//error-checker[checks if user input contains only number]
function validateError(event, error) {
  var inputText = event.target.value;
  if (!/^\d+$/.test(inputText)) {
    error.classList.add("error-toggle");
  } else {
    error.classList.remove("error-toggle");
  }
}

//age validation
age.addEventListener("change", function () {
  selectedAge = age.value;
  if (selectedAge != "none" || selectedAge != null)
    errorMessageBox.classList.remove("error-message-toggle");
});

// submit validations
document.querySelector(".btn").addEventListener("click", (event) => {
  event.preventDefault();
  validateSumbit();
});

function validateSumbit() {
  if (checktextfields()) {
    calculate();
    outputContainer.classList.add("output-container-toggle");
  }
}

//close button validation
document.querySelector(".close-btn").addEventListener("click", () => {
  outputContainer.classList.remove("output-container-toggle");
});

//function check final validation of fields
function checktextfields() {
  let check = true;
  if (!/^\d+$/.test(annualIncome.value)) {
    error1.classList.add("error-toggle");
    check = false;
  }
  if (!/^\d+$/.test(extraIncome.value)) {
    error2.classList.add("error-toggle");
    check = false;
  }
  if (!/^\d+$/.test(deductions.value)) {
    error4.classList.add("error-toggle");
    check = false;
  }
  if (selectedAge == "none" || selectedAge == null) {
    errorMessageBox.classList.add("error-message-toggle");
    check = false;
  }

  return check;
}

const mapAge = {
  40: "below 40",
  "40-60": "Age 40 to 59",
  60: "60 and Above",
};

function calculate() {
  let annualIncomeValue = parseInt(annualIncome.value);
  let extraIncomeValue = parseInt(extraIncome.value);
  let deductionsValue = parseInt(deductions.value);
  // our formula for total amount [without adding tax percentage]
  let totalval = annualIncomeValue + extraIncomeValue - deductionsValue;
  let ans = 0;
  let tax = 0;

  var ansText = document.getElementById("ans");
  var aiText = document.getElementById("v-ai");
  var eisText = document.getElementById("v-ei");
  var dText = document.getElementById("v-d");
  var agText = document.getElementById("v-ag");
  var taxText = document.getElementById("v-t");

  if (totalval <= 800000) {
    ans = totalval;
    tax = "0%";
  } else {
    if (selectedAge == "40") {
      ans = totalval - totalval * 0.3;
      tax = "30%";
    } else if (selectedAge == "40-60") {
      ans = totalval - totalval * 0.4;
      tax = "40%";
    } else if (selectedAge == "60") {
      ans = totalval - totalval * 0.1;
      tax = "10%";
    } else {
      ans = "error";
    }
  }

  const mapData = {
    total: ans,
    annualIncome: annualIncomeValue,
    extraIncome: extraIncomeValue,
    ageGroup: mapAge[selectedAge],
    deductions: deductionsValue,
    tax: tax,
  };

  console.log(mapData);

  ansText.innerText = mapData["total"];
  aiText.innerText = mapData["annualIncome"];
  eisText.innerText = mapData["extraIncome"];
  dText.innerText = mapData["deductions"];
  agText.innerText = mapData["ageGroup"];
  taxText.innerText = mapData["tax"];
}
