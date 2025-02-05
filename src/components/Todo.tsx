import "./Todo.css"
import { FaTrash } from "react-icons/fa";  

const Todo = ({ todo, onTodoUpdate, onTodoDelete }: { todo: any, onTodoUpdate: Function, onTodoDelete: Function }) => {
    //Variabel för färg beroende på status för status
    const statusColor = todo.status === "Ej påbörjad" ? "red" : todo.status === "Pågående" ? "blue" : "green"

    //Uppdatera status
    const updateTodo = async (e: any) => {

        let newStatus = e.target.value; //Nya statusen

        const newTodo = { ...todo, status: newStatus }; //Ändra statusvärde

        try {
            const res = await fetch("https://moment2-api.onrender.com/todos/" + todo._id, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });

            if (!res.ok) {
                throw Error();
            }
            //Triggar getTodos från app.tsx
            onTodoUpdate();

        } catch (error) {
            console.log("Fel vid ändring av status" + error);
        }
    }

    //Ta bort todo
    const deleteTodo = async (e : any) => {
        e.preventDefault();

        try {
            const res = await fetch("https://moment2-api.onrender.com/todos/" + todo._id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Misslyckades med att ta bort todo");
            }
            //Trigga getTodos från app.tsx
            onTodoDelete();

            console.log("Todo borttagen!");
        } catch (error) {
            console.error("Fel vid borttagning" + error);
        }
    };


    return (
        <>
            <section className="todo-item">
                <h3 className="todo-title">{todo.title}</h3>
                <p className="todo-description">{todo.description}</p>
                <p style={{ color: statusColor }} className="todo-status">Status: {todo.status}</p>
                <br />
                <form>
                    <label htmlFor="status">Ändra status</label>
                    <select name="status" id="status" defaultValue={todo.status}
                        onChange={updateTodo}>
                        <option>Ej påbörjad</option>
                        <option>Pågående</option>
                        <option>Avklarad</option>
                    </select>
                    <br /> <br />
                    <button className="deletebtn" onClick={deleteTodo}>
                        <FaTrash /> Ta bort
                    </button>
                </form>

            </section>
        </>
    )
}

export default Todo
