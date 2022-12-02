const from = document.querySelector("#addTaskForm");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.getElementById("task-list");
let items;

eventListener();

function eventListener() {
    from.addEventListener("submit", addNewItem);
}

function addNewItem(e) {
    e.preventDefault();

    if (input.value == "") {
        alert("Please type a task");
        return;
    }

    const li = document.createElement("li");
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(input.value));

    const a = document.createElement("a");
    a.classList = "delete-item float-end";
    a.setAttribute("href", "#");
    a.innerHTML = "<i class = 'bi bi-x-circle'></i>";

    li.appendChild(a);
    tasklist.appendChild(li);
}