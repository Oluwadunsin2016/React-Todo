import React from 'react'

const ListTodo=({editTodo, deleteTodo, allTodos, num}) =>{
  return (
    <>
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
                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => editTodo(index)}
                        >
                          edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTodo(index)}
                        >
                          delete
                        </button>
                        {/* <FontAwesomeIcon icon="fa-solid fa-trash" onClick={()=>deleteTodo(index)} /> */}
                        {/* <i class="fa-solid fa-trash"  onClick={()=>editTodo(index)}></i> */}
                        {/* <i className="fa-solid fa-pen" onClick={()=>deleteTodo(index)}></i> */}
                      </td>
                    </tr>
                  ))}
                </table>
              </>
            )}
    </>
  )
}

export default ListTodo