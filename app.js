// For dark mode
// document.documentElement.classList.toggle("dark");

// declarations
const taskList = document.getElementById("task-list");
const taskTemplate = document.getElementById("task-template");

const addTaskBtn = document.getElementById("add-task-btn");
const addModal = document.getElementById("task-modal");

const addTaskTitle = document.getElementById("task-title");
const addTaskDescription = document.getElementById("task-description");
const addTaskCategory = document.getElementById("task-category");
const addTaskPriority = document.getElementById("task-priority");
const addTaskDue = document.getElementById("task-due");

const formCancel = document.getElementById("form-cancel");
const formSubmit = document.getElementById("form-submit");

const errorTitle = document.getElementById("error-title");
const errorDescription = document.getElementById("error-description");
const errorCategory = document.getElementById("error-category");
const errorPriority = document.getElementById("error-priority");
const errorTaskDue = document.getElementById("error-dueDate");

const statTotal = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");
const statPending = document.getElementById("stat-pending");
const statOverdue = document.getElementById("stat-overdue");

// array to store tasks
let tasks = JSON.parse(localStorage.getItem("taskforge-tasks"));

// null means the app is opened for the first time
if (tasks === null) {
    tasks = createSampleTasks();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("taskforge-tasks", JSON.stringify(tasks));
}

function makeId() {
    return Date.now() + "-" + Math.random().toString(36).slice(2, 7);
}

// makes the first letter big: work becomes Work
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// shows 2026-10-10 as a normal date
function formatDate(dateString) {
    return new Date(dateString + "T00:00:00").toLocaleDateString();
}

// overdue means not completed and the due date is before today
function isOverdue(task) {
    return !task.completed && task.dueDate < getDateString(0);
}

