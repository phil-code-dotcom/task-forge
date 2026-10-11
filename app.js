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

const deleteModal = document.getElementById("delete-modal");
const deleteMessage = document.getElementById("delete-message");
const deleteCancel = document.getElementById("delete-cancel");
const deleteConfirm = document.getElementById("delete-confirm");

const searchInput = document.getElementById("search-input");
const filterStatus = document.getElementById("filter-status");
const filterPriority = document.getElementById("filter-priority");
const filterCategory = document.getElementById("filter-category");
const sortSelect = document.getElementById("sort-select");

const themeToggle = document.getElementById("theme-toggle");

const selectAll = document.getElementById("select-all");
const selectedCount = document.getElementById("selected-count");
const bulkComplete = document.getElementById("bulk-complete");
const bulkPending = document.getElementById("bulk-pending");
const bulkDelete = document.getElementById("bulk-delete");

const emptyState = document.getElementById("empty-state");
const noResults = document.getElementById("no-results");

const detailsModal = document.getElementById("details-modal");
const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const detailCategory = document.getElementById("detail-category");
const detailPriority = document.getElementById("detail-priority");
const detailStatus = document.getElementById("detail-status");
const detailDue = document.getElementById("detail-due");
const detailCreated = document.getElementById("detail-created");
const detailClose = document.getElementById("detail-close");
const detailEdit = document.getElementById("detail-edit");
const detailDelete = document.getElementById("detail-delete");

const discardModal = document.getElementById("discard-modal");
const discardKeep = document.getElementById("discard-keep");
const discardConfirm = document.getElementById("discard-confirm");

const formTitle = document.getElementById("form-title");

// id of the task being edited (null means we are adding a new task)
let editingId = null;

// id of the task shown in the details modal
let detailsId = null;

// how the form looked when the edit started
let formSnapshot = "";

// ids of the tasks that are ticked
let selectedIds = [];

// ids of the tasks waiting to be deleted
let idsToDelete = [];

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

// the status text of a task
function getStatus(task) {
    if (task.completed) {
        return "Completed";
    }
    if (isOverdue(task)) {
        return "Overdue";
    }
    return "Pending";
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

    // tick the checkbox if the task is selected
    card.querySelector(".task-select").checked = selectedIds.includes(task.id);

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
    card.querySelector(".task-status").textContent = getStatus(task);

    // complete button text
    const completeBtn = card.querySelector('[data-action="complete"]');
    completeBtn.textContent = task.completed ? "Undo" : "Complete";

    return card;
}

// search, filters and sorting all together
function getVisibleTasks() {
    const search = searchInput.value.trim().toLowerCase();
    const status = filterStatus.value;
    const priority = filterPriority.value;
    const category = filterCategory.value;
    const sort = sortSelect.value;

    // keep only the tasks that pass every check
    const list = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search) ||
            task.category.toLowerCase().includes(search);

        let matchesStatus = true;
        if (status === "completed") {
            matchesStatus = task.completed;
        } else if (status === "pending") {
            matchesStatus = !task.completed;
        } else if (status === "overdue") {
            matchesStatus = isOverdue(task);
        }

        const matchesPriority = priority === "all" || task.priority === priority;
        const matchesCategory = category === "all" || task.category === category;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    // a bigger number means a higher priority
    const priorityNumber = { low: 1, medium: 2, high: 3, critical: 4 };

    if (sort === "newest") {
        list.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "oldest") {
        list.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "az") {
        list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
        list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "priority-high") {
        list.sort((a, b) => priorityNumber[b.priority] - priorityNumber[a.priority]);
    } else if (sort === "priority-low") {
        list.sort((a, b) => priorityNumber[a.priority] - priorityNumber[b.priority]);
    } else if (sort === "due-soon") {
        list.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    } else if (sort === "due-late") {
        list.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
    }

    return list;
}

