// контейнер
const containerEl = document.querySelector(".app");

// навигация
function navigate(name) {
  containerEl.innerHTML = "";

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

  addProduct.addEventListener("click", function () {
    navigate("add");
  });

  naviagtionContainer.append(appTitle, addProduct);
  containerEl.append(naviagtionContainer);
}

// добавление продуктов
function createTable() {
  containerEl.innerHTML = "";
  appTop();

  const products = getFromStorage();

  // для загаловки таблицы
  const tableHeader = document.createElement("table");
  tableHeader.classList.add("app__headers");

  // для отображения данных из Storage
  const tableEl = document.createElement("table");
  tableEl.classList.add("app__table");

  containerEl.append(tableHeader, tableEl);

  tableHeader.innerHTML = `
    <tr>
    <th class="product__names">Название</th>
    <th class="product__location">Полка</th>
    <th class="product__weight">Вес</th>
    <th class="product__save">Время хранения</th>
    <th class="product__buttons">строка</th>
    </tr>`;

  tableEl.innerHTML = "";

  products.forEach((el) => {
    const trEl = document.createElement("tr");

    trEl.innerHTML = `
            <td>${el.name}</td>
            <td>${el.place}</td>
            <td>${el.weight}</td>
            <td>${el.storage}</td>`;
    const tdEl = document.createElement("td");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.classList.add("app__remove-El");

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
  const productWrapper = document.createElement("form");
  productWrapper.classList.add("product__wrapper");

  const productTitle = document.createElement("h2");
  productTitle.textContent = "Добавить запись";

  const nameEl = createInput("text", "Название продукта");
  const placeEl = createInput("text", "Полка продукта");
  const weightEl = createInput("number", "Вес продукта");
  const storageTime = createInput("date", "Срок хранения");
  const id = Date.now();

  const submitButton = document.createElement("button");
  submitButton.textContent = "Добавить запись";
  submitButton.type = "submit";
  submitButton.classList.add("product__create");

  productWrapper.append(
    productTitle,
    nameEl,
    placeEl,
    weightEl,
    storageTime,
    submitButton
  );

  containerEl.append(productWrapper);

  // кнопка добавления в Storage
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (nameEl.value && placeEl.value && weightEl.value && storageTime.value) {
      const product = {
        name: nameEl.value,
        place: placeEl.value,
        weight: weightEl.value,
        storage: storageTime.value,
        id: id,
      };

      const products = getFromStorage();
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      navigate("storage");
      productWrapper.reset();
    }
  });
}

// удаление элемента
document.addEventListener("DOMContentLoaded", function() {
  const removeRow = document.querySelector(".app__table");
  removeRow?.addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.classList.contains("app__remove-El")) {
      const products = getFromStorage()
       const updated = products.filter(a => Number(a.id) !== Number(e.target.dataset.id))

      localStorage.setItem("products", JSON.stringify(updated))
      createTable()
    }
  });
});

navigate();
