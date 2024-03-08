// Seleção de Elementos
const todoForm = document.querySelector("#todo_form");
const todoList = document.querySelector("#todo_list");
const editForm = document.querySelector("#edit_form");
const cancelEditBtn = document.querySelector("#cancel_edit_btn");
const searchInput = document.querySelector("#search_input");
const eraseBtn = document.querySelector("#erase_button");
const filterBtn = document.querySelector("#filter_select");
const todoTooBar = document.querySelector("#toolbar");

let oldInputValue;

// Funções

const saveTodoTask = () => {
    let input = document.querySelector("#todo_input");
    let inputDate = document.querySelector("#todo_input_date");

    if(input.value && inputDate.value != ""){
        saveTodoLocalStorage({ text: input.value, done: 0, taskDueDate: inputDate.value });
        input.value = "";
        inputDate.value = "";
        input.focus();
    }
    
    input.focus();
    loadTodoTasks();
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    todoTooBar.classList.toggle("hide");
}

const updateTodo = () => {
    let editInput = document.querySelector("#edit_input");
    let editInputDate = document.querySelector("#edit_input_date");

    updateTodoLocalStorage(editInput.value , editInputDate.value);
}

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h5").innerText.toLowerCase();

    todo.style.display = "flex";


    if (!todoTitle.includes(search)) {
        todo.style.display = "none";
    }});
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
    case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));

        break;

    case "done":
        todos.forEach((todo) =>
        todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );

        break;

    case "todo":
        todos.forEach((todo) =>
        !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );

        break;

    default:
        break;
    }
};

const checkTaskIsDue = (dueDate) =>{
    let isDue = false;
    let dateNow = new Date();
    let dueDateTask = new Date(dueDate);

    if(dateNow > dueDateTask) {
        isDue = true;
    }
    return isDue;
}

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodoTasks = () => {
    const todos = getTodosLocalStorage();
    let htmlContent = ``;

    todos.forEach((todo) => {
        htmlContent += ` 
            <div class="todo  ${todo?.done === true ? 'done' : ''}">
                <div class="text_container " >
                    <div class="text_tarefa  ${todo?.done === true ? 'done' : ''}">
                        <h3 class="${checkTaskIsDue(todo?.taskDueDate)=== true ? 'taskIsDue': ''}" >Tarefa:</h3>
                        <h5 class="${checkTaskIsDue(todo?.taskDueDate)=== true ? 'taskIsDue': ''}" >${todo?.text}</h5>
                    </div>
                    <div class="text_data  ${todo?.done === true ? 'done' : ''}">
                        <h3 class="${checkTaskIsDue(todo?.taskDueDate)=== true ? 'taskIsDue': ''}" >Data de vencimento:</h3>
                        <h5 class="${checkTaskIsDue(todo?.taskDueDate)=== true ? 'taskIsDue': ''}" >${todo?.taskDueDate}</h5>
                    </div>
                </div>
                <div class="btn_container">
                    <button onclick="updateTodoStatusLocalStorage('${todo?.text}')" class="finish_todo"><i class="fa-solid fa-check"></i></button>
                    <button onclick="changeValueToEdit('${todo?.text}' , '${todo?.taskDueDate}')" class="edit_todo"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="removeTodoLocalStorage('${todo?.text}')" class="remove_todo"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        `;
    });

    todoList.innerHTML = htmlContent;
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    loadTodoTasks();
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodoTasks();
};

const updateTodoLocalStorage = (text, dueDate) => {
    const todos = getTodosLocalStorage();
    console.log(text);
    console.log(dueDate);
    console.log(oldInputValue);

    todos.map((todo) => {
        if (todo.text === oldInputValue) {
            console.log(todo);
            todo.text = text;
            todo.taskDueDate = dueDate;
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodoTasks();
};

const changeValueToEdit = (text, dueDate) => {
    oldInputValue = text;
    document.querySelector("#edit_input").value = text;
    document.querySelector("#edit_input_date").value = dueDate;
    toggleForms();
}

// Eventos

todoForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    saveTodoTask();
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    updateTodo();

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

loadTodoTasks();