import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';
import './App.css';

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar todos ao iniciar
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await fetch(API + "/todos");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
      setLoading(false);
    };

    fetchTodos();
  }, []);

  // Criar nova tarefa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !time) return;

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    try {
      await fetch(API + "/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Atualizar lista local sem recarregar
      setTodos((prevTodos) => [...prevTodos, todo]);
      setTitle("");
      setTime("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React Todo</h1>
      </div>

      <div className="form-todo">
        <h2>Insira sua próxima tarefa:</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer?</label>
            <input
              type="text"
              placeholder="Título da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="time">Duração: </label>
            <input
              type="text"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>

          <input type="submit" value="Criar tarefa" />
        </form>
      </div>

      <div className="list-todo">
        <h2>Lista de tarefas:</h2>

        {loading && <p>Carregando tarefas...</p>}

        {!loading && todos.length === 0 && <p>Não há tarefas</p>}

        {!loading && todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <h3>{todo.title}</h3>
            <p>Duração: {todo.time}h</p>
            <p>{todo.done ? "Concluída ✅" : "Pendente ❌"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
