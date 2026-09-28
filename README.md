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
```tsx
const msg = "测试文本"
// 大括号内写表达式
<div>{msg}</div>
