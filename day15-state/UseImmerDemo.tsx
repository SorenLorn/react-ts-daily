import { useState } from 'react'
import { produce } from 'immer'

// 定义数据类型
type UserInfo = {
  name: string
  age: number
  hobby: string[]
}

const UseImmerDemo = () => {
  // 原始state，对象里面嵌套数组
  const [user, setUser] = useState<UserInfo>({
    name: "小明",
    age: 18,
    hobby: ["看书", "打球"]
  })

  // ✅ 使用immer的produce，直接修改草稿，不用手动展开...
  const changeName = () => {
    setUser(produce(draft => {
      draft.name = "小红"
    }))
  }

  const addHobby = () => {
    setUser(produce(draft => {
      draft.hobby.push("玩游戏")
    }))
  }

  const addAge = () => {
    setUser(produce(draft => {
      draft.age += 1
    }))
  }

  return (
    <div style={{padding:20}}>
      <h3>Immer简化state不可变更新</h3>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>爱好：{user.hobby.join("、")}</p>
      <button onClick={changeName}>修改名字</button>
      <button onClick={addAge} style={{marginLeft:8}}>年龄+1</button>
      <button onClick={addHobby} style={{marginLeft:8}}>新增爱好</button>
    </div>
  )
}
export default UseImmerDemo
