
function Task(title) {
    this.title = title;
    this.completed = false;
  }
  
  Task.prototype.toggleComplete = function () {
    this.completed = !this.completed;
  };
  
  const taskList = [];
  const taskListEl = document.getElementById('task-list');
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  
  function renderTasks() {
    taskListEl.innerHTML = '';
    taskList.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('task');
      if (task.completed) li.classList.add('completed');
      li.textContent = task.title;
  
      const completeBtn = document.createElement('button');
      completeBtn.textContent = task.completed ? 'Не завершено' : 'Завершено';
      completeBtn.addEventListener('click', () => {
        task.toggleComplete();
        renderTasks();
      });
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Удалить';
      deleteBtn.addEventListener('click', () => {
        taskList.splice(index, 1);
        renderTasks();
      });
  
      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      taskListEl.appendChild(li);
    });
  }
  
  addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title) {
      const task = new Task(title);
      taskList.push(task);
      renderTasks();
      taskInput.value = '';
      saveTasksToServer();
    }
  });
  
  function saveTasksToServer() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(taskList),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => console.log('Tasks saved to server:', response));
  }
  
  function loadTasksFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const task = new Task(item.title);
          taskList.push(task);
        });
        renderTasks();
      });
  }
   
  loadTasksFromServer();