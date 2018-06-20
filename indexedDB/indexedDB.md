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