function renderTasks() {
    const visibleTasks = getVisibleTasks();

    // a task that is not on the screen cannot stay selected
    selectedIds = selectedIds.filter((id) => visibleTasks.some((task) => task.id === id));

    taskList.replaceChildren();

    visibleTasks.forEach((task) => {
        taskList.append(createTaskCard(task));
    });

    // no tasks at all
    emptyState.classList.toggle("hidden", tasks.length > 0);

    // there are tasks but the search or filters found nothing
    noResults.classList.toggle("hidden", tasks.length === 0 || visibleTasks.length > 0);

    updateStats();
    updateSelection();
}

// show the selected count and update the select all box
function updateSelection() {
    const boxes = taskList.querySelectorAll(".task-select");

    let allChecked = boxes.length > 0;
    boxes.forEach((box) => {
        if (!box.checked) {
            allChecked = false;
        }
    });

    selectAll.checked = allChecked;
    selectedCount.textContent = selectedIds.length + " selected";
}

// mark all the selected tasks as completed or pending
function bulkSetCompleted(value) {
    if (selectedIds.length === 0) {
        return;
    }

    tasks.forEach((task) => {
        if (selectedIds.includes(task.id)) {
            task.completed = value;
        }
    });

    saveTasks();
    renderTasks();
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

// show the details modal for one task
function openDetails(task) {
    detailsId = task.id;

    detailTitle.textContent = task.title;
    detailDescription.textContent = task.description;
    detailCategory.textContent = capitalize(task.category);
    detailPriority.textContent = capitalize(task.priority);
    detailStatus.textContent = getStatus(task);
    detailDue.textContent = formatDate(task.dueDate);
    detailCreated.textContent = new Date(task.createdAt).toLocaleDateString();

    detailsModal.classList.remove("hidden");
}

function closeDetails() {
    detailsModal.classList.add("hidden");
    detailsId = null;
}

// all the form values in one text, to compare before and after
function getFormValues() {
    return JSON.stringify([
        addTaskTitle.value,
        addTaskDescription.value,
        addTaskCategory.value,
        addTaskPriority.value,
        addTaskDue.value
    ]);
}

// cancel button: ask first if an edit has unsaved changes
function requestCancel() {
    const hasChanges = editingId !== null && getFormValues() !== formSnapshot;

    if (hasChanges) {
        discardModal.classList.remove("hidden");
    } else {
        modalCancel();
    }
}

// dark mode: the dark class on the html tag turns the dark styles on
function applyTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

// true if any modal is open
function isModalOpen() {
    return !addModal.classList.contains("hidden") ||
        !deleteModal.classList.contains("hidden") ||
        !detailsModal.classList.contains("hidden") ||
        !discardModal.classList.contains("hidden");
}

// close the modal that is on top
function closeTopModal() {
    if (!discardModal.classList.contains("hidden")) {
        discardModal.classList.add("hidden");
    } else if (!deleteModal.classList.contains("hidden")) {
        closeDeleteModal();
    } else if (!detailsModal.classList.contains("hidden")) {
        closeDetails();
    } else if (!addModal.classList.contains("hidden")) {
        requestCancel();
    }
}

// open the delete modal and remember which tasks it is for
function openDeleteModal(ids) {
    idsToDelete = ids;

    if (ids.length === 1) {
        const task = tasks.find((item) => item.id === ids[0]);
        deleteMessage.textContent = 'Do you really want to delete "' + task.title + '"?';
    } else {
        deleteMessage.textContent = "Do you really want to delete these " + ids.length + " tasks?";
    }

    deleteModal.classList.remove("hidden");
}

function closeDeleteModal() {
    deleteModal.classList.add("hidden");
    idsToDelete = [];
}

// remove the tasks from the array
function confirmDelete() {
    tasks = tasks.filter((task) => !idsToDelete.includes(task.id));
    saveTasks();
    renderTasks();
    closeDeleteModal();
    closeDetails();
}

// modal pop up to create tasks
function createTask() {
    editingId = null;
    formTitle.textContent = "New Task";
    formSubmit.textContent = "Add task";

    addModal.classList.remove("hidden");
    addTaskTitle.focus();

    // localStorage.clear();
}

// open the same modal with the task data inside
function editTask(task) {
    editingId = task.id;
    formTitle.textContent = "Edit Task";
    formSubmit.textContent = "Save changes";

    addTaskTitle.value = task.title;
    addTaskDescription.value = task.description;
    addTaskCategory.value = task.category;
    addTaskPriority.value = task.priority;
    addTaskDue.value = task.dueDate;

    formSnapshot = getFormValues();

    addModal.classList.remove("hidden");
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
    editingId = null;
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
        if (editingId === null) {
            // add a new task
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
        } else {
            // update the task being edited
            const oldTask = tasks.find((item) => item.id === editingId);

            oldTask.title = title;
            oldTask.description = description;
            oldTask.category = addTaskCategory.value;
            oldTask.priority = addTaskPriority.value;
            oldTask.dueDate = addTaskDue.value;
        }

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
    } else if (action === "delete") {
        openDeleteModal([task.id]);
    } else if (action === "edit") {
        editTask(task);
    } else if (action === "details") {
        openDetails(task);
    }
});

