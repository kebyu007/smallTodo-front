import { useState, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";
import { SearchFilter } from "./components/SearchFilter";
import { getTodos } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "completed") return t.done;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  const activeCount = todos.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen bg-slate-950 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-slate-100 text-xl font-semibold tracking-tight">
            Todo
          </h1>
          <span className="font-mono text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
            {String(activeCount).padStart(2, "0")}/
            {String(todos.length).padStart(2, "0")}
          </span>
        </div>

        <AddTodo setTodos={setTodos} />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {loading ? (
          <p className="text-center text-sm text-slate-600 py-10">
            Yuklanmoqda...
          </p>
        ) : (
          <TodoList todos={filteredTodos} setTodos={setTodos} allTodos={todos} />
        )}

        {todos.some((t) => t.done) && (
          <div className="px-6 py-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                const completed = todos.filter((t) => t.done);
                completed.forEach((t) => deleteTodo(t.id));
                setTodos(todos.filter((t) => !t.done));
              }}
              className="text-xs text-slate-500 hover:text-rose-400 transition"
            >
              Bajarilganlarni tozalash
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;