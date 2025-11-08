import { getFromStorage, setToStorage, appTop } from "./components.js";

import { navigation } from "./navigation.js";

// добавление в таблицу
export function createTable(keyWord) {
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

  // сортировка
  tableHeader.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.classList.contains("app__table-name")) {
      // сортировка по названию
      let newTable = products.sort((a, b) => a.name.localeCompare(b.name));
      createTable(newTable);
    } else if (e.target.classList.contains("app__table-location")) {
      //  сортировка по полке
      let newTable = products.sort((a, b) =>
        a.location.localeCompare(b.location)
      );
      createTable(newTable);
    } else if (e.target.classList.contains("app__table-weight")) {
      //  сортировка по весу
      let newTable = products.sort((a, b) => a.weight - b.weight);
      createTable(newTable);
    } else if (e.target.classList.contains("app__table-save")) {
      //  сортировка по сроку хранения
      let newTable = products.sort((a, b) => a.time.localeCompare(b.time));
      createTable(newTable);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  navigation();
});
