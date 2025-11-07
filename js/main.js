import {
  getFromStorage,
  setToStorage,
  appTop,
  createInput,
} from "./components.js";

import { navigation } from "./navigation.js";

import {sorting} from "./sorting.js"

// добавление в таблицу
function createTable(keyWord) {
  const products = keyWord || getFromStorage();

  const appEl = document.querySelector(".app");
  appEl.innerHTML = "";

  // title и кнопка добавления
  const topEl = appTop();

  // загаловки таблицы
  const tableHeader = document.createElement("table");
  tableHeader.classList.add("app__table-header");
  tableHeader.innerHTML = `
  <tr>
    <th class="app__table-name">Название</th>
    <th class="app__table-location">Полка</th>
    <th class="app__table-weight">Вес</th>
    <th class="app__table-save">Срок Хранения</th>
    <th class="app__table-nothing"></th>
    </tr>`;

  // таблица склада товаров
  const tableData = document.createElement("table");
  tableData.classList.add("app__mainTable");
  tableData.innerHTML = "";

  products.forEach((el) => {
    const trEl = document.createElement("tr");

    trEl.innerHTML = `
    <td>${el.name}</td>
    <td>${el.location}</td>
    <td>${el.weight}</td>
    <td>${el.time}</td>`;

    const tdEl = document.createElement("td");
    const deleteEl = document.createElement("button");
    deleteEl.textContent = "Удалить";
    deleteEl.classList.add("app__deleteRow");
    deleteEl.dataset.id = el.id;

    tdEl.append(deleteEl);
    trEl.append(tdEl);
    tableData.append(trEl);
  });

  appEl.append(topEl, tableHeader, tableData);

  // удаление элемента
  tableData.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("app__deleteRow")) {
      const row = e.target.dataset.id;
      const products = getFromStorage();
      const newProducts = products.filter((a) => Number(a.id) !== Number(row));
      setToStorage(newProducts);
      navigation();
    }
  });
}

// вторая страница
function createProduct() {
  const appEl = document.querySelector(".app");

  const formEl = document.createElement("form");
  formEl.classList.add("app__form");

  formEl.method = "submit";

  // заголовок
  const titleEl = document.createElement("h2");
  titleEl.textContent = "Добавить Запись";

  // Название
  const nameEl = createInput("text", "Название товара");

  // Полка
  const locationEl = createInput("text", "Полка товара");

  // Вес
  const weightEl = createInput("number", "Вес товара");

  // Время Хранения
  const timingEl = createInput("date", "Срок Хранения");

  // Кнопка Добавления
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.classList.add("form__submit");
  submitBtn.textContent = "Добавить запись";

  formEl.append(titleEl, nameEl, locationEl, weightEl, timingEl, submitBtn);
  appEl.append(formEl);

  // добавление в LocalStorage
  submitBtn.addEventListener("click", function (e) {
    navigation("NewProduct");
    e.preventDefault();
    if (nameEl.value && locationEl.value && weightEl.value && timingEl.value) {
      const products = getFromStorage();
      const id = Date.now();
      const product = {
        name: nameEl.value,
        location: locationEl.value,
        weight: weightEl.value,
        time: timingEl.value,
        id,
      };

      products.push(product);
      setToStorage(products);
      navigation();
    }
  });
}

navigation();

export { createTable, createProduct };
