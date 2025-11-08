import {
  getFromStorage,
  setToStorage,
  appTop,
  createInput,
} from "./components.js";
import { navigation } from "./navigation.js";

// вторая страница
export function createProduct() {
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
