// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Initialize the app
function init() {
    renderTasks();
    updateStats();

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Set current filter and re-render
            currentFilter = this.getAttribute('data-filter');
            renderTasks();
        });
    });
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create new task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add to tasks array
    tasks.push(newTask);

    // Save to localStorage
    saveTasks();

    // Clear input and re-render
    taskInput.value = '';
    renderTasks();
    updateStats();
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    saveTasks();
    renderTasks();
    updateStats();
}

// Delete a task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Render tasks based on current filter
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';

    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';

        // Create task items
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;

            // Add event listeners to the checkbox and delete button
            const checkbox = taskItem.querySelector('.task-checkbox');
            const deleteBtn = taskItem.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => toggleTask(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskList.appendChild(taskItem);
        });
    }
}

// Update task statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    totalTasksEl.textContent = `Total: ${total} task${total !== 1 ? 's' : ''}`;
    completedTasksEl.textContent = `Completed: ${completed}`;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);