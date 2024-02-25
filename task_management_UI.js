document.addEventListener("DOMContentLoaded", function() {
    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    const columns = document.querySelectorAll(".column");

    addTaskBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const column = this.getAttribute("data-column");
            const inputTask = document.getElementById(`task-input-${column}`);
            const inputAssignee = document.getElementById(`assignee-input-${column}`);
            const inputDueDate = document.getElementById(`due-date-input-${column}`);
            const taskText = inputTask.value.trim();
            const assigneeText = inputAssignee.value.trim();
            const dueDate = inputDueDate.value;
            if (taskText !== "") {
                addTask(column, taskText, assigneeText, dueDate);
                inputTask.value = "";
                inputAssignee.value = "";
                inputDueDate.value = "";
                saveTasks(); // Save tasks after adding a new task
            }
        });
    });

    columns.forEach(column => {
        column.addEventListener("dragover", function(event) {
            event.preventDefault();
            const taskItem = document.querySelector(".dragging");
            if (taskItem && !column.contains(taskItem)) {
                column.appendChild(taskItem);
            }
        });

        column.addEventListener("drop", function(event) {
            event.preventDefault();
            const taskText = event.dataTransfer.getData("text/plain");
            const columnId = column.getAttribute("data-column");
            const sourceColumnId = document.querySelector(".dragging").closest('.column').getAttribute('data-column');
            if (taskText && columnId) {
                addTask(columnId, taskText);
                deleteTask(sourceColumnId, taskText);
                saveTasks(); // Save tasks after moving a task to another column
            }
        });

        column.addEventListener("click", function(event) {
            if (event.target.classList.contains("delete-task-btn")) {
                const taskItem = event.target.closest('.task-item');
                const taskText = taskItem.querySelector('.task-text').textContent;
                const columnId = column.getAttribute("data-column");
                deleteTask(columnId, taskText);
                taskItem.remove(); // Remove the task item from the DOM
                saveTasks(); // Save tasks after deleting a task
            }
        });
    });

    // Load tasks when the page is loaded
    loadTasks();

    function addTask(column, taskText, assigneeText = "", dueDate = "") {
        const taskList = document.getElementById(`task-list-${column}`);
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // Calculate difference between current date and due date
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Apply color based on due date proximity
        let color;
        if (diffDays <= 3) {
            color = "#ffcccc"; // Red
        } else if (diffDays <= 5) {
            color = "#ffffcc"; // Yellow
        } else {
            color = "#ccffcc"; // Green
        }

        taskItem.innerHTML = `
            <span class="task-text">${taskText} (${assigneeText}) - Due: ${dueDate}</span>
            <button class="delete-task-btn">🗑️</button>
        `;
        taskItem.setAttribute("draggable", "true");
        taskItem.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", taskText);
            taskItem.classList.add("dragging");
        });
        taskItem.addEventListener("dragend", function() {
            taskItem.classList.remove("dragging");
        });
        taskItem.style.backgroundColor = color;
        taskList.appendChild(taskItem);
    }

    function deleteTask(column, taskText) {
        const taskList = document.getElementById(`task-list-${column}`);
        const tasks = taskList.querySelectorAll(".task-item");
        tasks.forEach(task => {
            if (task.querySelector('.task-text').textContent.includes(taskText)) {
                task.remove();
            }
        });
    }

    function saveTasks() {
        const tasks = {};
        columns.forEach(column => {
            const columnId = column.getAttribute("data-column");
            const taskList = Array.from(column.querySelectorAll(".task-item")).map(task => {
                return task.querySelector('.task-text').textContent;
            });
            tasks[columnId] = taskList;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            Object.entries(savedTasks).forEach(([columnId, taskList]) => {
                const column = document.getElementById(`task-list-${columnId}`);
                if (column) {
                    taskList.forEach(taskText => {
                        const assigneeStartIndex = taskText.indexOf("(");
                        const assigneeEndIndex = taskText.indexOf(")");
                        const assigneeText = taskText.substring(assigneeStartIndex + 1, assigneeEndIndex);
                        const dueDateStartIndex = taskText.indexOf("Due:") + 5;
                        const dueDateText = taskText.substring(dueDateStartIndex).trim();
                        const taskTextWithoutAssignee = taskText.substring(0, assigneeStartIndex).trim();
                        addTask(columnId, taskTextWithoutAssignee, assigneeText, dueDateText);
                    });
                }
            });
        }
    }
});
