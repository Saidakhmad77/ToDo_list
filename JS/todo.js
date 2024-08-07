document.addEventListener('DOMContentLoaded', () => {
    let todoForm = document.getElementById('todoForm');
    let todoInput = document.getElementById('todoInput');
    let importanceInput = document.getElementById('importanceInput');
    let todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.sort((a, b) => b.importance - a.importance);
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = `${todo.text} (Importance: ${todo.importance})`;

            if (todo.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', () => {
                todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (event) => {
                event.stopPropagation();
                let newText = prompt('Edit the task', todo.text);
                let newImportance = prompt('Edit the importance level (1-10)', todo.importance); 
                if (newText !== null && newText.trim() !== '' && newImportance !== null && !isNaN(newImportance) && newImportance >= 1 && newImportance <= 10) {
                    todo.text = newText.trim();
                    todo.importance = parseInt(newImportance);
                    localStorage.setItem('todos', JSON.stringify(todos));
                    renderTodos();
                }
            });

            li.appendChild(deleteButton);
            li.appendChild(editButton);
            todoList.appendChild(li);
        })
    }

    renderTodos();

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTodo = todoInput.value.trim();
        const importance = parseInt(importanceInput.value);
        if (newTodo !== '' && !isNaN(importance) && importance >= 1 && importance <= 10) {
            todos.push({ text: newTodo, completed: false, importance: importance });
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
            todoInput.value = '';
            importanceInput.value = '';
        }
    })
})