// gives a date like 2026-10-10, moved by some days from today
function getDateString(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

// sample tasks for the first time
function createSampleTasks() {
    const samples = [
        { title: "Finish DOM assignment", description: "Build the TaskForge dashboard with all features.", category: "school", priority: "critical", days: 3, completed: false },
        { title: "Fix login bug", description: "Users get logged out after refreshing the page.", category: "frontend", priority: "high", days: -2, completed: false },
        { title: "Design database", description: "Plan the tables for users, orders and payments.", category: "backend", priority: "high", days: 5, completed: false },
        { title: "Buy groceries", description: "Rice, tomatoes, onions and fruits for the week.", category: "personal", priority: "low", days: 1, completed: false },
        { title: "Submit weekly report", description: "Send the progress report to the team lead.", category: "work", priority: "medium", days: -5, completed: true },
        { title: "Connect payment API", description: "Link the checkout page to the payment sandbox.", category: "fintech", priority: "critical", days: 7, completed: false },
        { title: "Study for JS quiz", description: "Review arrays, functions, objects and the DOM.", category: "school", priority: "medium", days: -1, completed: false },
        { title: "Clean API routes", description: "Split the big routes file into smaller files.", category: "backend", priority: "low", days: 14, completed: false },
        { title: "Build responsive navbar", description: "Make the menu collapse on small screens.", category: "frontend", priority: "medium", days: 4, completed: true },
        { title: "Call the bank", description: "Ask about the failed transfer from last Friday.", category: "fintech", priority: "high", days: 0, completed: false },
        { title: "Clean the apartment", description: "Sweep, mop and organise the desk and shelves.", category: "other", priority: "low", days: 10, completed: true }
    ];

    const oneDay = 24 * 60 * 60 * 1000;

    // turn each sample into a full task
    return samples.map((sample, index) => {
        return {
            id: makeId(),
            title: sample.title,
            description: sample.description,
            category: sample.category,
            priority: sample.priority,
            dueDate: getDateString(sample.days),
            createdAt: Date.now() - index * oneDay,
            completed: sample.completed
        };
    });
}

// show tasks
function createTaskCard(task) {
    const card = taskTemplate.content.firstElementChild.cloneNode(true);

    card.dataset.id = task.id;

    card.querySelector(".task-title").textContent = task.title;
    card.querySelector(".task-description").textContent = task.description;
    card.querySelector(".task-category").textContent = capitalize(task.category);
    card.querySelector(".task-priority").textContent = capitalize(task.priority);
    card.querySelector(".task-due").textContent = formatDate(task.dueDate);
    card.querySelector(".task-created").textContent = new Date(task.createdAt).toLocaleDateString();

    // classes for the colors (they are in style.css)
    card.classList.add("priority-" + task.priority);

    if (task.completed) {
        card.classList.add("completed");
    } else {
        card.classList.add("pending");
    }

    if (isOverdue(task)) {
        card.classList.add("overdue");
    }

    // status text
    let status = "Pending";
    if (task.completed) {
        status = "Completed";
    } else if (isOverdue(task)) {
        status = "Overdue";
    }
    card.querySelector(".task-status").textContent = status;

    // complete button text
    const completeBtn = card.querySelector('[data-action="complete"]');
    completeBtn.textContent = task.completed ? "Undo" : "Complete";

    return card;
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach((task) => {
        taskList.append(createTaskCard(task));
    });

    updateStats();
}

// fill the four numbers at the top
function updateStats() {
    const completed = tasks.filter((task) => task.completed).length;
    const overdue = tasks.filter((task) => isOverdue(task)).length;

    statTotal.textContent = tasks.length;
    statCompleted.textContent = completed;
    statPending.textContent = tasks.length - completed;
    statOverdue.textContent = overdue;
}

// find the task that a clicked button belongs to
function getTaskFromElement(element) {
    const card = element.closest(".task-card");
    return tasks.find((task) => task.id === card.dataset.id);
}

// switch a task between completed and pending
function completeTask(task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// modal pop up to create tasks
function createTask() {
    addModal.classList.remove("hidden");

    // localStorage.clear();
}

// empty the inputs and the error messages
function resetForm() {
    errorTitle.textContent = ""; errorDescription.textContent = ""; errorCategory.textContent = ""; errorPriority.textContent = ""; errorTaskDue.textContent = "";
    addTaskTitle.value = ""; addTaskDescription.value = ""; addTaskCategory.value = ""; addTaskPriority.value = ""; addTaskDue.value = "";
}

// modal cancel btn
function modalCancel() {
    addModal.classList.add("hidden");
    resetForm();
}

// add a task
function modalAddTask(event) {
    event.preventDefault();

    // clear the old error messages first
    errorTitle.textContent = ""; errorDescription.textContent = ""; errorCategory.textContent = ""; errorPriority.textContent = ""; errorTaskDue.textContent = "";

    // trim removes spaces at the start and end
    const title = addTaskTitle.value.trim();
    const description = addTaskDescription.value.trim();

    let isValid = true;

    if (title === "") {
        errorTitle.textContent = "Title field cannot be empty";
        isValid = false;
    } else if (title.length < 3) {
        errorTitle.textContent = "Title must be at least 3 characters";
        isValid = false;
    }

    if (description === "") {
        errorDescription.textContent = "Description field cannot be empty";
        isValid = false;
    } else if (description.length < 10) {
        errorDescription.textContent = "Description must be at least 10 characters";
        isValid = false;
    }

    if (addTaskCategory.value === "") {
        errorCategory.textContent = "Category field cannot be empty";
        isValid = false;
    }

    if (addTaskPriority.value === "") {
        errorPriority.textContent = "Priority field cannot be empty";
        isValid = false;
    }

    if (addTaskDue.value === "") {
        errorTaskDue.textContent = "Due date field cannot be empty";
        isValid = false;
    }

    if (isValid) {
        const newTask = {
            id: makeId(),
            title: title,
            description: description,
            category: addTaskCategory.value,
            priority: addTaskPriority.value,
            dueDate: addTaskDue.value,
            createdAt: Date.now(),
            completed: false
        };

        tasks.unshift(newTask);
        saveTasks();
        renderTasks();

        modalCancel();
    }
}

// one listener on the list handles the buttons of every card
taskList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");

    // the click was not on a button
    if (button === null) {
        return;
    }

    const task = getTaskFromElement(button);
    const action = button.dataset.action;

    if (action === "complete") {
        completeTask(task);
    }
});

addTaskBtn.addEventListener("click", createTask);
formSubmit.addEventListener("click", modalAddTask);
formCancel.addEventListener("click", modalCancel);

renderTasks();