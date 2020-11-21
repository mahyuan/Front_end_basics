# live

直播实现
使用flv.js + node-media-server架构，前端使用flv.js库播放flv封装格式的流媒体数据，服务端基于node，使用node-midia-server搭建流媒体服务器，可以使用docker一键安装使用

## web

前端使用vue快速搭建项目

安装vue/cli
```sh
npm install -g @vue/cli
```

使用vue/cli快速初始化项目
```sh
vue create live-demo
```
安装依赖和启动项目：
```sh
npm i
npm run serve
```

## server

[node-media-server](https://github.com/illuspas/Node-Media-Server/blob/master/README_CN.md)

docker方式：
```sh
docker run --name nms -d -p 1935:1935 -p 8000:8000 illuspas/node-media-server
```

npm方式：

```sh
mkdir nms
cd nms
npm install node-media-server
vi app.js
```
在app.js中写入

```js
const NodeMeidaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 6000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
}

const nms = new NodeMediaServer(config);
nms.run();
```

## 推流方式

### OBS软件
设置：
依次打开 设置 -> 推流 -> 服务选自定义 -> 服务器url填 rtmp://localhost/live -> 串流秘钥随意填，如test

按以上操作设置获得的推流的地址： rtmp://localhost/live，这是上传到服务器的地址，与上面的config中的配置一致（rtmp默认端口是1935，链接中省略），服务器向外提供的播放的地址是： http://localhost:8000/live/test.flv。

### FFmpeg推流

FFmepeg是一个很强大的视频编码解码工具，也提供推流功能
如果你有一个音视频编码为H.264+ACC的视频文件转为直播：
```sh
ffmpeg -re -i INPUT_FILE_NAME -c copy -f flv rtmp://localhost/live/STREAM_NAME
```

### 使用flv.js播放http-flv流格式

```html
<script src="https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://localhost:8000/live/STREAM_NAME.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>
```

播放websocket-flv流格式和http-flv格式类似，链接改成ws协议即可

