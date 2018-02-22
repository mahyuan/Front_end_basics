# Event
1. Event事件 原生方法实现
- Dom
- addEventListener

2. eventEmitter
- emitter.on
注册事件
- emitter.emit
发布事件
- emitter.eventNames
存储事件名，用于后面的两个方法
- emitter.listenerCount
统计登记的事件数量
- emitter.removeListener
移除事件
- emitter.once
只调用一次
3. Sub/Publish -发布订阅模式
先注册，后发布，可多次调用