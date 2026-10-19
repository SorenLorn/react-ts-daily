import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RouteGuard from './RouteGuard'
import Login from './Login'
import Home from './Home'
import Dashboard from './Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* 需要权限的路由统一被守卫包裹 */}
        <Route element={<RouteGuard />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
