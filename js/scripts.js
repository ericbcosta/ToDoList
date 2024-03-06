// Seleção de Elementos
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");
const todoList = document.querySelector("#todo_list");
const editForm = document.querySelector("#edit_form");
const editInput = document.querySelector("#edit_input");
const cancelEditBtn = document.querySelector("#cancel_edit_btn");


// Funções

// Eventos

todoForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        console.log(inputValue);
    }
})