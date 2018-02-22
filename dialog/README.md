# HTML 5.2 中新的原生元素 <dialog>

`open` 属性表示dialog是可见的 
```html
<dialog open>

    Native dialog box!

</dialog>
```


dialog有三个方法： 
```js
	showModal() 
	close()
	show()
```
使用showModal() 打开dialog时会在周围加一层阴影，阻止用户与非dialog元素的交互。默认阴影是完全透明的，可以使用css修改样式， 按esc 可以关闭 dialog，也可以使用事件触发 close（）方法来关闭。
show() 方法可以让dialog显现，与showModal不同的是没有阴影，可以与非dialog元素交互。

```js
const modal = document.querySelector('dialog');


// makes modal appear (adds `open` attribute)

modal.showModal();


// hides modal (removes `open` attribute)

modal.close();
```
