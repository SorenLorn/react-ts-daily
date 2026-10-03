import { useRef, useState, useEffect } from 'react'

const UseRefDemo = () => {
  // 1. 绑定DOM元素，获取输入框DOM
  const inputRef = useRef<HTMLInputElement>(null)
  // 2. useRef保存可变数据，不会触发组件重渲染（前沿常用：存定时器、上次状态值）
  const timerRef = useRef<number | null>(null)
  const prevCountRef = useRef<number>(0)

  const [count, setCount] = useState(0)

  // 页面加载自动聚焦输入框
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 每次更新，把上一轮count存入ref
  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  // 开启定时器
  const startTimer = () => {
    if (timerRef.current) return
    timerRef.current = window.setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }

  // 停止定时器
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // 获取输入框内容
  const getInputValue = () => {
    if (inputRef.current) {
      alert(`输入框内容：${inputRef.current.value}`)
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '420px', margin: '30px auto', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
      <h3>useRef Demo - DOM操作 + 持久化可变数据</h3>
      <div style={{marginBottom:16}}>
        <input
          ref={inputRef}
          type="text"
          placeholder="页面自动聚焦"
          style={{padding:'6px 8px', width:'70%'}}
        />
        <button onClick={getInputValue} style={{marginLeft:8}}>读取输入框</button>
      </div>

      <div style={{marginBottom:16}}>
        <p>当前count：{count}</p>
        <p>上一次count值：{prevCountRef.current}</p>
        <button onClick={startTimer} style={{marginRight:8}}>启动计时器</button>
        <button onClick={stopTimer}>停止计时器</button>
      </div>
    </div>
  )
}

export default UseRefDemo
