# canvas 笔记

canvas核心只有两个属性与三个api

- canvas元素的属性

|属性|描述|类型|取值范围|默认值|
|---|-----|-------|------|-----|
|width|canvas元素绘图表面的宽度|非负整数|在有效范围内的任意非负整数，数值开头可以添加“+”和空格，但是不能给数值添加px后缀|300|
|height|canvas元素绘图表面的高度|非负整数|在有效范围内的非负整数（同width）|300|

在默认情况下，浏览器会将canvas元素的大小设定成与绘图表面大小一致。然而，如果 在css中覆写了元素大小，那么浏览器则会将绘图表面进行缩放，使之符合元素尺寸。


- canvas元素的方法

1. `getContext()`

返回与该canvas元素相关的绘图环境对象，每个canvas元素均有一个这样的环境对象，而且每个环境对象均与一个canvas元素相关联

2. `toDataURL(type, quality)`

 返回一个数据地址(data URL)，可以将它设定为img元素的src属性值。第一个参数指定了图像 的类型，例如image/png，第二个参数必须是0~1.0之间的double值，它表示JPEG图像的显示质量

 eg:
 ```js
 var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// width: 400, height: 500

ctx.font = '20px Arial'
ctx.fillStyle = '#ccc'
ctx.strokeStyle = 'blue'
// ctx.fillText('canvas', canvas.width/2 - 150 , canvas.height/2 + 35)
ctx.fillText('canvas', canvas.width/2, canvas.height/2)

var url = canvas.toDataURL('image/png', 0.9)
console.log(url)
// "data:image/png;base64,iVBORw0KGg......."
```

3. `toBlob(callback, type, args...)`

创建一个用于表示此canvas元素图像文件的blog。第一个参数是一个回调函数，浏览器会以一个指向blob的引用为参数，去调用该回调函数。第二个参数以“image/png”这样的形式来指定图像类型。如果不指定，默认使用“image/png”。最后一个参数是介于0.0~1.0之间的值，表示JPEG图像的质量。将来很可能会加入一些其他用于精确控制图像属性的参数

```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// ...
var blob = canvas.toBlob(function(s) {
  console.log(s)
}, 'image/jpeg', 1.0)

/*
[object Blob] {
  arrayBuffer: function arrayBuffer() { [native code] },
  size: 4362,
  slice: function slice() { [native code] },
  stream: function stream() { [native code] },
  text: function text() { [native code] },
  type: "image/jpeg"
} */
```

- 2d绘图环境

```js
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
console.log('context', context)
```
以上代码获取到canvas的2d绘图环境对象`CanvasRenderingContext2D`，该对象所含有的属性有：

canvas、filleStyle、font、globalAlpha、lineCap、shrokeStyle、textAlign等，通过这些属性或者方法可以绘制2d图像。
具体属性内容可以参考[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)，也可以在浏览器中debug，打印出该对象进行研究。




