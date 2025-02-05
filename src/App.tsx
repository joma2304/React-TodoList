import "./app.css"
import TodoForm from "./components/TodoForm"
import Todo from "./components/Todo";
import { useState, useEffect } from "react";

//Interface för todos
interface TodoInterface {
  _id: string,
  title: string,
  description: string,
  status: string
}

function App() {
  //States
  const [todos, setTodos] = useState<TodoInterface[] | []>([]); //För todos
  const [error, setError] = useState<string | null>(null); //För fellmeddelande
  const [loading, setLoading] = useState<boolean>(false); //För laddning av API

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    try {
      setLoading(true); //Laddning = true

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
    } finally {
      setLoading(false); //Laddning = false
    }
  }


  return (
    <>

      <div className="container">
        <div className="todofrom">
          <TodoForm onTodoAdded={getTodos} />
        </div>
        <div className="todolist">
          <h2 className="title">TodoList</h2>
          { //IFall error
            error && <p className="error-container">{error}</p>
          }
          <div className="loading-container">
            { //När den laddar in api
              loading
              && <span className="loading-animation"></span>
            }
          </div>

          { //Loopa genom array med todos
            todos && todos.map((todo) => (
              <Todo todo={todo} key={todo._id} onTodoUpdate={getTodos} onTodoDelete={getTodos} />
            ))
          }
        </div>
      </div>

    </>
  )
}

export default App
