import { createTable } from "./main.js";
import { getFromStorage } from "./components.js";

function sorting() {
  const tableHeaders = document.querySelector(".app__table-header");
  tableHeaders.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("app__table-name")) {
      const products = getFromStorage();
      const sorted = products.sort((a, b) => a.name.localeCompare(b.name));
      createTable(sorted);
      console.log(sorted);
    } else {
      console.log("f");
    }
  });
}

sorting();

export { sorting };
console.log("sdc");
