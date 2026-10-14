import { useState, useEffect, useCallback } from 'react'

// 自定义Hook：封装localStorage持久化存储
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      // 有存储值就解析，没有返回默认值
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  // 更新本地存储
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // 重置为默认值
  const resetValue = useCallback(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return {
    value,
    setValue,
    resetValue
  }
}

// 使用示例组件
function StorageDemo() {
  const { value, setValue, resetValue } = useLocalStorage<string>('demo-name', '')

  return (
    <div style={{ padding: '24px' }}>
      <h3>day18 useLocalStorage 持久化存储自定义Hook</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入内容，刷新页面不会丢失"
      />
      <button onClick={resetValue} style={{ marginLeft: '12px' }}>重置</button>
      <p>保存的值：{value}</p>
    </div>
  )
}

export default StorageDemo
