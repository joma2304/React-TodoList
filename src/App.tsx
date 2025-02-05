import TodoForm from "./components/TodoForm"
import { useState, useEffect } from "react"

interface Todo {
  _id: string,
  title: string,
  description: string,
  status: string
}

function App() {

  //States
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    try {
      const res = await fetch("https://moment2-api.onrender.com/todos")
      //OM response inte är ok
      if (!res.ok) {
        throw Error; //Kasta fel
        //Om respons = ok
      } else {
        const data = await res.json();

        setTodos(data);
        setError(null);//Återställ error
      }

    } catch (error) {
      console.error(error);
      setError("Något gick fel vid hämtning av Todos...")
    }
  }


  return (
    <>
      <h1 className='title'>TodoList</h1>
      <div className="todo-list">
        {
          error && <p className="error-container">{error}</p>
        }
        {
          todos.map((todo) => (
            <section className="todo-item" key={todo._id}>
              <h3 className="todo-title">{todo.title}</h3>
              <p className="todo-description">{todo.description}</p>
              <p className="todo-status">Status: {todo.status}</p>
            </section>
          ))
        }
      </div>

      <h2 className="formtext">Lägg till i TodoList</h2>
      <TodoForm />

    </>
  )
}

export default App
