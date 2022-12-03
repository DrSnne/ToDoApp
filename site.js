const from = document.querySelector("#addTaskForm");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.getElementById("task-list");
let items;

eventListener();
loadFromLS();


function eventListener() {
    from.addEventListener("submit", addNewItem);
    btnDeleteAll.addEventListener("click", deleteAllItems);
    tasklist.addEventListener("click", deleteAnItem);
    tasklist.addEventListener("click", updateAnItem);
}

function deleteAllItems(e) {

    if (confirm("are you sure?")) {
        tasklist.innerHTML = "";

        e.preventDefault();

        localStorage.clear();
        sessionStorage.clear();

    }
}
function deleteAnItem(e) {
    e.preventDefault();

    if (e.target.className == "bi bi-x-circle") {
        if (confirm("are you sure")) {
            e.target.parentElement.parentElement.remove();
        }



        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }

}
function updateAnItem(e) {
    e.preventDefault();
    var targeted = e.target.parentElement.parentElement

    if (e.target.className == "bi bi-arrow-90deg-up") {
        if (confirm("do you wanna update text?")) {
            targeted.innerText = input.value

        }
        updateLS(targeted.textContent)
        input.value = "";
    }
}
function addNewItem(e) {
    e.preventDefault();

    if (input.value == "") {
        alert("Please type a task");
        return;
    }

    createItem(input.value)
    setitemToLS(input.value)
    input.value = ""

}
function createItem(text) {
    const li = document.createElement("li");
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    const a = document.createElement("a");
    a.classList = "delete-item float-end";
    a.setAttribute("href", "#");
    a.innerHTML = "<i class = 'bi bi-x-circle'></i>";

    const b = document.createElement("a");
    b.classList = "delete-item float-end";
    b.setAttribute("href", "#");
    b.innerHTML = "<i class = 'bi bi-arrow-90deg-up'></i>";

    li.appendChild(a);
    li.appendChild(b);
    tasklist.appendChild(li);
}
function setitemToLS(text) {
    items = getitemFromLS();
    items.push(text);
    localStorage.setItem("tasks", JSON.stringify(items))
}
function getitemFromLS() {
    if (localStorage.getItem("tasks") == null) {
        items = [];
    }
    else
        items = JSON.parse(localStorage.getItem("tasks"));

    return items;
}
function deleteItemFromLS(text) {
    items = getitemFromLS();
    items.forEach(function (todo, index) {
        if (todo == text)
            items.splice(index, 1);


    });
    localStorage.setItem("tasks", JSON.stringify(items))

}
function loadFromLS() {
    items = getitemFromLS()
    items.forEach(function (todo) {
        createItem(todo);
    });
}
function updateLS(deger) {
    items = getitemFromLS();
    items.forEach(function (todo, index) {
        if (todo == deger)
            console.log(index)
        items[index] = input.value
    });
    localStorage.setItem("tasks", JSON.stringify(items))
}