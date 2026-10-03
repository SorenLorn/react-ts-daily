# react-ts-daily
React+TS daily study, record notes and demo code every day

# day01-jsx-basic JSX基础
## 知识点
1. JSX = JavaScript + XML，用来描述页面UI结构，编译后转为JS代码
2. JSX内使用`{}`包裹JS表达式，**不能直接写if、for语句**
3. 关键字替换：`class` → `className`；`for` → `htmlFor`
4. 自定义组件首字母**必须大写**，小写标签会被识别为原生HTML标签

### 练习源码
[练习代码](./index.tsx)


# day02 jsx 语法
### 知识点
1. JSX 是 React 的语法糖，最终会被编译为 JS 函数调用，不是HTML
2. 嵌入变量/表达式：使用 `{ }`，只能放**表达式**，不能放if/for语句
3. 类名：用 `className`，不能写class（class是js关键字）
4. 行内样式：传对象，属性用小驼峰 `fontSize`，值是字符串
5. 列表渲染：`map`，必须给key，key尽量唯一，不要用索引（简单demo可以临时用）
6. 注释写法：`{/* 注释内容 */}`

### 小示例
``tsx
const msg = "测试文本"
// 大括号内写表达式
<div>{msg}</div>


# day03 components 组件基础
## ✅ 什么是组件
组件是React页面最小的代码单元，把页面拆分成一个个独立、可复用的代码片段。
可以理解为：页面里的一块模块，比如按钮、卡片、导航栏。

> 分类：函数组件（现在主流推荐）、类组件（旧写法，新项目基本不用）

## ✅ 函数组件规则
1. 组件名**首字母必须大写**，React靠大小写区分原生HTML标签和自定义组件
    ```tsx
    // ✅ 正确，大写开头
    function Hello(){}
    // ❌ 错误，小写会被当成普通html标签
    function hello(){}
2. 函数必须返回 JSX 元素，可以返回 null（不渲染任何内容）
3. 组件可以在其他组件内直接使用，像 HTML 标签一样 `<Hello />`
4. 一个文件可以写多个组件，一般把大组件单独拆分文件

## ✅ 组件复用

写一次组件，多次渲染，不用重复复制代码。
示例：上面 Card 写一遍，页面写两次`<Card />`，就渲染两张卡片。

## ✅ 组件嵌套

组件里面可以引入别的组件，就是组件嵌套。
Card 组件内部使用了`<CustomButton />`，就是嵌套。

## ✅ 注意事项

1. JSX 根节点：return 里面只能有一个根元素，多个元素要包在一个 div 或者空标签 <> 里

```
// ✅
return (
  <>
    <p>文本1</p>
    <p>文本2</p>
  </>
)
```

2. 组件导入导出：最后 `export default App`，供入口文件引入渲染
3. 组件是独立隔离的，每个组件渲染互不干扰

## ✅ 代码跳转链接

[练习代码源码](./day03-components/ComponentDemo.tsx)


``
# day05 useState 状态
## 知识点
useState 是React最基础的Hook，作用：**给函数组件添加响应式数据**。
当state的值发生变化，组件自动重新渲染页面。

### 1.基础语法
```tsx
// 变量，修改变量的函数 = useState(初始值)
const [变量名, set变量名] = useState<类型>(初始值)
```

- 第一个返回值：状态变量，读取数据
- 第二个返回值：更新函数，**唯一能修改 state 的方法**
- useState <类型>：TS 类型约束，规范数据类型

> 
> ❌ 错误：直接赋值修改 state
> count = count +1  不会触发页面更新！

> 
> ✅ 正确：调用 setCount 修改

```
// 写法1：直接传新值
setCount(10)

