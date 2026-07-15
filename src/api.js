import { config } from "dotenv";

config({ quiet: true });

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api/todos";

export const getTodos = () =>
  fetch(BASE_URL, { credentials: "include" }).then((r) => r.json());

export const addTodo = (text) =>
  fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }).then((r) => r.json());

export const updateTodo = (id, data) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteTodo = (id) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
