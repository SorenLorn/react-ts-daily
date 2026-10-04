import { useReducer } from 'react'

type State = {
  count: number
  todoList: string[]
}

type Action =
  | { type: 'add' }
  | { type: 'minus' }
  | { type: 'reset' }
  | { type: 'addTodo'; payload: string }
  | { type: 'delTodo'; payload: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return { ...state, count: state.count + 1 }
    case 'minus':
      return { ...state, count: state.count - 1 }
    case 'reset':
      return { ...state, count: 0 }
    case 'addTodo':
      return { ...state, todoList: [...state.todoList, action.payload] }
    case 'delTodo':
      return {
        ...state,
        todoList: state.todoList.filter((_, index) => index !== action.payload)
      }
    default:
      return state
  }
}

const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    todoList: []
  })

  const handleAddTodo = () => {
    const inputVal = window.prompt('请输入待办事项')
    if (inputVal) {
      dispatch({ type: 'addTodo', payload: inputVal })
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '30px auto' }}>
      <h2>useReducer 综合小Demo</h2>
      <div style={{ marginBottom: '20px' }}>
        <p>计数器：{state.count}</p>
        <button onClick={() => dispatch({ type: 'minus' })} style={{margin:'0 4px'}}>-</button>
        <button onClick={() => dispatch({ type: 'add' })} style={{margin:'0 4px'}}>+</button>
        <button onClick={() => dispatch({ type: 'reset' })} style={{margin:'0 4px'}}>重置</button>
      </div>

      <div>
        <h3>待办列表</h3>
        <button onClick={handleAddTodo}>新增待办</button>
        <ul>
          {state.todoList.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => dispatch({ type: 'delTodo', payload: index })} style={{marginLeft:10}}>删除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UseReducerDemo
