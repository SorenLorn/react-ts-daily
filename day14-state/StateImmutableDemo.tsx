import { useState } from 'react'

type UserInfo = {
  name: string
  age: number
  hobby: string[]
}

const StateImmutableDemo = () => {
  // 对象state
  const [user, setUser] = useState<UserInfo>({
    name: '小明',
    age: 18,
    hobby: ['看书', '打球']
  })

  // 新增爱好
  const addHobby = () => {
    // ✅数组不可变：展开旧数组，追加新元素，返回全新数组
    setUser(prev => ({
      ...prev,
      hobby: [...prev.hobby, '游戏']
    }))
  }

  // 修改年龄
  const addAge = () => {
    // ✅对象不可变：展开旧对象，覆盖要修改的属性
    setUser(prev => ({
      ...prev,
      age: prev.age + 1
    }))
  }

  // 删除爱好
  const delHobby = () => {
    setUser(prev => ({
      ...prev,
      hobby: prev.hobby.filter(item => item !== '看书')
    }))
  }

  return (
    <div style={{padding: '20px'}}>
      <h3>不可变更新 state（对象/数组）</h3>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>爱好：{user.hobby.join('、')}</p>
      <button onClick={addAge}>年龄+1</button>
      <button onClick={addHobby}>添加爱好</button>
      <button onClick={delHobby}>删除看书</button>
    </div>
  )
}

export default StateImmutableDemo
