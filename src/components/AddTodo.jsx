import { useState } from "react";
import { addTodo } from "../api";

export const AddTodo = ({ setTodos }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    try {
      const newTodo = await addTodo(trimmed);
      setTodos((prev) => [...prev, newTodo]);
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="px-6 pt-4 flex gap-2">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Nima qilish kerak?"
        value={text}
        className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-medium text-sm rounded-lg px-4 py-2 transition active:scale-95"
      >
        Qo'shish
      </button>
    </form>
  );
};