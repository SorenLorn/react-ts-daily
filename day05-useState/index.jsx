import { useState } from 'react'

// 基础计数器
const CounterDemo = () => {
  // 定义状态，count:数字，setCount修改状态函数，初始值0
  const [count, setCount] = useState<number>(0)

  const add = () => {
    setCount(prev => prev + 1)
  }
  const sub = () => {
    setCount(prev => prev - 1)
  }
  const reset = () => {
    setCount(0)
  }

  return (
    <div style={{padding:'20px',border:'1px solid #eee',borderRadius:'8px'}}>
      <h3>基础计数器</h3>
      <p>当前数值：{count}</p>
      <button onClick={add} style={{margin:'0 4px'}}>+1</button>
      <button onClick={sub} style={{margin:'0 4px'}}>-1</button>
      <button onClick={reset} style={{margin:'0 4px'}}>重置</button>
    </div>
  )
}

// 表单输入状态
const InputDemo = () => {
  const [name, setName] = useState<string>('')

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div style={{padding:'20px',border:'1px solid #eee',borderRadius:'8px',marginTop:'16px'}}>
      <h3>输入框状态绑定</h3>
      <input type="text" value={name} onChange={handleChange} placeholder="请输入名字"/>
      <p>你输入：{name}</p>
    </div>
  )
}

// 对象类型状态
type UserInfo = {
  name:string
  age:number
}
const ObjectStateDemo = () => {
  const [user, setUser] = useState<UserInfo>({
    name:'小明',
    age:18
  })

  const changeAge = () => {
    // 对象状态必须传入新对象，不能直接修改原对象
    setUser(prev => ({
      ...prev,
      age: prev.age +1
    }))
  }

  return (
    <div style={{padding:'20px',border:'1px solid #eee',borderRadius:'8px',marginTop:'16px'}}>
      <h3>对象类型State</h3>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <button onClick={changeAge}>年龄+1</button>
    </div>
  )
}

// 数组类型状态
const ArrayStateDemo = () => {
  const [list, setList] = useState<string[]>(['苹果','香蕉'])

  const addItem = () => {
    setList(prev => [...prev, '橙子'])
  }
  const clearList = () => {
    setList([])
  }

  return (
    <div style={{padding:'20px',border:'1px solid #eee',borderRadius:'8px',marginTop:'16px'}}>
      <h3>数组类型State</h3>
      <ul>
        {list.map((item,idx)=><li key={idx}>{item}</li>)}
      </ul>
      <button onClick={addItem}>新增橙子</button>
      <button onClick={clearList} style={{marginLeft:'8px'}}>清空</button>
    </div>
  )
}

export default function UseStatePage() {
  return (
    <div>
      <h2>day05 useState 状态管理</h2>
      <CounterDemo/>
      <InputDemo/>
      <ObjectStateDemo/>
      <ArrayStateDemo/>
    </div>
  )
}
