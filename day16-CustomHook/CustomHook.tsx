import { useState, useEffect } from 'react'

// 自定义Hook：封装窗口宽度监听逻辑
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    // 清理副作用
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

// 自定义Hook：计数器复用逻辑
function useCounter(initVal = 0) {
  const [count, setCount] = useState(initVal)

  const add = () => setCount(prev => prev + 1)
  const minus = () => setCount(prev => prev - 1)
  const reset = () => setCount(initVal)

  return { count, add, minus, reset }
}

// 主组件
export default function CustomHookDemo() {
  const width = useWindowWidth()
  const { count, add, minus, reset } = useCounter(10)

  return (
    <div style={{ padding: '20px' }}>
      <h3>自定义Hook Demo</h3>
      <p>浏览器窗口宽度：{width}px</p>
      <div style={{ marginTop: '16px' }}>
        <p>计数器：{count}</p>
        <button onClick={add}>+1</button>
        <button onClick={minus}>-1</button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  )
}
