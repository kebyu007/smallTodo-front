import { useState } from "react";
import { updateTodo, deleteTodo } from "../api";

export const TodoList = ({ todos, setTodos, allTodos }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  const toggleDone = async (todo) => {
    const updated = await updateTodo(todo.id, { done: !todo.done });
    setTodos(
      allTodos.map((t) => (t.id === todo.id ? updated : t))
    );
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(allTodos.filter((t) => t.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setDraft(todo.text);
  };

  const saveEdit = async (id) => {
    const trimmed = draft.trim();
    setEditingId(null);
    if (!trimmed) return;

    const updated = await updateTodo(id, { text: trimmed });
    setTodos(allTodos.map((t) => (t.id === id ? updated : t)));
  };

  if (todos.length === 0) {
    return (
      <p className="text-center text-sm text-slate-600 py-10">
        Hech narsa topilmadi
      </p>
    );
  }

  return (
    <ul className="px-6 py-2 divide-y divide-slate-800">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-3 py-3 group">
          <button
            onClick={() => toggleDone(todo)}
            className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition ${
              todo.done
                ? "bg-emerald-500 border-emerald-500"
                : "border-slate-600 hover:border-emerald-500"
            }`}
          >
            {todo.done && (
              <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3">
                <path
                  d="M4 10l4 4 8-8"
                  stroke="#020617"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {editingId === todo.id ? (
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
              onBlur={() => saveEdit(todo.id)}
              className="flex-1 bg-slate-800 text-slate-100 text-sm rounded-md px-2 py-1 border border-emerald-500 focus:outline-none"
            />
          ) : (
            <span
              onDoubleClick={() => startEdit(todo)}
              className={`flex-1 text-sm cursor-text ${
                todo.done ? "text-slate-600 line-through" : "text-slate-200"
              }`}
            >
              {todo.text}
            </span>
          )}

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => startEdit(todo)}
              className="text-xs text-slate-500 hover:text-emerald-400 px-2 py-1"
            >
              Tahrirlash
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-xs text-slate-500 hover:text-rose-400 px-2 py-1"
            >
              O'chirish
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};