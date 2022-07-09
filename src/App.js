// import { fortAwesome } from "fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Addtodo from "./components/Addtodo";
import ListTodo from "./components/ListTodo";
// import {FontAwesomeIcon} from 'fontawesome'
// import {free-solid-svg-icons} fortAwesome
function App() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [allTodos, setallTodos] = useState([]);
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
  };

  const update = () => {
    let newAllTodos = [...allTodos];
    newAllTodos[currentIndex].task = task;
    localStorage.todos = JSON.stringify(newAllTodos);
    setTask("");
    seteditmode(false);
  };

  const changeTask=(event)=>{
  setTask(event.target.value)
  }

 
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 shadow my-4 py-2 mx-auto">
            <Addtodo
            changeTask={changeTask}
            task={task}
              add={add}
              update={update}
              editmode={editmode}
              inputReference={inputReference}
            />
            <ListTodo
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              allTodos={allTodos}
              num={num}
            />
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;
