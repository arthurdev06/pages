const goHomeH1 = document.querySelector("#go-home");

const formContainer = document.querySelector(".new-item-form");
const blurBackground = document.querySelector(".blur-background");
const closeFormsvg = document.querySelector(".close-form");

const newItemButton = document.querySelector(".new-item");
const newItemForm = document.querySelector("#new-item-form");
const addItemButton = document.querySelector("#add-item");

const pucharseName = document.querySelector("#purchase-name");
const pucharseDate = document.querySelector("#purchase-date");
const pucharseBudget = document.querySelector("#purchase-budget");
const pucharseActual = document.querySelector("#purchase-actual");
const pucharseTotal = document.querySelector("#purchase-total");

const itemName = document.querySelector("#item-name");
const itemQuantity = document.querySelector("#item-quantity");
const itemPrice = document.querySelector("#item-price");
const itemCategories = document.querySelector("#item-categories");

const editItemSvg = document.querySelector("#edit");
const deleteItemSvg = document.querySelector("#delete");

const receiptName = document.querySelector("#receipt-name");
const receiptDate = document.querySelector("#receipt-data");
const receiptTotal = document.querySelector("#receipt-total");
const receiptBudget = document.querySelector("#receipt-budget");

const endPurchaseMenu = document.querySelector("#receipt");
const endPurchaseButton = document.querySelector(".end-purchase-button");
const exportButton = document.querySelector(".export");

const closeEndPurchaseSvg = document.querySelector(".close-end-purchase-svg");

let isFormOpen = false;

const goHome = () => {
  if (window.confirm("Você realmente quer voltar a área inicial?")) {
    window.location = "../index.html";
  }
};

//CRUD
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_items")) ?? [];
const setLolcaStorage = (db_items) =>
  localStorage.setItem("db_items", JSON.stringify(db_items));

const readItem = () => getLocalStorage();

const createItem = (item) => {
  const dbItems = getLocalStorage();
  dbItems.push(item);
  setLolcaStorage(dbItems);
};

const deleteItem = (index) => {
  const dbItems = readItem();
  dbItems.splice(index, 1);
  setLolcaStorage(dbItems);
};

const updadateItem = (index, item) => {
  const dbItems = readItem();
  dbItems[index] = item;
  setLolcaStorage(dbItems);
};

const editItem = (index) => {
  const dbItem = readItem()[index];
  dbItem.index = index;
  fillFields(dbItem);
  showForm();
};

const fillFields = (dbItem) => {
  itemName.value = dbItem.nome;
  itemQuantity.value = dbItem.quantidade;
  itemPrice.value = dbItem.preço;
  itemCategories.value = dbItem.categoria;
  itemName.dataset.index = dbItem.index;
};

