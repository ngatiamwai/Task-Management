
class CompletedTodo {
    constructor(title, description, deadline, completedOn) {
      this.title = title;
      this.description = description;
      this.deadline = deadline;
    //   this.completedOn = completedOn;
    }
  }
  
  class UncompletedTodo {
    constructor(title, description, deadline) {
      this.title = title;
      this.description = description;
      this.deadline = deadline;
    }
  }
  
  const input_tasks = document.getElementById('input_tasks');
  const tasks_table = document.getElementById('tasks_table');
  const uncompletedTasks = [];
  const completedTasks = [];

  localStorage.setItem('tasks_table',JSON.stringify(tasks_table));
  localStorage.setItem('input_tasks',JSON.stringify(input_tasks));
  
// console.log('tasks_table', JSON.stringify(tasks_table));

//   function renderTasks() {
//     tasksContainer.innerHTML = '';
  
//     // Render uncompleted tasks
//     uncompletedTasks.forEach((task) => {
//       const taskItem = createTaskElement(task);
//       tasksContainer.appendChild(taskItem);
//     });
  
//     // Render completed tasks
//     completedTasks.forEach((task) => {
//       const taskItem = createTaskElement(task);
//       tasksContainer.appendChild(taskItem);
//     });
//   }
  
//   function createTaskElement(task) {
//     const taskItem = document.createElement('div');
//     taskItem.className = 'task-item';
  
//     const titleElem = document.createElement('h3');
//     titleElem.textContent = task.title;
//     taskItem.appendChild(titleElem);
  
//     const descriptionElem = document.createElement('p');
//     descriptionElem.textContent = task.description;
//     taskItem.appendChild(descriptionElem);
  
//     const deadlineElem = document.createElement('p');
//     deadlineElem.textContent = 'Deadline: ' + task.deadline;
//     taskItem.appendChild(deadlineElem);
  
//     if (task instanceof CompletedTodo) {
//       const completedOnElem = document.createElement('p');
//       completedOnElem.textContent = 'Completed On: ' + task.completedOn;
//       taskItem.appendChild(completedOnElem);
//     } else {
//       const completeBtn = document.createElement('button');
//       completeBtn.textContent = 'Complete';
//       completeBtn.addEventListener('click', () => completeTask(task));
//       taskItem.appendChild(completeBtn);
//     }
  
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.addEventListener('click', () => deleteTask(task));
//     taskItem.appendChild(deleteBtn);
  
//     return taskItem;
//   }
  
//   function addTask(title, description, deadline) {
//     const newTask = new UncompletedTodo(title, description, deadline);
//     uncompletedTasks.push(newTask);
//     renderTasks();
//   }
  
//   function completeTask(task) {
//     const completedOn = new Date().toLocaleDateString();
//     const completedTask = new CompletedTodo(
//       task.title,
//       task.description,
//       task.deadline,
//       completedOn
//     );
//     completedTasks.push(completedTask);
//     uncompletedTasks.splice(uncompletedTasks.indexOf(task), 1);
//     renderTasks();
//   }
  
//   function deleteTask(task) {
//     if (task instanceof CompletedTodo) {
//       completedTasks.splice(completedTasks.indexOf(task), 1);
//     } else {
//       uncompletedTasks.splice(uncompletedTasks.indexOf(task), 1);
//     }
//     renderTasks();
//   }
  
//   taskForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const title = e.target.elements.title.value;
//     const description = e.target.elements.description.value;
//     const deadline = e.target.elements.deadline.value;
//     addTask(title, description, deadline);
//     e.target.reset();
//   });
  
//   renderTasks();
  

// class CompletedTodo {
//     constructor(title, description, deadline, completedOn) {
//       this.title = title;
//       this.description = description;
//       this.deadline = deadline;
//       this.completedOn = completedOn;
//     }
//   }
  
//   class UncompletedTodo {
//     constructor(title, description, deadline) {
//       this.title = title;
//       this.description = description;
//       this.deadline = deadline;
//     }
//   }
  
