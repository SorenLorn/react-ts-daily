import { useState, useReducer } from 'react';

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

type TodoAction =
  | { type: 'add'; payload: string }
  | { type: 'toggle'; payload: number }
  | { type: 'del'; payload: number };

const todoReducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'toggle':
      return state.map(item =>
        item.id === action.payload ? { ...item, done: !item.done } : item
      );
    case 'del':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const TodoList = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    dispatch({ type: 'add', payload: inputVal.trim() });
    setInputVal('');
  };

  return (
    <div style={{ width: 400, margin: '30px auto' }}>
      <h3>简易待办清单</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="输入待办事项"
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={handleAdd}>添加</button>
      </div>
      <ul style={{ paddingLeft: 10 }}>
        {todos.map(item => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
            <span
              onClick={() => dispatch({ type: 'toggle', payload: item.id })}
              style={{ textDecoration: item.done ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {item.text}
            </span>
            <button onClick={() => dispatch({ type: 'del', payload: item.id })}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
