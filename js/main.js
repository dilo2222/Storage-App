// контейнер
const containerEl = document.querySelector(".app");

// навигация
function navigate(name) {
    containerEl.innerHTML = ""
  switch (name) {
    case "storage":
      createTable();
      break;
    case "add":
      addProduct();
      break;
    default:
      createTable();
      break;
  }
}

// получение данных с LocalStorage
function getFromStorage() {
  const localData = JSON.parse(localStorage.getItem("products")) || [];
  return localData;
}
// добавление названия склад и кнопки добавления
function appTop() {
  const naviagtionContainer = document.createElement("div");
  naviagtionContainer.classList.add("app__top");

  const appTitle = document.createElement("h2");
  appTitle.textContent = "Склад";

  const addProduct = document.createElement("button");
  addProduct.textContent = "Добавить Запись";
  addProduct.classList.add("app__add");

addProduct.addEventListener("click", function() {
    navigate("add")
});

  naviagtionContainer.append(appTitle, addProduct);
  containerEl.append(naviagtionContainer);
}

// добавление продуктов
function createTable() {
  appTop();
  const products = getFromStorage();

  // для загаловки таблицы
  const tableHeader = document.createElement("table");
  tableHeader.classList.add("app__headers");

  // для данных из Storage
  const tableEl = document.createElement("table");
  tableEl.classList.add("app__table");

  containerEl.append(tableHeader, tableEl);

  tableEl.innerHTML = "";
  tableHeader.innerHTML = `
    <tr>
    <th class="product__names">Название</th>
    <th class="product__location">Полка</th>
    <th class="product__weight">Вес</th>
    <th class="product__save">Время хранения</th>
    <th class="product__buttons">строка</th>
    </tr>`;

  products.forEach((el) => {
    const trEl = document.createElement("tr");
    trEl.innerHTML = `
            <td>${el.nameEl}</td>
            <td>${el.placeEl}</td>
            <td>${el.weightEl}</td>
            <td>${el.storageTime}</td>`;
    const tdEl = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.dataset.id = el.id;
    tdEl.append(deleteBtn);
    trEl.append(tdEl);
    tableEl.append(trEl);
  });
}

// Создание input полей
function createInput(typeEl, placeholderEl) {
  const inputEl = document.createElement("input");
  inputEl.required = true;
  inputEl.type = typeEl;
  inputEl.placeholder = placeholderEl;
  return inputEl;
}

// вторая страница
function addProduct() {
  const productWrapper = document.createElement("div");
  productWrapper.classList.add("product__wrapper");
  const productName = createInput("text", "Название продукта");
  const productLocation = createInput("text", "Полка продукта");
  const productWeight = createInput("number", "Вес продукта");
  const productTiming = createInput("date", "Срок хранения");
  productWrapper.append(
    productName,
    productLocation,
    productWeight,
    productTiming
  );
  containerEl.append(productWrapper);
}
navigate();
