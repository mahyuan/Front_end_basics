
localStorage是html5新增的浏览器环境下的属性

localStorage用于本地存储，除非主动删除，否则会永远存在。
一般浏览器都支持的存储大小是5M
localStorage的值仅限于字符串，其他类型的数据（如数组，对象等）可以转为JSON字符串存储，读取的时候可以还原为原来的数据类型。



localStorage有以下几个方法：
* clear 清空
	```js
		localStorage.clear()
	```
* setItem  设置
```js
localStorage.setItem('name', 'mhy')
localStorage.name = 'lily' // 与上面的命令等价
localStorage // Storage{name: 'lily', length: 1}
```
* getItem 获取
```js
localStorage.getItem('name')
localStorage.name
localStorage.valueOf() // 读取所有数据
localStorage.key(0)
for(let i=0;i<localStorage.length;i++){
	console.log(`localStorage.key(${i}): ${localStorage.key[i]}`)
}
```
* removeItem 删除单个
```js
localStorage.removeItem('name')
```
* hasOwnProperty 判断是否有某个值
```js
localStorage.hasOwnProperty('name') // false
```
* toLocaleString 转换为字符串
```js
var arr = ['a', 'b', 'c']
localStorage.arr  = arr 
localStorage.arr.toLocaleString()
```
* key 读取第i个数据的名字或称为键值(从0开始计数)
* valueOf 获取所有存储的数据

```js
var person = {
	lily: {
			name: 'lily',
			age: 22
	},
	leilei: {
		name: 'leilei',
		age: 21
	}
}

persion = JSON.stringify('persion') //JSON 转为字符串
localStorage.setItem('persion', persion)

var newPersion = localStorage.getItem('persion')
newPersion = JSON.parse(persion) // 转为JSON
```




