//selectors
const todoin = document.querySelector('.todo');
const todosubmit = document.querySelector('.submit');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todosubmit.addEventListener('click', addTodo);
todolist.addEventListener('click', deletecheck);
filterOption.addEventListener('click', filterTodo);


//functions
function addTodo(event){
    event.preventDefault(); //prevent from submitting
    const tododiv = document.createElement("div");
    tododiv.classList.add("todoo");
    const newtodo = document.createElement('li');
    newtodo.innerText = todoin.value;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);

    //add todo to lovalstorage
    saveLocalTodos(todoin.value);

    //checkmark button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML = '<i class="fa fa-check-circle"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    //trash button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    todolist.appendChild(tododiv);

    //clear todo input value
    todoin.value = "";
}
function deletecheck(e)
{
    const item = e.target; //selecting the right button to delete
    if(item.classList[0] === 'trash-btn')
    { 
        const todoo = item.parentElement;
        //animations
        todoo.classList.add("fall");
        removeLocalTodos(todoo);
        todoo.addEventListener('transitionend', function(){
        todoo.remove();
        });
    }
    if(item.classList[0] === 'complete-btn')
    {
        const todoo = item.parentElement;
        todoo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function(todoo){
        switch (e.target.value) {
            case "all":
                todoo.style.display = "flex";
                break;
            case "completed":
                if(todoo.classList.contains("completed"))
                {
                    todoo.style.display = "flex";
                }
                else
                {
                    todoo.style.display = "none";
                }
                break;
                case "uncompleted":
                if(!todoo.classList.contains("completed"))
                {
                    todoo.style.display = "flex";
                }
                else
                {
                    todoo.style.display = "none";
                } 
                break;
            }
    });
}

function saveLocalTodos(todoo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todoo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos()
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todoo)
    {
        const tododiv = document.createElement("div");
        tododiv.classList.add("todoo");
        const newtodo = document.createElement('li');
        newtodo.innerText = todoo;
        newtodo.classList.add('todo-item');
        tododiv.appendChild(newtodo);
    
        //checkmark button
        const completedbutton = document.createElement('button');
        completedbutton.innerHTML = '<i class="fa fa-check-circle"></i>';
        completedbutton.classList.add("complete-btn");
        tododiv.appendChild(completedbutton);
    
        //trash button
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        trashbutton.classList.add("trash-btn");
        tododiv.appendChild(trashbutton);
    
        todolist.appendChild(tododiv);
    });
}
function removeLocalTodos(todoo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todoo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}