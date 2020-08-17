// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event){
	event.preventDefault();
	console.log('hello');

	//Todo div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	//Create li
	const newTodo = document.createElement('li');
	newTodo.innerHTML = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	// ADD TODO TO LOCALSTORAGE
	saveLocalTodos(todoInput.value);

	// Check Mark Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);

	//Check Trash Button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	// Append to list
	todoList.appendChild(todoDiv);

	// Clear Todo Input Value
	todoInput.value ='';
}

function deleteCheck(event){
	console.log(event.target);
	const item = event.target;
	// Delete todo
	if(item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		todo.classList.add('fall');
		// Remove from LOCALSTORAGE
		removeLocalTodos(todo);

		todo.addEventListener('transitionend', function(){
			todo.remove();
		});
	}

	// Check Mark
	if(item.classList[0] === "complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

//NB The filter Option 	NOT FUNCTIONING.
function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(el){
		switch(e.target.value){
			case "all":
				el.style.display = 'flex';
				break;
			case "completed":
				if(el.classList.contains("completed")){
					el.style.display = 'flex';
				} else {
					el.style.display = 'none';
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains('completed')){
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo){
	//Check--Hey Do I already have thing in there?
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
	console.log('gettodo works');
	// CHECK---HEY Do I already have thing in there?
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){
		//Todo div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	//Create li
	const newTodo = document.createElement('li');
	newTodo.innerHTML = todo;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	// Check Mark Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);

	//Check Trash Button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	// Append to list
	todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	// CHECK---HEY Do I already have thing in there?
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerHTML;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}