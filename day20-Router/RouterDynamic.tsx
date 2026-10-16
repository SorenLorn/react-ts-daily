import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'

// 用户详情页 - 获取动态参数
function UserDetail() {
  // 拿到url上动态参数 :id
  const params = useParams()
  return (
    <div>
      <h2>用户详情页</h2>
      <p>当前用户ID：{params.id}</p>
    </div>
  )
}

function UserList() {
  return (
    <div>
      <h2>用户列表</h2>
      <ul>
        <li><Link to="/user/1001">用户1001</Link></li>
        <li><Link to="/user/1002">用户1002</Link></li>
        <li><Link to="/user/1003">用户1003</Link></li>
      </ul>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>首页</h2>
      <button onClick={() => navigate('/user/1005')}>跳转到id=1005用户</button>
    </div>
  )
}

function NotFound() {
  return <h2>404 页面不存在</h2>
}

export default function RouterDynamic() {
  return (
    <BrowserRouter>
      <nav style={{marginBottom: '20px'}}>
        <Link to="/" style={{marginRight: '16px'}}>首页</Link>
        <Link to="/user/list">用户列表</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/list" element={<UserList />} />
        {/* 动态路由 :id 代表动态参数 */}
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
