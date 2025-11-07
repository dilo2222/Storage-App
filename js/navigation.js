import { createTable, createProduct } from "./main.js";

export function navigation(keyWord) {
  const app = document.querySelector(".app");
  app.innerHTML = "";

  switch (keyWord) {
    case "NewProduct":
      createProduct();
      break;

    case "sortingByName":
      createTable("sortingByName");
      break;

    default:
      createTable();
  }
}
