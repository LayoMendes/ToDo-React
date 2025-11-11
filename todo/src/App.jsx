import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';
import './App.css';

const API = "https://super-chainsaw-976xjxj56r4r295gv-5000.app.github.dev";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviou!");
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    }
    await fetch(API + "/todos",{
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //envio para api
    console.log(todo);
    setTitle("");
    setTime("");
  };

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React Todo</h1>
      </div>

      <div className="form-todo">
        <h2>Insira sua próxima tarefa:</h2>
      </div>

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
          placeholder="Tempo estimado (em horas) "
          onChange={(e) => setTime(e.target.value)}
          value={time || ""}
          required
        />
      </div>




      <form onSubmit={handleSubmit}>
        <input type="submit" value="Criar tarefa" />
      </form>

      <div className="list-todo">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas</p>}
      </div>
    </div>
  );
}

export default App;
