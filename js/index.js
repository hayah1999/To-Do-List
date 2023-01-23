const btn = document.getElementById("btn");
const newtask = document.getElementById("newtask");
const completedtasks = document.getElementById("completedtasks");
const completesection = document.getElementById("completesection");
const tasks = document.getElementById("tasks");
const container = document.getElementById("container");
let items = [];
let completed = [];

function addTask() {
    if (newtask.value != "") {
        let newItem = {
            id: Date.now(),
            task: newtask.value,
            done: false,
        };
        items.push(newItem);
        addLocalStorage(items);
        newtask.value = "";
    }
}

function createTasks() {
    tasks.innerHTML = "";
    if (completed.length == 0) {
        completesection.style.display = "none";
    }
    items.forEach((item) => {
        const taskToDo = document.createElement("div");
        taskToDo.setAttribute("class", "task");
        taskToDo.setAttribute("id", item.id);

        taskToDo.innerHTML = `
             <div id="checkbox">
             <i class="fa-solid fa-check correct"></i>
             </div>
             <p id="text">${item.task}</p>
             <div class="del-edit">
                 <i class="fa-solid fa-pen" id="edit"></i>
                 <i class="fa-solid fa-xmark" id="del"></i>
             </div>`;
        if (item.done === false) {
            tasks.append(taskToDo);
        }
    });
    completedtasks.innerHTML = "";
    completed.forEach((item) => {
        const taskToDo = document.createElement("div");
        taskToDo.setAttribute("class", "task checked");
        taskToDo.setAttribute("id", item.id);

        taskToDo.innerHTML = `
             <div id="checkbox">
             <i class="fa-solid fa-check correct" id="correct"></i>
             </div>
             <p id="text">${item.task}</p>
             <div class="del-edit">
                 <i class="fa-solid fa-pen" id="edit"></i>
                 <i class="fa-solid fa-xmark" id="del"></i>
             </div>`;
        if (item.done === true) {
            completesection.style.display = "flex";
            completedtasks.append(taskToDo);
        }
    });
}

function addLocalStorage(arr) {
    localStorage.setItem("tasks", JSON.stringify(arr));
    createTasks();
}

function addCheckedLocalStorage(arr) {
    localStorage.setItem("completed", JSON.stringify(arr));
    createTasks();
}

function showTasks() {
    let data = localStorage.getItem("tasks");
    let checkedData = localStorage.getItem("completed");
    if (data) {
        items = JSON.parse(data);
        createTasks();
    }
    if (checkedData) {
        completed = JSON.parse(checkedData);
        createTasks();
    }
}
showTasks();

function removeTask(id) {
    items = items.filter((item) => {
        return item.id != id;
    });
    addLocalStorage(items);
}

function removeCheckedTask(id) {
    completed = completed.filter((item) => {
        return item.id != id;
    });
    addCheckedLocalStorage(completed);
}
function editTask(e) {
    if (newtask.value != "") {
        if (e.target.parentElement.parentElement.parentElement.id === "tasks") {
            items.forEach((item) => {
                if (item.id == e.target.parentElement.parentElement.id) {
                    item.task = newtask.value;
                }
            });
        }
        if (
            e.target.parentElement.parentElement.parentElement.id ===
            "completedtasks"
        ) {
            completed.forEach((item) => {
                if (item.id == e.target.parentElement.parentElement.id) {
                    item.task = newtask.value;
                }
            });
        }
        addLocalStorage(items);
        addCheckedLocalStorage(completed);
        createTasks();
        newtask.value = "";
    }
}
function check(e) {
    let checkedTask;
    items.forEach((item) => {
        if (item.id == e.target.parentElement.id) {
            checkedTask = item;
        }
    });
    checkedTask.done = true;
    completed.push(checkedTask);
    removeTask(e.target.parentElement.id);
    addCheckedLocalStorage(completed);
}

function uncheck(e) {
    let uncheckedTask;
    completed.forEach((item) => {
        if (item.id == e.target.parentElement.parentElement.id) {
            uncheckedTask = item;
        }
    });
    uncheckedTask.done = false;
    items.push(uncheckedTask);
    removeCheckedTask(e.target.parentElement.parentElement.id);
    addLocalStorage(items);
}

container.addEventListener("click", (e) => {
    if (e.target.id == "correct") {
        uncheck(e);
    }
    if (e.target.id === "checkbox") {
        check(e);
    }
    if (e.target.id === "del") {
        if (e.target.parentElement.parentElement.parentElement.id == "tasks") {
            removeTask(e.target.parentElement.parentElement.id);
        } else if (
            e.target.parentElement.parentElement.parentElement.id ==
            "completedtasks"
        ) {
            removeCheckedTask(e.target.parentElement.parentElement.id);
        }
    }
    if (e.target.id === "edit") {
        editTask(e);
    }
});

btn.addEventListener("click", addTask);
