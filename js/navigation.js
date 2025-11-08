import { createTable, createProduct } from "./main.js";

export function navigation(keyWord) {
  const app = document.querySelector(".app");
  app.innerHTML = "";

  switch (keyWord) {
    case "NewProduct":
      createProduct();
      break;

    case "sorting":
      console.log("dg")
      break;

    default:
      createTable();
  }
}

