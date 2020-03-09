# indexedDB


事物 transaction

游标 cursor
```js
objectStore.createIndex(indexName, keyPath, objectParameters)
```
```js
objectStore.createIndex('id', 'id', {
  unique: true
});
```

* 数据库的增删改查只能通过实物来实现
* 删除数据需要传入索引

## 相关API


## 离线缓存
只有在第二次刷新的时候才会更新客户端的数据， 第一次刷新更新缓存
navagator.onLine 判断是否在线



[封装成class](https://www.cnblogs.com/ww01/p/11906705.html)
