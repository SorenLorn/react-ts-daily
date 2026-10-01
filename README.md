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
