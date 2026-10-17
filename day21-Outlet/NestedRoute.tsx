import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

// 父布局组件
const Layout = () => {
  return (
    <div className="layout">
      <h2>个人中心</h2>
      <nav style={{marginBottom: '10px'}}>
        <Link to="/profile/info" style={{marginRight: '10px'}}>基本信息</Link>
        <Link to="/profile/order">我的订单</Link>
      </nav>
      {/* 子路由内容渲染出口 */}
      <Outlet />
    </div>
  )
}

const UserInfo = () => <div>用户基本信息页面</div>
const OrderList = () => <div>订单列表页面</div>

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Layout />}>
          {/* 嵌套子路由 */}
          <Route path="info" element={<UserInfo />} />
          <Route path="order" element={<OrderList />} />
          {/* 默认子路由，访问/profile直接渲染 */}
          <Route index element={<p>请选择左侧菜单</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