//   const taskForm = document.getElementById('taskForm');
//   const tasksContainer = document.getElementById('tasks');
//   let uncompletedTasks = [];
//   let completedTasks = [];
  
//   function saveTasksToLocalStorage() {
//     localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks));
//     localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
//   }
  
//   function getTasksFromLocalStorage() {
//     const uncompletedTasksData = JSON.parse(localStorage.getItem('uncompletedTasks')) || [];
//     const completedTasksData = JSON.parse(localStorage.getItem('completedTasks')) || [];
  
//     uncompletedTasks = uncompletedTasksData.map(taskData => new UncompletedTodo(taskData.title, taskData.description, taskData.deadline));
//     completedTasks = completedTasksData.map(taskData => new CompletedTodo(taskData.title, taskData.description, taskData.deadline, taskData.completedOn));
//   }
  
//   function renderTasks() {
//     tasksContainer.innerHTML = '';
  
//     // Render uncompleted tasks
//     uncompletedTasks.forEach((task) => {
//       const taskItem = createTaskElement(task);
//       tasksContainer.appendChild(taskItem);
//     });
  
//     // Render completed tasks
//     completedTasks.forEach((task) => {
//       const taskItem = createTaskElement(task);
//       tasksContainer.appendChild(taskItem);
//     });
  
//     // Save tasks to local storage
//     saveTasksToLocalStorage();
//   }
  
//   function createTaskElement(task) {
//     // ... (no change in this function)
//     const taskItem = document.createElement('div');
//     taskItem.className = 'task-item';
  
//     const titleElem = document.createElement('h3');
//     titleElem.textContent = task.title;
//     taskItem.appendChild(titleElem);
  
//     const descriptionElem = document.createElement('p');
//     descriptionElem.textContent = task.description;
//     taskItem.appendChild(descriptionElem);
  
//     const deadlineElem = document.createElement('p');
//     deadlineElem.textContent = 'Deadline: ' + task.deadline;
//     taskItem.appendChild(deadlineElem);
  
//     if (task instanceof CompletedTodo) {
//       const completedOnElem = document.createElement('p');
//       completedOnElem.textContent = 'Completed On: ' + task.completedOn;
//       taskItem.appendChild(completedOnElem);
//     } else {
//       const completeBtn = document.createElement('button');
//       completeBtn.textContent = 'Complete';
//       completeBtn.addEventListener('click', () => completeTask(task));
//       taskItem.appendChild(completeBtn);
//     }
  
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.addEventListener('click', () => deleteTask(task));
//     taskItem.appendChild(deleteBtn);
  
//     return taskItem;
//   }
  
//   function addTask(title, description, deadline) {
//     const newTask = new UncompletedTodo(title, description, deadline);
//     uncompletedTasks.push(newTask);
//     renderTasks();
//   }
  
//   function completeTask(task) {
//     const completedOn = new Date().toLocaleDateString();
//     const completedTask = new CompletedTodo(
//       task.title,
//       task.description,
//       task.deadline,
//       completedOn
//     );
//     completedTasks.push(completedTask);
//     uncompletedTasks.splice(uncompletedTasks.indexOf(task), 1);
//     renderTasks();
//   }
  
//   function deleteTask(task) {
//     if (task instanceof CompletedTodo) {
//       completedTasks.splice(completedTasks.indexOf(task), 1);
//     } else {
//       uncompletedTasks.splice(uncompletedTasks.indexOf(task), 1);
//     }
//     renderTasks();
//   }
  
//   taskForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const title = e.target.elements.title.value;
//     const description = e.target.elements.description.value;
//     const deadline = e.target.elements.deadline.value;
//     addTask(title, description, deadline);
//     e.target.reset();
//   });
  
//   //Load tasks from local storage on page load
//   getTasksFromLocalStorage();
  
//   // Initial render of tasks
//   renderTasks();
  