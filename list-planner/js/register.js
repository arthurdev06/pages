const newPucharseButton = document.querySelector(".new-pucharse");
const blurBackground = document.querySelector(".blur-background");
const closeFormsvg = document.querySelector(".close-form");

const formContainer = document.querySelector(".form-container");
const newPurchaseForm = document.querySelector(".pucharse-form");
const submitDataButton = document.querySelector(".submit-data");

const pucharseName = document.querySelector("#purchase-name");
const pucharseDate = document.querySelector("#purchase-date");
const pucharseBudget = document.querySelector("#purchase-budget");
const purchaseCurrency = document.querySelector("#purchase-currency");

const showForm = () => {
  formContainer.style.display = "flex";
  blurBackground.style.display = "flex";
};

const closeForm = () => {
  if (window.confirm("Você tem certeza da sua ação?")) {
    clearFields();
    formContainer.style.display = "none";
    blurBackground.style.display = "none";
  }
};
const clearFields = () => {
  const fields = document.querySelectorAll(".item-atribute");
  fields.forEach((field) => (field.value = ""));
};
const isValidFields = () => {
  return newPurchaseForm.reportValidity();
};

const setData = () => {
  localStorage.setItem("name", pucharseName.value);
  localStorage.setItem("date", pucharseDate.value);
  localStorage.setItem("budget", pucharseBudget.value);
  localStorage.setItem("currency", purchaseCurrency.value);
  window.location = "pages/list.html";
  clearFields();
  formContainer.style.display = "none";
  blurBackground.style.display = "none";
};

submitDataButton.addEventListener("click", setData);
closeFormsvg.addEventListener("click", closeForm);
newPucharseButton.addEventListener("click", showForm);
