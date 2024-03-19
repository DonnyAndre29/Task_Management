const SERVER_URL = 'http://localhost:3000';

// Function to fetch and display task lists
async function fetchAndDisplayTaskLists() {
  try {
    const response = await fetch(`${SERVER_URL}/google/tasks`);
    const taskLists = await response.json();
    const taskListsContainer = document.getElementById('taskLists');

    // Clear existing task lists
    taskListsContainer.innerHTML = '';

    // Display each task list
    taskLists.forEach(taskList => {
      const taskListElement = document.createElement('div');
      taskListElement.innerHTML = `<h2>${taskList.title}</h2>`;
      
      // Fetch tasks for this task list and display them
      fetchAndDisplayTasks(taskList.id, taskListElement);

      taskListsContainer.appendChild(taskListElement);
    });
  } catch (error) {
    console.error('Error fetching task lists:', error);
  }
}

// Function to fetch and display tasks for a specific task list
async function fetchAndDisplayTasks(taskListId, taskListElement) {
  try {
    const response = await fetch(`${SERVER_URL}/google/tasks/${taskListId}`);
    const tasks = await response.json();

    // Display each task
    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.innerHTML = `<p><strong>Title:</strong> ${task.title}</p>`;
      if (task.notes) {
        taskElement.innerHTML += `<p><strong>Notes:</strong> ${task.notes}</p>`;
      }
      taskListElement.appendChild(taskElement);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Function to create a new task
async function createTask() {
  const taskListId = ''; // Provide the task list ID here
  const taskTitle = document.getElementById('taskTitle').value;
  const taskNotes = document.getElementById('taskNotes').value;

  try {
    const response = await fetch(`${SERVER_URL}/google/tasks/${taskListId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: taskTitle, notes: taskNotes })
    });

    if (response.ok) {
      // Task created successfully, refresh task lists
      fetchAndDisplayTaskLists();
    } else {
      console.error('Failed to create task:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

// Initial fetch and display of task lists
fetchAndDisplayTaskLists();
