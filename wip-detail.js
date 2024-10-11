$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('date');
    
    $('#selectedDate').text(new Date(selectedDate).toLocaleDateString());
    
    loadTasksForDate(selectedDate);

    // Load tasks for the selected date
    function loadTasksForDate(date) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskList = $('#taskList');
        taskList.empty();

        tasks.forEach(task => {
            if (task.date === date) {
                const taskItem = `
                    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                        <span class="task-text">${task.text}</span>
                        <div>
                            <button class="btn btn-sm btn-primary edit-task-btn">Edit</button>
                            <button class="btn btn-sm btn-danger delete-task-btn">Delete</button>
                        </div>
                    </li>
                `;
                taskList.append(taskItem);
            }
        });
    }

    // Back to the main page
    $('#backToMainPage').on('click', function() {
        window.location.href = 'index.html'; // Redirect to main page
    });

    // Edit task event listener
    $(document).on('click', '.edit-task-btn', function() {
        const taskItem = $(this).closest('li');
        const taskId = taskItem.data('id');
        const newText = prompt('Edit Task:', taskItem.find('.task-text').text());

        if (newText) {
            taskItem.find('.task-text').text(newText);
            updateTaskInLocalStorage(taskId, newText);
        }
    });

    // Delete task event listener
    $(document).on('click', '.delete-task-btn', function() {
        const taskItem = $(this).closest('li');
        const taskId = taskItem.data('id');
        deleteTaskFromLocalStorage(taskId);
        taskItem.remove();
    });

    // Update task in localStorage
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

    // Delete task from localStorage
    function deleteTaskFromLocalStorage(id) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
