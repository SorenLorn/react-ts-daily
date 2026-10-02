import React, { useState, useEffect } from 'react';

// 示例1：基础Effect，页面挂载执行
const TimerDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('组件挂载/依赖变化，执行effect');
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // 清理函数：组件卸载 / effect重新执行时触发
    return () => {
      clearInterval(timer);
      console.log('清除定时器，防止内存泄漏');
    };
  }, []); // 空依赖数组，仅挂载执行一次

  return (
    <div>
      <h3>计时器：{count}</h3>
    </div>
  );
};

// 示例2：依赖项变化触发effect
const UserInfoDemo = () => {
  const [userId, setUserId] = useState(1);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // 模拟接口请求
    const fetchUser = async () => {
      console.log(`请求用户ID:${userId}`);
      if(userId === 1) setUserName("张三");
      if(userId === 2) setUserName("李四");
    };
    fetchUser();
  }, [userId]); // 依赖userId，userId改变就重新执行

  return (
    <div style={{margin: "10px 0"}}>
      <p>当前用户：{userName}</p>
      <button onClick={() => setUserId(1)}>加载用户1</button>
      <button onClick={() => setUserId(2)} style={{marginLeft:8}}>加载用户2</button>
    </div>
  );
};

// 示例3：无依赖，每次渲染都执行（不推荐）
const RenderDemo = () => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    console.log('每次渲染都会运行');
  });
  return <button onClick={()=>setNum(num+1)}>点击 {num}</button>
}

const App = () => {
  return (
    <div>
      <h2>useEffect 副作用练习</h2>
      <TimerDemo/>
      <UserInfoDemo/>
      <RenderDemo/>
    </div>
  )
}

export default App;
