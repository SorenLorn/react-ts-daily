import { useState, useMemo } from 'react'

// 联合类型 + 字面量类型 前沿TS语法
type Theme = 'light' | 'dark' | 'auto'
interface UserInfo {
  name: string
  age?: number // 可选属性
  readonly id: number // 只读属性
}

const SyntaxDemo = () => {
  const [theme, setTheme] = useState<Theme>('light')
  const [user, setUser] = useState<UserInfo>({ name: 'Soren', id: 1001 })
  const [count, setCount] = useState(0)

  // useMemo 缓存计算结果，结合TS类型推导
  const doubleCount = useMemo(() => {
    console.log('计算倍数')
    return count * 2
  }, [count])

  // 切换主题
  const toggleTheme = () => {
    const themeList: Theme[] = ['light', 'dark', 'auto']
    const idx = themeList.indexOf(theme)
    setTheme(themeList[(idx + 1) % 3])
  }

  return (
    <div style={{
      padding: '24px',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#fff' : '#111',
      borderRadius: '12px',
      maxWidth: '420px',
      margin: '20px auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2>React+TS 前沿语法综合Demo</h2>
      <div>当前主题：<b>{theme}</b></div>
      <button onClick={toggleTheme} style={{margin:'8px 0'}}>切换主题</button>

      <div style={{margin:'12px 0'}}>
        <p>计数: {count}</p>
        <p>计数×2：{doubleCount}</p>
        <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      </div>

      <div style={{marginTop:16}}>
        <p>用户信息</p>
        <p>姓名：{user.name}</p>
        <p>用户ID（只读）：{user.id}</p>
      </div>
    </div>
  )
}

export default SyntaxDemo
