// SELECTORS
const todoInput = document.querySelector('.main form .todo-input');
const todoBtn = document.querySelector('.main form .btn');
const todos = document.querySelector('.main .todos');
const filterWithSelect = document.querySelector('.main form select');

// EVENT LISTENERS
todoBtn.addEventListener('click', addTodo);
todos.addEventListener('click', checkTodo);
document.addEventListener('DOMContentLoaded', startTodo);
filterWithSelect.addEventListener('click', filterTodo);


//FUNCTIONS
function addTodo(event) {

    event.preventDefault();
    if (!todoInput.value.trim()) return

    const div = document.createElement('div');
    div.classList.add('todo');

    const span1 = document.createElement('span');
    span1.innerText = todoInput.value;
    div.appendChild(span1);

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class = "fas fa-check"></i>';
    span2.innerHTML += '<i class = "fas fa-times"></i>';
    div.appendChild(span2);

    todos.appendChild(div);
    saveInLocalStorage(todoInput.value);
    todoInput.value = '';
}


function checkTodo(event) {

    const item = event.target
    const todo = item.parentElement.parentElement;

    if (item.classList[1] == 'fa-check') {
        item.classList.toggle('fa-heart');
        todo.classList.toggle('completed');
    }

    if (item.classList[1] == 'fa-times') {
        todo.classList.add('fall');
        removeFromLocalStorage(todo.children[0].innerText)
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
}


function filterTodo(event) {
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all': todo.style.display = 'flex'; break;
            case 'completed':
                if (todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            }
        });

        // for ( let i = 0; i < todos.length; i++){
        //     if (e.target.value == 'all'){
        //         todos[i].style.display = 'flex';
        //     }else if(e.target.value == 'completed'){
        //         if(todos[i].classList.contains('completed')) todos[i].style.display = 'flex';
        //         else todos[i].style.display = 'none';
        //     }else if(e.target.value == 'uncompleted'){
        //         if(!todos[i].classList.contains('completed')) todos[i].style.display = 'flex';
        //         else todos[i].style.display = 'none';
        //     }
        // }
    
};

function saveInLocalStorage(text){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(text){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    const index = todos.indexOf(text);
    todos.splice(index,1);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function startTodo() {
    todoInput.focus();

    let todosArr;
    if(localStorage.getItem('todos') == null){
        todosArr = [];
    }else{
        todosArr = JSON.parse(localStorage.getItem('todos'));
    };

    todosArr.forEach((todo)=>{
        
    const div = document.createElement('div');
    div.classList.add('todo');

    const span1 = document.createElement('span');
    span1.innerText = todo;
    div.appendChild(span1);

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class = "fas fa-check"></i>';
    span2.innerHTML += '<i class = "fas fa-times"></i>';
    div.appendChild(span2);

    todos.appendChild(div);
    })
}
