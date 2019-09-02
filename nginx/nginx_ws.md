# nginx 实现 websocket代理

websocket实现Http连接的基础上，并通过http中的Upgrade协议头将连接冲http升级到websocket。这样就可以实现多次双向通讯，直到连接关闭。

