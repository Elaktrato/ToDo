const toDoListElement = document.getElementById("toDoList")
const doneListElement = document.getElementById("doneTasks")
const countersElement = document.getElementById("counters")

let toDos = []
const storedData = window.localStorage.getItem("toDoTasks")
if (storedData) {
    toDos = JSON.parse(storedData);

}
console.log(toDos)

let doneT = toDos.filter(toDo => toDo.done === true)

let openT = toDos.filter(toDo => toDo.done === false)

const itemToggle = (index) => {
    let toDo = toDos[index]
    toDo.done = !toDo.done
    renderTask()
}

function editTask(index) {
    renderTask()
    let editRow = document.getElementById("taskIndex" +index)
    editRow.innerHTML = `
    <div class="editWrapper">
    <input type="text" id="editBox" value="${toDos[index].value}">
    <button onclick="saveEdit(${index})" type="button">save</button>
    <button onclick="renderTask()" type="button">cancel</button>
    </div>
    `
}
function saveEdit(id) {
    if (!document.getElementById("editBox").value) {
        return
    }
    toDos[id].value = document.getElementById("editBox").value
    renderTask()

}

function done() {
    renderTask()
}

function createTask() {
    let taskBox = document.getElementById("taskBox");
    let task = taskBox.value;
    let toDoX = {
        done: false,
        value: task
    }
    if (task === null) {
        return;
    } else if (task !== "") {
        toDos.push(toDoX)
    }
    renderTask()
    taskBox.value = "";
    window.localStorage.setItem("toDoTasks", JSON.stringify(toDos));
}



function deleteTask(index) {
    if (confirm("Are you sure you want to delete this?")) {
        delete toDos[index]
        toDos = toDos.filter(toDo => toDo)
        renderTask()
    }
}

function renderTask() {
    toDoListElement.innerHTML = ''
    doneListElement.innerHTML = ''
    countersElement.innerHTML = ''

    doneT = toDos.filter(toDo => toDo.done === true)
    openT = toDos.filter(toDo => toDo.done === false)
    toDos.forEach(
        (task, index) => {
            const checked = task.done ? 'checked' : ''
            const taskClass = task.done ? 'done' : ''

            if (task.done === false) {
                toDoListElement.innerHTML += `
                    <div class='taskItem ${taskClass}' id="taskIndex${index}">
                        <label class="container taskCheck">
                            <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
                            ${task.value}
                            <span class="checkmark"></span>
                        </label>
                        <div class="buttons">
                            <div type='button' value='Edit' class="icon edit" onclick="editTask(${index});"></div>
                            <div type='button' value='Delete' class="icon delete" onclick="deleteTask(${index})"></div>
                        </label>
                    </div>
                `
            } else if (task.done === true) {
                doneListElement.innerHTML += `
                    <div class='taskItem ${taskClass}'>
                        <label class="container taskCheck">
                            <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
                            ${task.value}
                            <span class="checkmark"></span>
                        </label>
                        <div class="buttons">
                            <div type='button' value='Delete' class="icon delete" onclick="deleteTask(${index})"></div>
                        </div>
                    </div>
                `
            }

        }
    )
    counters()
    window.localStorage.setItem("toDoTasks", JSON.stringify(toDos));


}

function counters() {
    countersElement.innerHTML += `
    <div class="count"><strong> ${openT.length}</strong> <br>  open Tasks</div>
    <div class="count"><strong> ${doneT.length}</strong> <br> done Tasks</div>
    <div class="count"><strong> ${openT.length + doneT.length}</strong> <br>  all Tasks</div>

    `
}


// function doneTask() {
//     doneT = toDos.filter(toDo => toDo.done === true)
//     doneListElement.innerHTML = ''
//     doneT.forEach(
//         (task, index) => {
//             const checked = task.done ? 'checked' : ''
//             const taskClass = task.done ? 'done' : ''

//             doneListElement.innerHTML += `
//             <div class='taskItem ${taskClass}'>
//                 <input type='checkbox' ${checked} onclick="itemToggle(${index});done()">
//                 ${task.value}
//                 <button type='button' value='Edit' onclick="editTask(${index});">Edit</button>
//                 <button type='button' value='Delete' onclick="deleteTask(${index})">Delete</button>
//             </div>
//         `
//         }
//     )
// }
renderTask(toDos)
    // doneTask(doneT)