// 写法2：函数式更新（推荐，依赖上一次状态）
setCount(prev => prev +1)
```

### 2. 不同数据类型使用

1. 简单类型：string /number/boolean

```
const [name, setName] = useState<string>('')
```

2. 对象类型
⚠️ 不能直接修改原对象，必须**展开拷贝生成新对象**

```
type User = {name:string,age:number}
const [user, setUser] = useState<User>({name:'tom',age:20})
// 修改
setUser(prev=>({...prev, age: prev.age+1}))
```

3. 数组类型
⚠️ 不能用 push/pop 直接修改原数组，生成新数组

```
const [list, setList] = useState<string[]>([])
// 添加
setList(prev=>[...prev, '新元素'])
```

### 3. 表单双向绑定

input value 绑定 state，onChange 事件更新 state

```
const [val, setVal] = useState('')
<input value={val} onChange={(e)=>setVal(e.target.value)} />
```

## 常见坑总结

1. state 是**只读**，不能直接修改，只能用 set 函数
2. 对象 / 数组：必须返回新引用，旧引用不会触发渲染
3. 异步更新：setState 是异步，修改后不能立刻拿到最新值
4. 初始值只在组件首次渲染生效，后续修改不会重复执行

## 练习文件跳转

[UseStateDemo.tsx](./day05-useState/index.tsx)


# day06 useEffect 副作用钩子

### 一、什么是 useEffect

`useEffect` 是 React 内置 Hook，用来处理**副作用**。
副作用：组件渲染之外要做的事情，比如定时器、网络请求、监听 DOM、订阅事件。
函数组件主体内只写渲染相关代码，副作用统一放到 useEffect。

语法：

```
useEffect(()=>{
  // 执行的副作用代码
  return ()=>{
    // 清理函数（可选）
  }
}, [依赖数组])
```

### 二、依赖数组 3 种写法（重点）

1. **空数组 []**
只在组件**首次挂载**执行一次，组件卸载时执行清理函数。

```
useEffect(()=>{
  // 挂载执行
  return ()=>{/*卸载清理*/}
},[])
```

适用：只需要一次的逻辑，如页面初始化请求、一次性定时器。

2. **带依赖 [state1,state2]**
依赖数组里面的值**发生变化**，effect 就重新执行。

```
useEffect(()=>{
  console.log('userId变了就执行');
},[userId])
```

> 
> 注意：用到的 state、变量，必须写到依赖数组，否则会出现旧值 bug。

3. **不写第二个参数（无依赖数组）**
组件**每一次渲染更新**都会执行 effect，性能差，尽量避免。

```
useEffect(()=>{
  console.log('每次渲染执行');
})
```

### 三、清理函数 return

在 effect 里面 return 一个函数，就是清理函数。
触发时机：

1. 组件卸载的时候执行
2. effect 将要重新执行前，先执行上一次的清理
作用：清除定时器、取消事件监听、终止请求，**防止内存泄漏**

```
useEffect(()=>{
  const timer = setInterval(()=>{},1000)
  // 清理
  return ()=> clearInterval(timer)
},[])
```

### 四、useEffect 执行顺序

1. 组件渲染生成 DOM
2. DOM 渲染到页面后，**再执行 useEffect**（异步）

> 
> 和 class 组件生命周期对比：
> 挂载：componentDidMount
> 更新：componentDidUpdate
> 卸载：componentWillUnmount
> useEffect 一个 Hook 就可以覆盖这三个生命周期的能力

### 五、常见踩坑

1. ❌ 依赖漏写：effect 内部使用的变量不放进依赖数组，拿到永远是旧数据
2. ❌ 忘记清理定时器 / 事件监听，页面销毁后代码继续运行，内存泄漏
3. ❌ 在 useEffect 里面直接写无限循环 setState，造成死循环
4. ❌ useEffect 是异步，不能阻塞页面渲染

### 六、使用场景汇总

- 页面加载后发起网络请求获取数据
- 设置定时器、延时器
- 绑定 / 解绑 window、dom 事件监听
- 订阅消息、websocket 连接

---

代码跳转链接：[day06-useEffect.jsx](./index.tsx)


# Day07 useRef

> 
> 学习主题：useRef 两种核心用法（React18 主流写法，现代 React 推荐）

### ✅ 知识点 1：useRef 是什么

`useRef` 可以创建一个**ref 对象**，对象有 `.current` 属性。
特点：

1. ref 里的值**修改不会触发组件重新渲染**（和 useState 最大区别）
2. ref 对象在组件整个生命周期保持**同一个引用**，不会重复创建
3. 两大用途：① 获取 DOM 元素；② 保存不需要渲染更新的可变数据

```
// 基础语法
const myRef = useRef<类型>(初始值)
```

### ✅ 知识点 2：获取原生 DOM 元素（最常用）

- 将 `ref={xxxRef}` 绑定到 JSX 标签
- TS 必须写类型，`useRef<HTMLInputElement>(null)`
- 访问 DOM 时，使用可选链 `?.current` 防止 null 报错

```
const inputRef = useRef<HTMLInputElement>(null)
// 访问DOM
inputRef.current?.focus()
```

> 
> 注意：**不要直接修改 DOM 的属性**，React 优先使用状态驱动视图，useRef 只用来做读取、聚焦、滚动这类操作，不要手动改 innerHTML、style。

### ✅ 知识点 3：存储可变数据（前沿实战高频用法）

适合存放：定时器 id、请求控制器、上一轮 state 值、第三方实例

> 
> 重点：ref 改变，页面不会刷新！

```
// 保存定时器
const timerRef = useRef<number|null>(null)
timerRef.current = setInterval(()=>{},1000)
clearInterval(timerRef.current)
```

对比 useState：useState 更新会重渲染页面；ref 适合放后台变量，不需要 UI 更新。

### ✅ 知识点 4：获取上一次 state 的值（面试高频）

利用 useEffect 每次执行把 state 存入 ref，就能拿到上次的值

```
const prevCountRef = useRef(0)
useEffect(()=>{
  prevCountRef.current = count
},[count])
```

### ❗常见踩坑

1. 不要在渲染阶段直接读写 ref.current，容易出现时序 bug，放 useEffect / 事件回调里
2. TS 绑定 DOM 时，初始值必须填`null`，类型要写对应 DOM 类型 HTMLInputElement / HTMLDivElement
3. ref 的值更新**页面不会自动刷新**，如果页面需要显示变化，要用 useState
