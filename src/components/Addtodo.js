import React from "react";


function Addtodo({changeTask,task,add,update,editmode,inputReference}) {

 

  return (
    <>
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
          // onChange={changeTask}
          onChange={changeTask}
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
    </>
  );
}

export default Addtodo;
