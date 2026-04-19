import { gardener, fetchElement, replaceElement, appendElement } from "../gardener.js";

const todoList = fetchElement("#todo-list");
const todoInput = fetchElement("#todo-input");
const addButton = fetchElement("#add-todo-btn");

async function fetchTodos() {
    const response = await fetch("/api/todos");
    const todos = await response.json();
    renderTodos(todos);
}

function renderTodos(todos) {
    todoList.innerHTML = "";
    if (todos.length === 0) {
        appendElement(todoList, gardener({
            t: "div",
            cn: ["flex", "items-center", "justify-center", "p-8", "text-slate-400"],
            children: [{ t: "p", txt: "No tasks yet. Add one above!" }]
        }));
        return;
    }
    todos.forEach(todo => {
        const element = createTodoItem(todo);
        appendElement(todoList, element);
    });
}

function createTodoItem(todo) {
    return gardener({
        t: "div",
        cn: ["flex", "items-center", "justify-between", "p-4", "bg-slate-50", "rounded-lg", "border", "border-slate-200", "hover:border-green-300", "transition"],
        children: [
            {
                t: "div",
                cn: ["flex", "items-center", "gap-3", "flex-1", "cursor-pointer"],
                events: {
                    click: () => toggleTodo(todo.id, !todo.completed)
                },
                children: [
                    {
                        t: "div",
                        cn: ["w-5", "h-5", "rounded-full", "border-2", "flex", "items-center", "justify-center", todo.completed ? "bg-green-500" : "bg-white", todo.completed ? "border-green-500" : "border-slate-300"].filter(Boolean),
                        children: todo.completed ? [{ t: "span", cn: ["text-white", "text-xs"], txt: "✓" }] : []
                    },
                    {
                        t: "span",
                        cn: ["text-slate-700", todo.completed ? "line-through" : null, todo.completed ? "opacity-50" : null].filter(Boolean),
                        txt: todo.text
                    }
                ]
            },
            {
                t: "button",
                cn: ["text-slate-400", "hover:text-red-500", "transition", "p-1"],
                txt: "Delete",
                events: {
                    click: (e) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                    }
                }
            }
        ]
    });
}

async function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    if (response.ok) {
        todoInput.value = "";
        fetchTodos();
    }
}

async function toggleTodo(id, completed) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    });

    if (response.ok) {
        fetchTodos();
    }
}

async function deleteTodo(id) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        fetchTodos();
    }
}

addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

// Initial fetch
fetchTodos();