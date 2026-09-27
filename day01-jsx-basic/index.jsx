import React from 'react'

function HelloDemo() {
  const userName: string = "Soren"
  const isShow: boolean = true

  return (
    <div className="container">
      <h1>React + TS JSX Demo</h1>
      <p>Hello, {userName}</p>
      {isShow ? <p>条件渲染生效</p> : <p>内容隐藏</p>}
    </div>
  )
}

export default HelloDemo
