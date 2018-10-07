# react 笔记

- react中的事件绑定和数据传递

state不允许直接做其他改变， 必须通过setState方法来改变数据
jsx里面的注释，
{/*注释*/}
{
	// 单行注释
}

dangerouslySetInnerHTML={{}}
不转义，直接显示html使用`dangerouslySetInnerHTML`属性， 键名为`_html`:
```jsx
<li
	dangerouslySetInnerHTML={{__html: <h1>hello</h1>}}
>
<li>
```

label的for必须写成`htmlfor`:
```html
<label htmlfor="insertArea">请输入</label>
<input id="insertArea"/>
```


- 改变数据
```js
// 旧版
this.setState({
	list: [...this.state.list, 'hello']
})
// 新版
this.setState(() => {
	return {
		list: [...this.state.list, 'world']
	}
})
```
- 声名式开发
- 可以与其他框架并存
- 组件化
- 单向数据流
- 视图层框架
- 函数式编程


- 组件数据接收的校验
[文档](https://reactjs.org/docs/typechecking-with-proptypes.html)
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```
- Requiring Single Child
```js
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```
- 默认值 `defaultProps`
```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);

```
```js
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

**state或props改变是render函数会重新执行**


- react中的虚拟DOM
数据发生变化后，不需要重新渲染整个DOM，而是把把新生成的DOM与之前原来的DOM进行比对，找出变化的部分然后进行替换，太高了性能
。损耗的性能在做比对的部分，性能提升并不明显


react：
虚拟DOM就是一个JS对象，用它来描述真实DOM
['div', {id: 'app'}, ['span', {class: 'text'}, 'hello world']]
数据变化后不生成真实DOM，而是生成新的虚拟DOM，拿它和真实的DOM进行比对，替换变化的部分

性能损耗仅仅在生成一个JS对象上，相比调用Web API 生成真实DOM带来的性能损耗，实际上节约了大量的性能
['div', {id: 'app'}, ['span', {class: 'text'}, 'learning react']]

过程：
1. state 数据
2. jsx 模板
3. state + jsx  生成虚拟DOM（损耗了性能）
4. 根据虚拟DOM生成真实DOM， 渲染页面
5. state 改变
6. state + jsx 生成新的虚拟DOM（损耗了性能）
7. 比较原始虚拟DOM和新的虚拟DOM，找到区别（损耗了性能）
8. 操作DOM，替换改变的DOM结构（相比重新生成真实DOM，极大的提升了性能）

jsx 是React.createElement() 的语法糖

jsx -->  React.createElement('div', { className: 'container'}, 'hello') -->

虚拟DOM的优点：
1. 性能提升
2. 使跨端应用得以实现: React Native（state + jsx 转化为组件）

虚拟DOM中的Diff算法
- 同级比较： 某一级不同时，不再比对下一级，直接替换
- 根据key值做关联（循环时，key不要设为index，index设为key值不稳定，会变化）
- 其他

react中的`ref`的使用
在react中使用ref操作DOM
```jsx
<div
	ref={(input) => this.input = input}
>
	<div></div>
	<div></div><div></div>
</div>
```
```js
/**
 * setState是异步函数，后面可以接一个回调函数，需要在setState完成后才能执行的操作都可放在该回调函数中
 */
cjamge() {
	setState((preState) => {
		list: [...preState.list, 'hello']
	}, ()=> {
		console.log(this.input.querySelectorAll('div').length) // setState执行完之后才执行
	})

	console.log(this.input.querySelectorAll('div').length) // length比预期的小一个数，因为这条命令实际在setState之前执行
}
```
ref获取DOM是同步的，setState是异步的，两者一起用的时候应该把ref相关的操作放在setState的回调函数里面，不然的话会造成获取DOM不符合预期


- react的生命周期
生命周期是指在某个时刻组件会自动调用执行的函数
![](http://wicdn.xiaohongchun.com/xhc-plat/1538895019935_MXZK7cctjZ.png)

initialization -> Mounting -> Updation -> Unmountion
初始化             挂载
initialization:
setup props and state

Mounting:
componentWillMount -> render -> componentDidMount

Updation:
props:
componentWillReceiveProps -> shouldComponentUpdate ? ( componentWillUpdate -> render -> componentDidUpdate ) : false
states:
shouldComponentReceiveProps ? (componentWillUpdate -> render -> componentDidUpdate ) : false

Unmountion: componentWillUnmount




