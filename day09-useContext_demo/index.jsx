import { createContext, useContext, useState, ReactNode } from 'react'

// 1.定义全局共享状态类型
type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// 创建上下文，设置默认值为undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 封装Provider组件，用来包裹子组件，提供共享数据
interface ThemeProviderProps {
  children: ReactNode
}
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 自定义hook，简化useContext调用，做安全校验
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme必须在ThemeProvider内部使用！')
  }
  return context
}

// 子组件A
const Header = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div style={{
      background: theme === 'dark' ? '#222' : '#fff',
      color: theme === 'dark' ? '#fff' : '#222',
      padding: '16px',
      textAlign: 'center'
    }}>
      <h3>头部组件</h3>
      <button onClick={toggleTheme}>切换{theme === 'dark' ? '浅色' : '深色'}模式</button>
    </div>
  )
}

// 子组件B
const ContentBox = () => {
  const { theme } = useTheme()
  return (
    <div style={{
      background: theme === 'dark' ? '#333' : '#f5f5f5',
      color: theme === 'dark' ? '#fff' : '#222',
      padding: '20px',
      marginTop: '10px'
    }}>
      <p>内容区域，跨层级拿到主题，不用一层一层传props</p>
    </div>
  )
}

// 根组件
const UseContextDemo = () => {
  return (
    <ThemeProvider>
      <div style={{ maxWidth: 500, margin: '30px auto' }}>
        <Header />
        <ContentBox />
      </div>
    </ThemeProvider>
  )
}

export default UseContextDemo
