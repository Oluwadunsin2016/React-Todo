
import React, { useState, useEffect, useRef } from "react";
function App() {
  const [task, setTask] = useState("");
  const [allTodos, setallTodos] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [editmode, seteditmode] = useState(false);
  const [num, setNum] = useState(0);
  const [currentIndex, setcurrentIndex] = useState(0);

  const inputReference = useRef(null);

  useEffect(() => {
    if (localStorage.todos) {
      setallTodos(JSON.parse(localStorage.getItem("todos")));
      setNum(JSON.parse(localStorage.getItem("number")));
    } else {
      setallTodos([]);
      setNum(0);
    }
  }, []);

  const add = () => {
    if (task !== "") {
      setTime(new Date().toLocaleTimeString());
      let newTodo = { task, time };
      let newAllTodos = [...allTodos, newTodo];
      localStorage.todos = JSON.stringify(newAllTodos);
      localStorage.number = JSON.stringify(num + 1);
      setNum(num + 1);
      setTask("");
      setallTodos(newAllTodos);
      inputReference.current.focus();
    } else {
      alert("There is nothing to add!");
    }
  };

  const deleteTodo = (index) => {
     let newAllTodos = [...allTodos];
    let neededTodo = newAllTodos.filter((todo, ind) => index !== ind);
    localStorage.todos = JSON.stringify(neededTodo);
    localStorage.number = JSON.stringify(num - 1);
    setallTodos(neededTodo);
    setNum(num - 1);
  };

  const editTodo = (index) => {
    seteditmode(true);
    let newAllTodos = [...allTodos];
    let { task } = newAllTodos[index];
    setTask(task);
    setcurrentIndex(index);
    inputReference.current.focus();
    console.log(currentIndex);
  };

  const update = () => {
    let newAllTodos = [...allTodos];
    newAllTodos[currentIndex].task = task;
    localStorage.todos = JSON.stringify(newAllTodos);
    setTask("");
    seteditmode(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 shadow my-4 py-2 mx-auto">
            {editmode === false ? (
              <h1 className="text-center">Add Task</h1>
            ) : (
              <h1 className="text-center">Edit Task</h1>
            )}
            <div className="input-group mb-3">
              <input
                type="text"
                name="addDo"
                id=""
                ref={inputReference}
                placeholder="Add task"
                className="form-control my-2"
                onChange={(event) => setTask(event.target.value)}
                value={task}
              />

              <div className="input-group-apend">
                {editmode === false ? (
                  <button className="btn btn-primary mt-2" onClick={add}>
                    +Add
                  </button>
                ) : (
                  <button className="btn btn-success mt-2" onClick={update}>
                    Update
                  </button>
                )}
              </div>
            </div>
            {allTodos.length < 1 ? (
              <h5>There is no task, add!</h5>
            ) : (
              <>
                <h3>
                  {num > 1 ? "Tasks" : "Task"} ({num})
                </h3>
                <table className="table text-center">
                  <tr>
                    <th>S/N</th>
                    <th>{num > 1 ? "Tasks" : "Task"}</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                  {allTodos.map((todo, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{index + 1}.</strong>
                      </td>
                      <td>{todo.task}</td>
                      <td>{todo.time}</td>
                      <td>
                      
                        <i className="fa fa-pencil-square fa-2x text-warning mr-2" aria-hidden="true" onClick={() => editTodo(index)}></i>
                        
                        <i className="fa fa-trash-o fa-2x text-danger ml-2" aria-hidden="true" onClick={() => deleteTodo(index)}></i>
          
                      </td>
                    </tr>
                  ))}
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
