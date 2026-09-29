import React from 'react'

// 函数组件：定义一个自定义按钮组件
function CustomButton() {
  return <button style={{ padding: '6px 12px', fontSize:14 }}>点击我</button>
}

// 函数组件：卡片组件
function Card() {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '300px'
    }}>
      <h3>React 卡片组件</h3>
      <p>组件可以重复复用，拆分页面代码</p>
      <CustomButton />
    </div>
  )
}

// 根组件
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>day03 组件基础演示</h2>
      {/* 复用Card组件两次 */}
      <Card />
      <Card />
    </div>
  )
}

export default App
