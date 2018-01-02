# canvas 笔记

```
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
```
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x1,y1);
ctx.stroke()
```
每条线段末端样式：
```
ctx.lineCap = "butt";
ctx.lineCap = "round";
ctx.lineCap = "square";
```


```
ctx.closePath()
```

```
ctx.fillStyle = "yellow";
ctx.strokeStyle = "red";
ctx.lineWidth = 15;
```

```
ctx.rect(x,y, x_width, y_width);
ctx.strokeRect(x,y, x_width, y_width);
ctx.fillRect(x,y, x_width, y_width);

```

```
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