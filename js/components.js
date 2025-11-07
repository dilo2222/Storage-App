
// получение данных из LocalStorage
function getFromStorage() {
    const products = JSON.parse(localStorage.getItem("products")) || []
    return products
}

// сохранение в LocalStorage
function setToStorage(text){
    localStorage.setItem("products", JSON.stringify(text))
}

// загаловок страницы с кнопкой добавить запись
function appTop(){
    const containerEl = document.createElement("div")
    containerEl.classList.add("app__container")
    const appTitle = document.createElement("h2")
    appTitle.textContent = "Склад"

    const addBtn = document.createElement("button")
    addBtn.classList.add("app__NewElement")
    addBtn.textContent = "Добавить Запись"
    containerEl.append(appTitle, addBtn)
    return containerEl
}

// создание input полей 

function createInput(typeEl, placeholderEl) {
    const inputEl = document.createElement("input")
    inputEl.type = typeEl;
    inputEl.placeholder = placeholderEl;
    inputEl.required = true
    return inputEl
}



export {getFromStorage, setToStorage, appTop, createInput}