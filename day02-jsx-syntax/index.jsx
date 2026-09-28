import React from 'react'

// JSX基础语法练习
const App = () => {
  const name:string = "React学习"
  const isHot:boolean = true
  const list:number[] = [11,22,33]

  return (
    <div className="box">
      {/* 1.表达式嵌入 */}
      <h2>Hello {name}</h2>
      {/* 2.三元表达式 */}
      <p>{isHot ? '天气很热' : '天气凉爽'}</p>
      {/* 3.列表渲染 */}
      <ul>
        {
          list.map(item => <li key={item}>{item}</li>)
        }
      </ul>
      {/* 4.行内样式 */}
      <p style={{color:'#1890ff',fontSize:'18px'}}>行内样式测试</p>
    </div>
  )
}

export default App