// checkboxes send a change event, so they get their own listener on the list
taskList.addEventListener("change", function (event) {
    const checkbox = event.target.closest('[data-action="select"]');

    if (checkbox === null) {
        return;
    }

    const task = getTaskFromElement(checkbox);

    if (checkbox.checked) {
        selectedIds.push(task.id);
    } else {
        selectedIds = selectedIds.filter((id) => id !== task.id);
    }

    updateSelection();
});

selectAll.addEventListener("change", function () {
    const boxes = taskList.querySelectorAll(".task-select");
    selectedIds = [];

    boxes.forEach((box) => {
        box.checked = selectAll.checked;

        if (selectAll.checked) {
            selectedIds.push(getTaskFromElement(box).id);
        }
    });

    updateSelection();
});

bulkComplete.addEventListener("click", () => bulkSetCompleted(true));
bulkPending.addEventListener("click", () => bulkSetCompleted(false));
bulkDelete.addEventListener("click", function () {
    if (selectedIds.length > 0) {
        openDeleteModal(selectedIds);
    }
});

searchInput.addEventListener("input", renderTasks);
filterStatus.addEventListener("change", renderTasks);
filterPriority.addEventListener("change", renderTasks);
filterCategory.addEventListener("change", renderTasks);
sortSelect.addEventListener("change", renderTasks);

themeToggle.addEventListener("click", function () {
    const isDark = !document.documentElement.classList.contains("dark");
    applyTheme(isDark);
    localStorage.setItem("taskforge-theme", isDark ? "dark" : "light");
});

// keyboard shortcuts
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeTopModal();
        return;
    }

    // ctrl + enter submits the form
    if (event.ctrlKey && event.key === "Enter") {
        if (!addModal.classList.contains("hidden")) {
            formSubmit.click();
        }
        return;
    }

    // n and / should not work while typing or when a modal is open
    const tag = event.target.tagName;
    const isTyping = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

    if (isTyping || isModalOpen()) {
        return;
    }

    if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        createTask();
    } else if (event.key === "/") {
        event.preventDefault();
        searchInput.focus();
    }
});

deleteCancel.addEventListener("click", closeDeleteModal);
deleteConfirm.addEventListener("click", confirmDelete);

addTaskBtn.addEventListener("click", createTask);
formSubmit.addEventListener("click", modalAddTask);
formCancel.addEventListener("click", requestCancel);

detailClose.addEventListener("click", closeDetails);
detailEdit.addEventListener("click", function () {
    const task = tasks.find((item) => item.id === detailsId);
    closeDetails();
    editTask(task);
});
detailDelete.addEventListener("click", function () {
    openDeleteModal([detailsId]);
});

discardKeep.addEventListener("click", function () {
    discardModal.classList.add("hidden");
});
discardConfirm.addEventListener("click", function () {
    discardModal.classList.add("hidden");
    modalCancel();
});

// load the saved theme, then show the tasks
applyTheme(localStorage.getItem("taskforge-theme") === "dark");
renderTasks();