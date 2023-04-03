
const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection')
const filter = document.querySelector('#filter')
const clearBtn = document.querySelector('.clear-tasks')


// Load All Event Listeners

loadEventListeners()

// Load Event Listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage)
    form.addEventListener('submit', addTask)
    taskList.addEventListener('click', deleteTask)
    clearBtn.addEventListener('click', deleteTasks )
    filter.addEventListener('keyup', filterTasks)
   
}

// Get Tasks From LS
function getTasksFromLocalStorage() {
    let tasks
    // Check if LS is empty
    if (localStorage.getItem('tasks') === null) {
        // Initialize an empty array
        tasks = []
    } else {
        // Pull out all items and set them into an array
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // Loop through tasks and create an li for each task, then display them in UI
    tasks.forEach((item) => {
        // Create li
        const li = document.createElement('li')
        // Add a class
        li.className = 'collection-item'
        // Create a text node
        li.appendChild(document.createTextNode(item))
        // Cretae a link
        const link = document.createElement('a')
        // Add a class
        link.className = 'delete-item secondary-content'
        // InnerHTML
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append link to li
        li.appendChild(link)
        // Append li to ul
        taskList.appendChild(li)
    })
}
// Add Task to the UI
function addTask(e) {
    // Check if the input is empty
    if (taskInput.value === '') {
        alert('Add a task')
    }
    // Create li
    const li = document.createElement('li')
    // Add a class
    li.className = 'collection-item'
    // Add a text node and append as a child to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create a link
    const link = document.createElement('a')
    // Add a class
    link.className = 'delete-item secondary-content'
    // InnerHTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to the li
    li.appendChild(link)
    // Append li to ul
    taskList.appendChild(li)

    // Add to the local storage
    addTaskToLocalStorage(taskInput.value)

    // Clear input
    taskInput.value = ''

    // Prevent default form submission
    e.preventDefault()
}

// Add Task To LS
function addTaskToLocalStorage(item) {
    let tasks
    // Check if the local storage is empty
    if (localStorage.getItem('tasks') === null) {
        // Set it to an empty array
        tasks = []
    } else {
        // Otherwise pulling out the info from LS and putting it into the array
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }   
    // Push the task into the array and reset LS
    tasks.push(item)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Delete Task From UI
function deleteTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
              e.target.parentElement.parentElement.remove()
        }
    }
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
}

// Remove Task From LS
function removeTaskFromLocalStorage(task) {
    // Initialize tasks variable
    let tasks
    // Check if LS is empty
    if (localStorage.getItem('tasks') === null) {
        // Set an empty array
        tasks = []
    } else {
        // Otherwise pull out tasks from LS and put them into an array
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // Loop through tasks and remove the one that is equal to the tasks which was passed in
    tasks.forEach((item, index) => {
        if (task.textContent === item) {
            tasks.splice(index, 1)
        }
    })
    // Reset LS
    localStorage.setItem('tasks', JSON.stringify(tasks))
        
    }

    // Delete Tasks
    function deleteTasks() {
        //taskList.textContent = ''
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
        // Remove all from LS
        removeAllFromLocalStorage()
    }
    // Remove All Tasks From LS
    function removeAllFromLocalStorage() {
        localStorage.clear()
    }

    // Filter Tasks
    function filterTasks(e) {
        const text = e.target.value.toLowerCase()
        // Get tasks and loop through them to find a match
        document.querySelectorAll('.collection-item').forEach((item) => {
            const element = item.textContent
            if (element.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        })
    } 
























