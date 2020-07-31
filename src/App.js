import React, {useState, useEffect} from 'react';
import api from './services/api'
import ConfirmDel from './pages/ConfirmDel/ConfirmDel'
import renderTemplate from './utils/renderTemplate'
import './reset.css'
import './App.css';

function App() {

  const [todoInput, setTodoInput] = useState('')
  const [toDos, setTodos] = useState([])
  const [id, setId] = useState('')

  useEffect(() => {

    async function indexTodos(){

      const requestApi = await api.get('/todos')
      if(requestApi.status === 200) {

        renderTemplate('.loader')
        setTodos(requestApi.data)
      }
    }

    indexTodos()
    
  }, [])
  

  async function addTodo(e){
    e.preventDefault()

    const requestApi = await api.post('/todos', {
      content: todoInput,
    })

    setTodos([...toDos, requestApi.data])
    setTodoInput('')
  }

  async function delToDo(key){

    setTodos(toDos.filter( toDo => toDo._id !== key))
    await api.delete(`/todos/${key}`)
  }

  function del(e){

    e.preventDefault()
    setId(e.target.value)
    renderTemplate('.delete')
    
  }


  
  return(

    

    <main>
      <div className="delete invisible">
        < ConfirmDel id ={id} delTodo={delToDo}/>
      </div>

      <h1>Simple To do</h1>
      <form onSubmit={addTodo}>
        <h1>What do you want to do?</h1>
        <div className="todo-input-text">
          <input value={todoInput} required onChange={e => setTodoInput(e.target.value)}></input>
          <button>+</button>
        </div>
      </form>
      <div className="loader"></div>
      <ul>
        {toDos.map(toDo => {

          return (
            <li key={toDo._id} className="todo-item">
              <div className="todo-content">
                <input type="checkbox"></input>
                <p>{toDo.content}</p>
              </div>
              <div className="buttons">
                <button onClick={del} className="del" value={toDo._id}></button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App;
