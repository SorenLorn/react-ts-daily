import { Navigate, Outlet } from 'react-router-dom'

// 路由守卫组件
const RouteGuard = () => {
  // 模拟登录状态
  const isLogin = localStorage.getItem('token')

  if (!isLogin) {
    // 未登录，重定向到登录页
    return <Navigate to="/login" replace />
  }
  // 已登录，渲染子路由页面
  return <Outlet />
}

export default RouteGuard
