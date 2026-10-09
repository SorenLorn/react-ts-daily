import { useState, useMemo } from 'react'

interface TodoItem {
  id: number
  text: string
  finished: boolean
}

const TodoStats = () => {
  // 状态
  const [todoList, setTodoList] = useState<TodoItem[]>([
    { id: 1, text: "学习React useState", finished: true },
    { id: 2, text: "练习useEffect", finished: false },
    { id: 3, text: "写demo提交github", finished: false },
  ])
  const [inputVal, setInputVal] = useState("")

  // useMemo 计算统计数据，缓存结果（复习旧知识点）
  const stats = useMemo(() => {
    const total = todoList.length
    const doneCount = todoList.filter(item => item.finished).length
    const undoneCount = total - doneCount
    return { total, doneCount, undoneCount }
  }, [todoList])

  // 添加待办
  const addTodo = () => {
    if (!inputVal.trim()) return
    const newItem: TodoItem = {
      id: Date.now(),
      text: inputVal,
      finished: false
    }
    setTodoList([...todoList, newItem])
    setInputVal("")
  }

  // 切换完成状态
  const toggleTodo = (id: number) => {
    setTodoList(todoList.map(item => {
      if (item.id === id) {
        return { ...item, finished: !item.finished }
      }
      return item
    }))
  }

  // 删除待办
  const delTodo = (id: number) => {
    setTodoList(todoList.filter(item => item.id !== id))
  }

  return (
    <div style={{padding:"20px",maxWidth:"500px",margin:"0 auto"}}>
      <h2>待办统计面板</h2>
      <div style={{marginBottom:"16px"}}>
        <p>全部：{stats.total} | 已完成：{stats.doneCount} | 未完成：{stats.undoneCount}</p>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="输入新待办"
          style={{padding:"6px",width:"70%"}}
        />
        <button onClick={addTodo} style={{marginLeft:"8px",padding:"6px 12px"}}>添加</button>
      </div>
      <ul style={{paddingLeft:"16px"}}>
        {todoList.map(item => (
          <li key={item.id} style={{margin:"8px 0"}}>
            <span
              onClick={() => toggleTodo(item.id)}
              style={{
                textDecoration: item.finished ? "line-through" : "none",
                cursor: "pointer",
                marginRight:12
              }}
            >
              {item.text}
            </span>
            <button onClick={() => delTodo(item.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoStats
