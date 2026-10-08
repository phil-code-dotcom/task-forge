// For dark mode
// document.documentElement.classList.toggle("dark");

// declarations
const tasks = []; // to store the tasks

// for the add task main button
const addTaskBtn = document.getElementById("add-task-btn");

// for the add task modal
const addModal = document.getElementById("task-modal");

// for the add task modal input fields
const addTaskTitle = document.getElementById("task-title");
const addTaskDescription = document.getElementById("task-description");
const addTaskCategory = document.getElementById("task-category");
const addTaskPriority = document.getElementById("task-priority");
const addTaskDue = document.getElementById("task-due");

// add task modal buttons
const formCancel = document.getElementById("form-cancel");
const formSubmit = document.getElementById("form-submit");

// error fields
const errorTitle = document.getElementById("error-title");
const errorDescription = document.getElementById("error-description");
const errorCategory = document.getElementById("error-category");
const errorPriority = document.getElementById("error-priority");
const errorTaskDue = document.getElementById("error-dueDate")

// empty list for tasks to be added
const taskList = getElementById("task-list");


addTaskBtn.addEventListener("click", createTask)

formSubmit.addEventListener("click", modalAddTask)

formCancel.addEventListener("click", modalCancel)

function createTask() {
    addModal.classList.remove("hidden");
}

function modalAddTask(event) {
    event.preventDefault()

    if (addTaskTitle.value === "") {
        errorTitle.innerHTML = "Title field cannot be empty";
    }

    if (addTaskDescription.value === "") {
        errorDescription.innerHTML = "Description field cannot be empty";
    }

    if (addTaskCategory.value === "") {
        errorCategory.innerHTML = "Category field cannot be empty";
    }

    if (addTaskPriority.value === "") {
        errorPriority.innerHTML = "Priority field cannot be empty";
    }

    if (addTaskDue.value === "") {
        errorTaskDue.innerHTML = "Due date field cannot be empty";
    }

    if ((addTaskTitle.value.length > 1) && (addTaskDescription.value.length > 1) && (addTaskCategory.value.length > 1) && (addTaskPriority.value.length > 1) && (addTaskDue.value.length > 1)) {
        
        let myTaskInfo = { title: addTaskTitle.value, description: addTaskDescription.value, category: addTaskCategory.value, priority: addTaskPriority.value, dueDate: addTaskDue.value };

        // console.log(myTaskInfo)

        errorTitle.innerHTML = ""; errorDescription.innerHTML = ""; errorCategory.innerHTML = ""; errorPriority.innerHTML = ""; errorTaskDue.innerHTML = "";
        addTaskTitle.value = ""; addTaskDescription.value = ""; addTaskCategory.value = ""; addTaskPriority.value = ""; addTaskDue.value = ""; 

    }


}

function modalCancel() {
    addModal.classList.add("hidden")
}
