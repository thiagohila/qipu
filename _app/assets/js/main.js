
// All task data
var data = {
  todoList: [],
  doneList: []
};

// Counters
var countTodoList = 0;
var countDoneList = 0;

// Add listener to add btn
document.getElementById('btnAddTask').addEventListener('click', function(){
  newTask();
})

// Add newtask with ENTER
document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    newTask();
  }
};

// Add the field value
function newTask(){
  var value = document.getElementById('inputAddTask').value;
  if (value) {
    addTaskTodo(value);
    document.getElementById('inputAddTask').value = '';
    data.todoList.push(value);
    // Update counter
    counterUpdate();
  } else {
    alert('Insira uma tarefa!');
  }
}

// Add listener to search input
document.getElementById('inputSearchTask').addEventListener('keyup', function(){
  var value = document.getElementById('inputSearchTask').value;
  searchTask(value);
})

// Add listener to clear the search input
document.getElementById('inputSearchTask').addEventListener('focusout', function(){
  document.getElementById('inputSearchTask').value = '';
})

// Add listener to all btn
document.getElementById('btnClearSearch').addEventListener('click', function(){
  var value = '';
  searchTask(value);
})

// Update Couter
function counterUpdate(){
  countTodoList = data.todoList.length;
  document.getElementById('manyTodo').innerHTML = countTodoList;

  countDoneList = data.doneList.length;
  document.getElementById('manyDone').innerHTML = countDoneList;
}

// Search for a task
function searchTask(value){
  var list = document.getElementById('doneList')
  var tasks = list.getElementsByTagName('li');
  var filter = value.toUpperCase()
  var taskValue;
  // Look for each LI task
  for (let i = 0; i < tasks.length; i++) {
    taskValue = tasks[i].textContent || tasks[i].innerText || tasks[i].innerHTML
    // Check if the search value exist in the array
    if (taskValue.toUpperCase().indexOf(filter) > -1) {
      tasks[i].classList.remove('d-none');
      tasks[i].classList.add('d-flex');
    } else {
      tasks[i].classList.remove('d-flex');
      tasks[i].classList.add('d-none');
    }
  }
}

// Remove task
function removeTask(){
  var task = this.parentNode.parentNode;
  var parent = task.parentNode;
  var listId = parent.id;
  var value = task.innerText;
  // Remove from the data array
  if (listId === 'todoList') {
    data.todoList.splice(data.todoList.indexOf(value), 1);
  } else {
    data.doneList.splice(data.doneList.indexOf(value), 1);
  };
  // Remove the task
  parent.removeChild(task);
  // Update counter
  counterUpdate();
}

// Done task - change to done or doing list
function doneTask(){
  var task = this.parentNode.parentNode;
  var parent = task.parentNode;
  var listId = parent.id;
  var value = task.innerText;
  // Move between data arrays (remove from one and push to other)
  if (listId === 'todoList') {
    data.todoList.splice(data.todoList.indexOf(value), 1);
    data.doneList.push(value);
  } else {
    data.doneList.splice(data.doneList.indexOf(value), 1);
    data.todoList.push(value);
  };
  // Check if the task should be add to todoList or doneList
  var target = (listId === 'todoList') ? document.getElementById('doneList') : document.getElementById('todoList');
  // Remove from the actual list
  parent.removeChild(task);
  // Add to the new list
  target.insertBefore(task, target.childNodes[0]);
  // Update counter
  counterUpdate();
}

// Add new task to the Todo list
function addTaskTodo(taskValue) {
  var list = document.getElementById('todoList');

  // Create the li with the task value
  var task = document.createElement('li');
  task.classList.add('list-group-item', 'd-flex');
  task.innerText = taskValue;
  // Create the buttons
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');
  // Create the done btn
  var done = document.createElement('span');
  done.classList.add('done');/*
  done.innerHTML = iconDone;*/
  // Add clieck event to done task
  done.addEventListener('click', doneTask)
  // Create the remove btn
  var remove = document.createElement('span');
  remove.classList.add('remove');/*
  remove.innerHTML = iconRemove;*/
  // Add clieck event to remove task
  remove.addEventListener('click', removeTask)
  // Append the done & remove btn
  buttons.appendChild(done);
  buttons.appendChild(remove);
  // Append buttons to the li
  task.appendChild(buttons);

  // Insert the new li to top os the list
  list.insertBefore(task, list.childNodes[0]);
}