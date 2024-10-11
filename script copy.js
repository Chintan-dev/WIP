$(document).ready(function() {
    // Load tasks when the page loads
    loadTasksFromLocalStorage();

    // Event listener for date selection
    $('#dateInput').on('change', function() {
        const selectedDate = $(this).val();
        displayTasksForSelectedDate(selectedDate);
    });

    // Add task event listener
    $('#addTaskBtn').on('click', function() {
        const taskInput = $('#taskInput').val();
        const selectedDate = $('#dateInput').val();

        if (!selectedDate) {
            alert('Please select a date');
            return;
        }

        if (!taskInput) {
            alert('Please enter a task');
            return;
        }

        const taskId = generateUUID();
        const task = {
            id: taskId,
            text: taskInput,
            date: selectedDate
        };

        // Add task to DOM and local storage
        addTaskToDOM(task);
        storeTaskInLocalStorage(task);

        // Clear input field
        $('#taskInput').val('');
    });

    // Generate a UUID (unique ID)
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Add task to DOM
    function addTaskToDOM(task) {
        const taskItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="btn btn-primary btn-sm edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </div>
            </li>
        `;
        $('#taskList').append(taskItem);
    }

    // Store task in local storage
    function storeTaskInLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage when the page loads
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const selectedDate = $('#dateInput').val();
        displayTasksForSelectedDate(selectedDate || '');
    }

    // Display tasks for the selected date
    function displayTasksForSelectedDate(date) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        $('#taskList').empty();

        // Show tasks for the selected date
        tasks.forEach(task => {
            if (task.date === date) {
                addTaskToDOM(task);
            }
        });

        if (date) {
            const formattedDate = new Date(date).toLocaleDateString('en-US');
            $('#displayDate').text(`* ${formattedDate} *`);
        } else {
            $('#displayDate').text('');
        }
    }

    // Event delegation for edit and delete buttons
    $('#taskList').on('click', '.delete-btn', function() {
        const taskId = $(this).parent().parent().attr('data-id');
        deleteTask(taskId);
        $(this).parent().parent().remove(); // Remove from DOM
    });

    $('#taskList').on('click', '.edit-btn', function() {
        const taskItem = $(this).parent().parent();
        const taskId = taskItem.attr('data-id');
        const newText = prompt('Edit task:', taskItem.find('.task-text').text());

        if (newText) {
            taskItem.find('.task-text').text(newText);
            updateTaskInLocalStorage(taskId, newText);
        }
    });

    // Delete task from local storage
    function deleteTask(id) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task in local storage
    function updateTaskInLocalStorage(id, newText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.text = newText;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
