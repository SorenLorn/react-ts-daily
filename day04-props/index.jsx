import React from 'react'

// 定义props类型
type UserCardProps = {
  name: string
  age: number
  hobby?: string // 可选属性
}

// 子组件：用户卡片
const UserCard = (props: UserCardProps) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, width: 240 }}>
      <h3>姓名：{props.name}</h3>
      <p>年龄：{props.age}</p>
      {props.hobby && <p>爱好：{props.hobby}</p>}
    </div>
  )
}

// 解构写法（推荐）
type GoodsProps = {
  title: string
  price: number
}
const GoodsItem = ({ title, price }: GoodsProps) => {
  return (
    <div style={{ border: '1px solid #666', padding:12, borderRadius:6, width:220, marginTop:10 }}>
      <h4>{title}</h4>
      <p>价格：¥{price}</p>
    </div>
  )
}

// 父组件
const PropsDemo = () => {
  return (
    <div style={{padding:20}}>
      <h2>Props 父子传参演示</h2>
      <UserCard name="小明" age={18} hobby="写代码" />
      <UserCard name="小红" age={20} />
      <GoodsItem title="React学习手册" price={59} />
      <GoodsItem title="TS实战教程" price={79} />
    </div>
  )
}

export default PropsDemo
