<template>
	<div id="app">
		<h3>{{msg}}</h3>
		<button @click="insertData">insert</button>
		<button @click="searchData">search</button>
		<button @click="randomSearch">randomSearch</button>
		<button @click="editDate(10, false)">editDate</button>

	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				msg: 'hello ',
				info: [
					{taslTitle: 'do works', createTime: new Date('2018/2/13'), finishedTime: new Date('2018/2/13 2:00:00'), isFinished: false, isFiltered: false},
					{taslTitle: 'codding', createTime: new Date('2018/2/15'),  finishedTime: new Date('2018/2/15 13:00:00'), isFinished: false, isFiltered: false},
					{taslTitle: 'eatting', createTime: new Date('2018/2/17'), finishedTime: new Date('2018/2/17 5:00:00'), isFinished: false, isFiltered: false},
					{taslTitle: 'shopping', createTime: new Date('2018/2/18'), finishedTime: new Date('2018/2/19 00:00:00'), isFinished: false, isFiltered: false},
				],
				result: [],
				DB: '',
				indexedDB:  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
				IDBTransaction: window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransactio,
				IDBKeyRange:  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRang,
				dbName:  'myDatabase',
				tableName:  'myTable',
				arrayKey: [],
				lastCursor: '',
				version: 1,
			}
		},
		methods: {
			init: function() {
				if (!this.indexedDB) {
					window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
				} else {
					let DBOpenRequest = this.indexedDB.open(this.dbName, this.version);
					DBOpenRequest.onsuccess = function (evt) {
						this.msg = 'success';
						this.DB = evt.target.result;
					}.bind(this);

					DBOpenRequest.onerror = function (evt) {
						this.msg = 'open the databases failed!'
					};

					DBOpenRequest.onupgradeneeded = function (event) {
						// 更新对象存储空间和索引
						let db = event.target.result;
						db.onerror = function (evt) {
							this.msg = 'Error upgradent database';
						};

						// 创建一个数据库存储对象
						let objectStore = db.createObjectStore(this.dbName, {
							keyPath: 'id',
							autoIncrement: true
						});

						// 定义存储对象的数据项
						objectStore.createIndex("id", "id", {
							unique: true
						});
						objectStore.createIndex("taskTitle", "taskTitle", {unique: true});
						objectStore.createIndex("createTime", "createTime");
						objectStore.createIndex("modifiTime", "modifiTime");
						objectStore.createIndex("finishedTime", "finishedTime");
						objectStore.createIndex("isFinished", "isFinished");
						objectStore.createIndex("isFiltered", "isFiltered");
					}.bind(this);
				}

			},
			insertData: function() {
				let transaction = this.DB.transaction([this.dbName], "readwrite");
				// 打开已经存储的数据对象
				let objectStore = transaction.objectStore(this.dbName);
				// 添加到数据对象中
				for(let i=0; i<this.info.length; i++) {
					let item =  this.info[i];
					let objectStoreRequest = objectStore.add(item);
					objectStoreRequest.onsuccess = function(event) {
						this.msg = 'insert data success'
					}.bind(this);
					objectStoreRequest.onerror = function(event) {
						this.msg = `insert ___${item}___ failed`
					}.bind(this);
				}
			},
			editDate: function(id, newData) {
				//let id = 20;
				let transaction = this.DB.transaction(this.dbName, "readwrite")
				let objectStore = transaction.objectStore(this.dbName);
				let objectStoreRequest = objectStore.get(id);

				objectStoreRequest.onsuccess = function(event) {
					this.msg = 'get objectStoreRequest successed';
					console.log(11111);
					// 当前数据
					//let oldRecord = objectStoreRequest.result;
					let record = event.target.result;
					//console.log( record === oldRecord)
					//console.log(oldRecord, record)
					console.log(record)
					record.isFinished = newData
					record.finishedTime = new Date()
					// 更新数据库存储数据
					objectStore.put(record);
				}.bind(this);
				objectStoreRequest.onerror = function (event) {
					this.msg = 'get objectStoreRequest failed'
				}
			},
			deleteData: function(id) {
				let objectStore = this.DB.transaction(this.dbName, "readwrite").objectStore(this.dbName).delete(id);
			},
			searchData: function() {
				let objectStore = this.DB.transaction(this.dbName).objectStore(this.dbName);

				objectStore.openCursor.onerror = function(evt) {
					this.msg = `openCursor event failed!`;
				}.bind(this);

				objectStore.openCursor().onsuccess = function(evt) {
					// 遍历的时候回调此函数，直到遍历完
					this.msg = `openCursor event successed!`;
					let cursor = evt.target.result;

					if(cursor) {
						// cursor.value就是数据对象
						// 游标没有遍历完，继续
						//console.log('cursor', cursor.value)
						//console.log('result:', this.result)
						let index = this.result.findIndex(it => it.id === cursor.value.id);
						//console.log(index)
						if(index < 0) {
							this.result.push(cursor.value);
						}

						this.msg = `searching, get item of ${cursor.value}`;
						cursor.continue();
					} else {
						// 全部遍历完
						this.msg = `search data finished`;
					}
				}.bind(this);

			},
			// 随机范围，假设数据的ID从1~100
			randomIds: function() {
				let before = Math.floor(Math.random()*100);
				let after = Math.floor(Math.random()*100);
				return before >= after ? [after, before] : [before, after]
			},
			randomSearch: function() {
				let ids = this.randomIds();
				// 确定打开的游标的主键范围
				let  keyRangeValue = IDBKeyRange.bound(ids[0], ids[1]);
				// 打开对应范围的游标
				let  objectStore = this.DB.transaction(this.dbName).objectStore(this.dbName);

				objectStore.openCursor(keyRangeValue).onsuccess = function(event) {
					let cursor = event.target.result;
					// ...
					if(cursor) {
						let index = this.result.findIndex(it => it.id === cursor.value.id);

						if(index === -1) {
							this.result.push(cursor.value);
							console.log(`index is: ${index}, length: ${this.result.length}`);
						}
						cursor.continue();
					} else {
						//console.log(`result: ${JSON.stringify(this.result)}`);
						this.msg = `search data finished`;
					}
				}.bind(this);
			},

		},
		beforeMount() {
			console.log("init start");
			this.init();
		},
		mounted() {
			//this.searchData()
			//this.$nextTick(function () {
			//
			//
			//})
		}
	}
</script>

<style>
	button{
		width: 100px;
		height: 30px;
		background: #00B7FF;
		border-radius: 2px;
	}
</style>
