JAVASCRIPT DOM MANIPULATION ASSIGNMENT

Build a fully functional Task Management Dashboard called TaskForge.

The application should allow users to create, manage, search, filter, sort, update, and delete tasks dynamically through the DOM.

The dashboard should contain:

- A header/navigation section
- Search functionality
- An Add Task button
- Task statistics
- Status filters
- Priority filters
- Category filters
- Sorting controls
- A dynamically generated task list

Each task should contain:

- Task title
- Description
- Category
- Priority
- Due date
- Creation date
- Completion status
- Checkbox
- Edit button
- Delete button
- Complete button

Create a form that allows users to add new tasks. The form should contain fields for:

- Title
- Description
- Category
- Priority
- Due date

When the form is submitted, prevent the page from refreshing, validate the information, create the task, add it to the task list, update the statistics, and clear the form.

Implement form validation so that:

- The title cannot be empty and must contain at least 3 characters.
- The description cannot be empty and must contain at least 10 characters.
- Category is required.
- Priority is required.
- Due date is required.

Display validation errors directly in the interface.

Each task should have an Edit button. When clicked, load the task information into the form and allow the user to update it. After updating, refresh the task display and statistics.

Each task should have a Delete button. When clicked, display a confirmation modal asking the user whether they really want to delete the task. The user should be able to cancel or confirm the deletion.

Allow users to mark tasks as completed or pending. Completed tasks should have a different visual appearance.

Implement a search feature that allows users to search tasks by:

- Title
- Description
- Category

Create filters for:

Status

- All
- Completed
- Pending
- Overdue

Priority

- All
- Low
- Medium
- High
- Critical

Category

- All
- Work
- Personal
- School
- Backend
- Frontend
- Fintech
- Other

The filters should work together. For example, users should be able to search for a specific word while filtering by status, priority, and category at the same time.

Implement sorting options for:

- Newest
- Oldest
- A → Z
- Z → A
- Highest Priority
- Lowest Priority
- Closest Due Date
- Furthest Due Date

Create dashboard statistics showing:

- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks

These statistics must automatically update whenever the task data changes.

Add checkboxes to each task and allow users to select multiple tasks.

Create a Select All option and allow users to:

- Delete selected tasks
- Mark selected tasks as completed
- Mark selected tasks as pending

Display the number of selected tasks.

Use event delegation for dynamically generated task buttons and controls.

Use "data-*" attributes to store task IDs and other relevant information in the DOM.

Use DOM traversal where appropriate to locate the task associated with a clicked button or element.

Store all tasks in "localStorage" so that the tasks remain available after refreshing or reopening the browser.

When the application starts, retrieve the saved tasks and display them automatically.

Create a task-details modal that opens when a user selects a task. The modal should display:

- Title
- Description
- Category
- Priority
- Status
- Due date
- Creation date

The modal should contain options to close, edit, or delete the task.

Automatically identify overdue tasks. A task should be considered overdue when its due date has passed and it has not been completed.

Give overdue tasks a different visual appearance.

If there are no tasks, display an appropriate empty state.

If a search or filter produces no results, display an appropriate "No tasks found" message.

Use JavaScript to dynamically add, remove, and toggle CSS classes for:

- Completed tasks
- Pending tasks
- Overdue tasks
- Low priority
- Medium priority
- High priority
- Critical priority

Implement the following keyboard shortcuts:

- "N" — Open the new task form
- "/" — Focus the search input
- "ESC" — Close an open modal
- "CTRL + ENTER" — Submit the task form

Add a dark-mode toggle and save the user's dark-mode preference in "localStorage".

When editing a task, detect unsaved changes. If the user attempts to close or cancel while changes have not been saved, display a confirmation asking whether the changes should be discarded.

When the application is opened for the first time, populate it with at least 10 sample tasks containing different categories, priorities, due dates, and completion statuses.

Throughout the project, demonstrate your understanding and use of JavaScript DOM methods such as:

querySelector()
querySelectorAll()
getElementById()
createElement()
append()
appendChild()
prepend()
remove()
removeChild()
replaceWith()
cloneNode()
insertAdjacentHTML()
textContent
innerHTML
classList
setAttribute()
getAttribute()
removeAttribute()
dataset
parentElement
children
firstElementChild
lastElementChild
nextElementSibling
previousElementSibling
closest()
addEventListener()
preventDefault()
target
currentTarget
FormData
createDocumentFragment()
localStorage
JSON.stringify()
JSON.parse()

Use the DOM methods appropriately throughout the application.

BONUS

Implement drag-and-drop functionality that allows users to rearrange tasks and save the new order.

Implement pagination so that only 10 tasks are displayed per page.

Implement debounced search.

Implement an Undo Delete feature that allows users to restore a recently deleted task.

Implement Import and Export functionality that allows users to export their tasks as JSON and import them back into the application.

Submission

Submit:

- "index.html"
- "style.css"
- "app.js"
- "README.md"
- GitHub repository
- Screenshots of the completed application

The README should explain the major DOM methods used, event delegation implementation, task management logic, and "localStorage" implementation.