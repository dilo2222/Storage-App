// навигация
export async function navigation(keyWord) {
  const app = document.querySelector(".app");
  app.innerHTML = "";
  const loader = document.querySelector(".loader");
  loader.style.opacity = 1;

  switch (keyWord) {
    case "NewProduct":
      const { createProduct } = await import("./createProduct.js");
      createProduct();
      loader.style.opacity = 0;
      break;

    default:
      const { createTable } = await import("./main.js");
      createTable();
      loader.style.opacity = 0;
  }
}
