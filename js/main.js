// контейнер
const containerEl = document.querySelector(".app")

const naviagtionContainer = document.createElement("div")
naviagtionContainer.classList.add("app__top")

function createTable() {
    const products = JSON.parse(localStorage.getItem("products")) || []
    const tableEl = document.createElement("table")

    containerEl.append(tableEl)
    tableEl.innerHTML = ""

    products.forEach((el => {
        const trEl = document.createElement("tr")
        trEl.innerHTML = `
            <td>${el.nameEl}</td>
            <td>${el.placeEl}</td>
            <td>${el.weightEl}</td>
            <td>${el.storageTime}</td>`
        const tdEl = document.createElement("td")
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Remove"
        deleteBtn.dataset.id = el.id
        tdEl.append(deleteBtn)
        trEl.append(tdEl)
        tableEl.append(trEl)
    }))
}

createTable()
