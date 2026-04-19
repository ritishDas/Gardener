import type { Request, Response } from "express";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../..", "data", "todos.db.json");

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

async function readDb(): Promise<Todo[]> {
    try {
        const data = await fsp.readFile(dbPath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeDb(todos: Todo[]): Promise<void> {
    await fsp.writeFile(dbPath, JSON.stringify(todos, null, 2), "utf8");
}

export async function getTodos(req: Request, res: Response) {
    try {
        const todos = await readDb();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to read todos" });
    }
}

export async function addTodo(req: Request, res: Response) {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }
        const todos = await readDb();
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };
        todos.push(newTodo);
        await writeDb(todos);
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to add todo" });
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;
        const todos = await readDb();
        const index = todos.findIndex((t) => t.id === id);
        if (index === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }
        const todo = todos[index]!;
        if (text !== undefined) todo.text = text;
        if (completed !== undefined) todo.completed = completed;
        await writeDb(todos);
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const todos = await readDb();
        const newTodos = todos.filter((t) => t.id !== id);
        await writeDb(newTodos);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
}
