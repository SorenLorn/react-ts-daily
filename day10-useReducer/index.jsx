import { useReducer } from 'react';

// 定义state类型
type State = {
  count: number;
};

// 定义action类型
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'add'; payload: number };

//  reducer函数：接收旧state、action，返回新state
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'add':
      return { count: state.count + action.payload };
    default:
      return state;
  }
};

const CounterReducer = () => {
  // useReducer(reducer,初始值)
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ padding: '20px', width: '300px', margin: '20px auto' }}>
      <h2>useReducer 计数器Demo</h2>
      <p>当前数值：{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })} style={{marginLeft:8}}>-1</button>
      <button onClick={() => dispatch({ type: 'add', payload: 5 })} style={{marginLeft:8}}>+5</button>
      <button onClick={() => dispatch({ type: 'reset' })} style={{marginLeft:8}}>重置</button>
    </div>
  );
};

export default CounterReducer;
