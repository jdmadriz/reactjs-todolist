import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {

  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  
  function persistData(newList) { 
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }


  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, i) => i !== index)
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodos(index, newTodo) {
    const valueTobeEdited = todos[index];
    setTodoValue(valueTobeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if (!localStorage) { 
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

      localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
    

  }, [])// leave the last argument as an empty array to run effect on page load

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodos={handleEditTodos} todos={todos} />
    </>
  )
}

export default App
