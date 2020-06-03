# canvas 笔记

```html
<html>
	<canvas id="canvas"></canvas>`
</html>

<script>
	let canvas = document.getElementById('canvas');
	canvas.width = 300;
	canvas.height = 200;

	let ctx =  canvas.getContext('2d');

</script>
```
线段：
```js
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x1,y1);
ctx.stroke()
```
每条线段末端样式， 默认为 butt
```js
ctx.lineCap = "butt";
ctx.lineCap = "round";
ctx.lineCap = "square";
```


```js
ctx.closePath()
```

```js
ctx.fillStyle = "yellow";
ctx.strokeStyle = "red";
ctx.lineWidth = 15;
```

```js
ctx.rect(x,y, x_width, y_width);
ctx.strokeRect(x,y, x_width, y_width);
ctx.fillRect(x,y, x_width, y_width);

```

```js
 function drawStar(ctx, r, R, x, y, rot){
     ctx.beginPath();
  for(var i = 0; i <5; i++) {
    ctx.lineTo(Math.cos((18 + i * 72-rot)/180 * Math.PI ) * R + x,
       -Math.sin((18 + i * 72 - rot)/180 * Math.PI )* R + y);
    ctx.lineTo(Math.cos((54 + i * 72-rot)/180 * Math.PI ) * r + x,
       -Math.sin((54 + i * 72 - rot)/180 * Math.PI )* r + y);
  }
  ctx.closePath();
  ctx.stroke();
 }
  drawStar(ctx, 120, 200, 300, 300, 30 );
```

颜色渐变
```js
var gradient = ctx.createLinearGradient(0,0,200,0);
gradient.addColorStop(0,"green");
gradient.addColorStop(1,"white");
ctx.fillStyle = gradient;
ctx.fillRect(10,10,200,100);
```


字体
```js
ctx.font = "48px serif";
ctx.strokeText("Hello world", 50, 100);
```

透明度
```js
ctx.globalAlpha = 0.5; // 0~1 之间的数值，默认为1
```

虚线偏移量 ctx.lineDashOffset = value;
偏移量是float精度的数字。 初始值为 0.0。
```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var offset = 0;

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10,10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();
```

相连部分
ctx.lineJoin
```js
ctx.lineJoin = "bevel";
ctx.lineJoin = "round";
ctx.lineJoin = "miter";
```
























