<style>
	@media (min-width: 600px ){
		html{
			background: #fff;
		}
		body{
			width: 600px;
			margin: 0 auto;
			background-color: #eee;
			box-sizing: border-box;
			min-height: 100vh; 
		}
	}
	#app{
		width: 100%;
		padding: 5px;
		height: 100%;
	}
	ul,li{
		margin: 0;
		padding: 0;
		list-style: none;

	}
	button{
		display: inline-block;
		width: 100px;
		height: 30px;
		background: #00B7FF;
		border-radius: 2px;
	}
	.insertbtn{

	}
	.insertContent{
		display: flex;
		justify-content: flex-start;
		flex-wrap: nowrap;
		width: 100%;

		margin-top: 10px;
	}
	.insertContent span{
		display: inline-block;
		margin: 2px 5px;
		background: #aaa;
	}
	#listwrap{
		display: block;
		padding: 10px;
	}
	.listcontent{
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		align-content: flex-start;
	}
	.item {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 30px;
		background: #83d1c6;
		font-size: 14px;
		color: #333;
		margin: 5px;
	}
	.index{

	}
	.item span{
		display: inline-block;
		margin-top: 5px;
		margin-right: 5px;
	}
	.item button{
		display: block;
		width: 50px;
		height: 20px;
		font-size: 14px;
		line-height: 18px;
		border-radius: 3px;
		color: #333;
		vertical-align: middle;
	}
</style>

<template>
	<div id="app">
		<h3>{{msg}}</h3>
		<button @click="insertData" class="insertbtn">insert</button>
		<button @click="searchData">search</button>
		<button @click="randomSearch">randomSearch</button>
		<button @click="editDate(10, false)">editDate</button>
		<div class="insertContent">
			<span class="id">
				<label for="id">输入ID</label>
				<input type="number" name="id" v-model="inertId">
			</span>
			
			<span class="task">
				<label for="task">输入Task</label>
				<input type="text" name="task" v-model="tasakName">
			</span>
		</div>
		<div id="listwrap">
			<ul class="listcontent">
				<li class="item" v-show="result.length" v-for="(item, index) in result">
					<span class="index">{{ result.length - index}}</span>
					<span class="task">{{item.taslTitle}}</span>
					<span class="createtime">{{item.createTime}}</span>
					<span class="modifyOrFinishedtime">{{item.isFinished ?  item.finishedTime : item.modifiTime}}</span>
					<span class="finishedcont"><button class="finishbtn">完成</button></span>
					<span class="delete"><button class="deletebtn">删除</button></span>
				</li>
			</ul>
		</div>
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
				inertId:null,
				tasakName: '',
			}
		},
		methods: {
			// 初始化数据库
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
			// 插入记录
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
			// 编辑记录
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
			// 根据ID删除记录
			deleteData: function(id) {
				// let objectStore = this.DB.transaction(this.dbName, "readwrite").objectStore(this.dbName).delete(id);
				let transaction = this.DB.transaction(this.dbName, "readwrite");
				let objectStore = transaction.objectStore(this.dbName);
				let removeKey = parseInt(id);
				let getRequest = objectStore.get(removeKey);

				getRequest.onsucess = function(event) {
					var result = getReqest.result;
					this.msg = `get record to delete of \"${result}\" successfull!`
				};

				let request = objectStore.delete(removeKey);
				request.onsucess = function(event) {
					this.msg = `delete record of \" ${result}}\" successfull!`;
					// console.log(this.msg);
				};

				request.onerror = function(evt) {
					this.msg = `delete record of \" ${result}}\" failed!`
					console.log(evt);
				}
			},
			// 查询所有数据
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
				let  keyRangeValue = this.IDBKeyRange.bound(ids[0], ids[1]);
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
			// 根据索引查询某个记录
			searchReacrd: function(curName) {

				let objectStore = this.DB.transaction(this.dbName).objectStore(this.dbName);
				let boundKeyRange = this.IDBKeyRange.only(curName); //  生成一个表示范围的Range对象
				objectStore.index('taskTitle').openCursor(boundKeyRange).onsuccess = function(evt) {
					let cursor = evt.target.result;
					if(cursor) {
						let rowData = cursor.value;
						cursor.continue();
					}

				}
			},
			//  删除数据库
			deleteDatabase: function(dbName) {
				let deleteDB = this.indexedDB.deleteDatabase(dbName);
				
				deleteDB.onsuccess = function(evt) {
					this.msg = `delete Database \"${dbName}\" successfull!`
				};

				deleteDB.onerror = function(evt) {
					this.msg = `delete Database \"${dbName}\" failed!`
				};
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
