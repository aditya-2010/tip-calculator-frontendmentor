"use strict";

let tip = 0;

const inputPeople = document.querySelector(".input--people");
const inputTip = document.querySelector(".input--tip");
const inputBill = document.querySelector(".input--bill");

const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const tipSelect = document.querySelector(".tip-select");
const tipBtns = document.querySelectorAll(".btn--tip");
const tipValuePP = document.querySelector(".tip-value");
const totalValuePP = document.querySelector(".total-value");
const btnReset = document.querySelector(".btn--reset");

function getTip(str) {
  if (str.length === 2) {
    return str.slice(0, 1);
  }
  return str.slice(0, 2);
}

function renderValues() {
  const tipValue = (+inputBill.value * tip) / 100;
  const tipPP = +(tipValue / +inputPeople.value).toFixed(2);
  // prettier-ignore
  const totalPP = +((+inputBill.value + tipValue) / +inputPeople.value).toFixed(2);

  if (
    !isNaN(tipPP) &&
    !isNaN(totalPP) &&
    isFinite(tipPP) &&
    isFinite(totalPP)
  ) {
    tipValuePP.textContent = `$${tipPP}`;
    totalValuePP.textContent = `$${totalPP}`;
  }
}

inputBill.addEventListener("input", () => {
  bill.classList.remove("error");
  renderValues();
});

tipSelect.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn--tip")) {
    tipBtns.forEach((tipBtn) => tipBtn.classList.remove("tip--active"));
    e.target.classList.add("tip--active");

    tip = +getTip(e.target.textContent);
    renderValues();
  }
});

inputTip.addEventListener("input", () => {
  tip = inputTip.value;
  renderValues();
});

inputPeople.addEventListener("input", () => {
  people.classList.remove("error");
  if (+inputBill.value === 0 || inputBill.value === "") {
    bill.classList.add("error");
    return;
  }

  if (+inputPeople.value === 0) {
    people.classList.add("error");
    return;
  }

  renderValues();
});

btnReset.addEventListener("click", () => {
  inputBill.value = "";
  inputTip.value = "";
  inputPeople.value = "";
  tipBtns.forEach((tipBtn) => tipBtn.classList.remove("tip--active"));
  tip = 0;
  tipValuePP.textContent = `$0.00`;
  totalValuePP.textContent = `$0.00`;
});
