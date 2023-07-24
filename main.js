class CompletedTodo {
  constructor(title, description, deadline, completedOn) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.completedOn = completedOn;
  }
}

class UncompletedTodo {
  constructor(title, description, deadline) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
  }
}

let completedTasks = [];
let uncompletedTasks = [];

const taskForm = document.createElement('form');
taskForm.id = 'taskForm';
taskForm.innerHTML = `
  <input type="text" id="title" placeholder="Title" required>
  <input type="text" id="description" placeholder="Description" required>
  <input type="date" id="deadline" required>
  <button type="submit">Add Task</button>
`;

const tasksContainer = document.createElement('div');
tasksContainer.id = 'tasks';

function saveTasksToLocalStorage() {
  localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function getTasksFromLocalStorage() {
  uncompletedTasks = (JSON.parse(localStorage.getItem('uncompletedTasks')) || []).map(taskData => new UncompletedTodo(...Object.values(taskData)));
  completedTasks = (JSON.parse(localStorage.getItem('completedTasks')) || []).map(taskData => new CompletedTodo(...Object.values(taskData)));
}

function renderTasks() {
  tasksContainer.innerHTML = '';

  // Render uncompleted tasks
  uncompletedTasks.forEach(task => tasksContainer.appendChild(createTaskElement(task)));

  // Render completed tasks
  completedTasks.forEach(task => tasksContainer.appendChild(createTaskElement(task)));

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

function createTaskElement(task) {
  const taskTemplate = document.getElementById('taskTemplate');
  const taskItem = taskTemplate.content.cloneNode(true);
  
  taskItem.querySelector('.task-title').textContent = task.title;
  taskItem.querySelector('.task-description').textContent = task.description;
  taskItem.querySelector('.task-deadline').textContent = 'Deadline: ' + task.deadline;

  if (task instanceof CompletedTodo) {
    taskItem.querySelector('.task-completedOn').textContent = 'Completed On: ' + task.completedOn;
  } else {
    const completeBtn = taskItem.querySelector('.completeBtn');
    completeBtn.addEventListener('click', () => completeTask(task));
    completeBtn.style.display = 'block';
  }

  const editBtn = taskItem.querySelector('.editBtn');
  editBtn.addEventListener('click', () => editTask(task));

  const deleteBtn = taskItem.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', () => deleteTask(task));

  return taskItem;
}

function editTask(task) {
  const newTitle = prompt('Enter new title:', task.title);
  const newDescription = prompt('Enter new description:', task.description);
  const newDeadline = prompt('Enter new deadline:', task.deadline);

  if (newTitle !== null && newTitle !== '') {
    task.title = newTitle;
  }

  if (newDescription !== null && newDescription !== '') {
    task.description = newDescription;
  }

  if (newDeadline !== null && newDeadline !== '') {
    task.deadline = newDeadline;
  }

  renderTasks();
}

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
  button.addEventListener('click', () => filterTasks(button.getAttribute('data-filter')));
});

function addTask(title, description, deadline) {
  uncompletedTasks.push(new UncompletedTodo(title, description, deadline));
  renderTasks();
}

function completeTask(task) {
  const completedOn = new Date().toLocaleDateString();
  completedTasks.push(new CompletedTodo(task.title, task.description, task.deadline, completedOn));
  uncompletedTasks.splice(uncompletedTasks.indexOf(task), 1);
  renderTasks();
}

function deleteTask(task) {
  task instanceof CompletedTodo
    ? completedTasks.splice(completedTasks.indexOf(task), 1)
    : uncompletedTasks.splice(uncompletedTasks.indexOf(task), 1);
  renderTasks();
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const { title, description, deadline } = e.target.elements;
  addTask(title.value, description.value, deadline.value);
  e.target.reset();
});

document.body.appendChild(taskForm);
document.body.appendChild(tasksContainer);

// Load tasks from local storage on page load
getTasksFromLocalStorage();

// ... (previous code remains unchanged)

const allButton = document.createElement('button');
allButton.textContent = 'All';
allButton.setAttribute('data-filter', 'all');
allButton.addEventListener('click', () => filterTasks('all'));

const completedButton = document.createElement('button');
completedButton.textContent = 'Completed';
completedButton.setAttribute('data-filter', 'completed');
completedButton.addEventListener('click', () => filterTasks('completed'));

const notCompletedButton = document.createElement('button');
notCompletedButton.textContent = 'Not Completed';
notCompletedButton.setAttribute('data-filter', 'not_completed');
notCompletedButton.addEventListener('click', () => filterTasks('not_completed'));

const overdueButton = document.createElement('button');
overdueButton.textContent = 'Overdue';
overdueButton.setAttribute('data-filter', 'overdue');
overdueButton.addEventListener('click', () => filterTasks('overdue'));

const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'buttons';
buttonsContainer.append(allButton, completedButton, notCompletedButton, overdueButton);

document.body.insertBefore(buttonsContainer, taskForm);

function isTaskOverdue(task) {
  const today = new Date();
  const deadline = new Date(task.deadline);
  return task instanceof UncompletedTodo && today > deadline;
}


function filterTasks(filterType) {
  let filteredTasks = [];

  switch (filterType) {
    case 'all':
      filteredTasks = uncompletedTasks.concat(completedTasks);
      break;
    case 'completed':
      filteredTasks = completedTasks;
      break;
    case 'not_completed':
      filteredTasks = uncompletedTasks;
      break;
    case 'overdue':
      const overdueUncompletedTasks = uncompletedTasks.filter((task) => isTaskOverdue(task));
      const overdueCompletedTasks = completedTasks.filter((task) => isTaskOverdue(task));
      filteredTasks = overdueUncompletedTasks.concat(overdueCompletedTasks);
      break;
    default:
      break;
  }

  tasksContainer.innerHTML = '';

  filteredTasks.forEach((task) => {
    const taskItem = createTaskElement(task);
    tasksContainer.appendChild(taskItem);
  });
}

// Initial render of tasks
getTasksFromLocalStorage();
filterTasks('all');

// ... (remaining code remains unchanged)
