import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

// 页面组件
function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>首页</h2>
      <p>这是首页页面</p>
      <button onClick={() => navigate('/about')}>跳转到关于页</button>
    </div>
  )
}

function About() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>关于我们</h2>
      <p>React Router基础演示页面</p>
      <button onClick={() => navigate('/')}>返回首页</button>
    </div>
  )
}

function NotFound() {
  return <h2>404 页面不存在</h2>
}

// 路由根组件
export default function RouterDemo() {
  return (
    <BrowserRouter>
      <nav style={{marginBottom: '20px'}}>
        {/* Link 标签，无刷新跳转 */}
        <Link to="/" style={{marginRight: '16px'}}>首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      {/* 路由匹配规则 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/* 404兜底路由 */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
