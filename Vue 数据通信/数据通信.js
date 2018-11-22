Vue数据通信
1. 父=>子组件: props
2. 子=>父组件: this.$emit() 调用父组件传过来的方法
3. 事件总线

这里重点总结一下事件总线的方式：
需要export一个全局的Vue实例用于传递事件（单页应用一般只需要一个Vue实例，此处额外new 一个专门用于传递事件的实例，不需要添加其他业务逻辑）, 在需要使用事件总线的组件中import 进去，使用`Bus.$emit('evtname', data)` 发送事件，使用 `Bus.$on('evtname', data => { })` 监听事件。
// Bus.js
```js
import Vue from 'vue';
export const Bus =  new Vue();
```

A.js组件发送事件
// A.js
```js
import Bus from './Bus';

export default {
	data() {
		return {
			msg: 'hello'
		}
	},
	methods: {
		sendMessage() {
			Bus.$emit('send', this.msg)
		}
	}
}
```
B.js组件接收事件
//B.js
```js
import Bus from './Bus';
export default {
	data() {
		return {
			hello: ''
		}
	},
	methods: {
		getMsg() {
			Bus.$on('send', (data) => {
				this.hello = data;
			})
		}
	},
	mounted() {
		this.getMsg()
	}
}
```