const clearFields = () => {
  const fields = document.querySelectorAll(".item-atribute");
  fields.forEach((field) => (field.value = ""));
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tb-items>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const isValidFields = () => {
  return newItemForm.reportValidity();
};

document
  .querySelector("#tb-items>tbody")
  .addEventListener("click", function (event) {
    const elementoClicado = event.target.closest("svg");
    if (!elementoClicado) return;

    if (elementoClicado.id.startsWith("edit-")) {
      const index = elementoClicado.id.split("-")[1];
      editItem(index);
      showData();
    } else if (elementoClicado.id.startsWith("delete-")) {
      const index = elementoClicado.id.split("-")[1];
      const response = confirm("Tem certeza da sua ação?");
      if (response) {
        deleteItem(index);
        showData();
      }
    }
  });

const saveItem = () => {
  if (isValidFields()) {
    const item = {
      nome: itemName.value,
      quantidade: itemQuantity.value,
      preço: itemPrice.value,
      categoria: itemCategories.value,
    };
    const index = itemName.dataset.index;
    if (index == "new") {
      createItem(item);
      showData();
      formContainer.style.display = "none";
      blurBackground.style.display = "none";
      clearFields();
    } else {
      updadateItem(index, item);
      showData();
      formContainer.style.display = "none";
      blurBackground.style.display = "none";
      clearFields();
    }
  }
};

const createRow = (item, index) => {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `<td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
                <td>${item.preço} ${localStorage.getItem("currency")}</td>
                <td class="svg-edit-delete">
                
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#221D23"
                  viewBox="0 0 448 512"
                   id="edit-${index}"
                >
                  <path
                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"
                  id="edit-${index}"
                    /></svg
                ><svg
                  fill="#221D23"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                   id="delete-${index}"
                >
                  <path
                  d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                  id="delete-${index}"  
                  />
                </svg>

                </td>
                `;
  document.querySelector("#tb-items>tbody").appendChild(newRow);
};

const showData = () => {
  const dbItems = readItem();
  clearTable();

  let somaPreços = 0;

  dbItems.forEach((item, index) => {
    createRow(item, index);
    somaPreços += parseFloat(item.preço);
  });

  localStorage.setItem("soma", somaPreços.toFixed(2).toString());

  if (somaPreços > Number(localStorage.getItem("budget"))) {
    pucharseActual.style.color = "red";
  } else {
    pucharseActual.style.color = "limegreen";
  }

  pucharseName.textContent = `${localStorage.getItem("name")}`;
  pucharseDate.textContent = `${localStorage.getItem("date")}`;
  pucharseBudget.textContent = `${localStorage.getItem(
    "budget"
  )} ${localStorage.getItem("currency")}`;
  pucharseActual.textContent = `${somaPreços.toFixed(2)} ${localStorage.getItem(
    "currency"
  )}`;
  pucharseTotal.textContent = `${Math.abs(
    parseFloat(localStorage.getItem("budget")) - somaPreços
  )} ${localStorage.getItem("currency")}`;
};
//reciept page

const createRecieptRow = (item, index) => {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
                <td class="set-item-left ">${index}</td>
                <td>${item.nome}</td>
                <td class="set-item-center">${
                  item.preço
                } ${localStorage.getItem("currency")}</td>
  `;
  document.querySelector("#recibo>tbody").appendChild(newRow);
};
let rowsCreated = false;

const showEndPurchase = () => {
  isFormOpen = true;

  document.body.style.overflow = "hidden";
  blurBackground.style.display = "flex";
  endPurchaseMenu.style.display = "flex";
  blurBackground.style.opacity = "1";

  receiptName.textContent = localStorage.getItem("name");
  receiptDate.textContent = localStorage.getItem("date");
  receiptTotal.textContent = `${localStorage.getItem(
    "soma"
  )} ${localStorage.getItem("currency")}`;
  receiptBudget.textContent = `${localStorage.getItem(
    "budget"
  )} ${localStorage.getItem("currency")}`;

  if (!rowsCreated) {
    const dbItem = readItem();
    dbItem.forEach(createRecieptRow);
    rowsCreated = true;
  }
};

//Open menus functions

const showForm = () => {
  isFormOpen = true;
  formContainer.style.display = "flex";
  blurBackground.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const closeForm = () => {
  isFormOpen = false;
  if (window.confirm("Tem certeza da sua ação?")) {
    formContainer.style.display = "none";
    blurBackground.style.display = "none";
    document.body.style.overflow = "auto";
    clearFields();
  }
};

const closeEndPurchase = () => {
  isFormOpen = false;
  endPurchaseMenu.style.display = "none";
  blurBackground.style.display = "none";
  document.body.style.overflow = "auto";
  blurBackground.style.opacity = "0.9";
};

blurBackground.addEventListener("click", function (event) {
  if (
    event.target !== editItemSvg &&
    event.target != deleteItemSvg &&
    event.target != endPurchaseMenu &&
    !isFormOpen
  ) {
    blurBackground.style.display = "none";
  }
});

//Eventlisteners

goHomeH1.addEventListener("click", goHome);
newItemButton.addEventListener("click", showForm);
addItemButton.addEventListener("click", saveItem);
closeFormsvg.addEventListener("click", closeForm);
endPurchaseButton.addEventListener("click", showEndPurchase);
closeEndPurchaseSvg.addEventListener("click", closeEndPurchase);
exportButton.addEventListener("click", () => {
  window.print();
});
window.addEventListener("load", showData);
