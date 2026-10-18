import { Link, useNavigate, useSearchParams } from 'react-router-dom'

// 路由导航演示组件
function RouterNavigate() {
  // 获取导航方法，实现编程式跳转
  const navigate = useNavigate()

  // params动态参数跳转
  const toUserDetail = () => {
    navigate('/user/1001')
  }
  // search查询参数跳转
  const toSearchPage = () => {
    navigate('/goods?name=react&page=1')
  }
  // 返回上一页
  const backPage = () => {
    navigate(-1)
  }

  return (
    <div>
      <h2>编程式导航演示</h2>
      <Link to="/user/2002">Link声明式跳转</Link>
      <br/>
      <button onClick={toUserDetail}>params传参跳转用户页</button>
      <button onClick={toSearchPage}>search传参跳转商品页</button>
      <button onClick={backPage}>返回上一页</button>
    </div>
  )
}

export default RouterNavigate
