<template>
	<div id="app">
		<h3>{{msg}}</h3>
		<h4>???</h4>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				msg: 'hello '

			}
		},
		methods: {
			init: function() {
				let db
				let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
				let dbName = 'myDatabase'
				let tableName = 'myTable'
				let arrayKey = []
				let lastCursor ;

				// window.indexedDB ready only?
				// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
				// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
				// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
				if (!window.indexedDB) {
					window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
				} else {
					let DBOpenRequest = window.indexedDB.open(dbName);
					DBOpenRequest.onsuccess = function (evt) {
						this.msg = 'success'
						db = evt.target.result;
						this.displayData();
					}.bind(this)

					DBOpenRequest.onerror = function (evt) {
						this.msg = 'open the databases failed!'
					}
					// 该事件仅在较新的浏览器中被实现
					DBOpenRequest.onupgradeneeded = function (event) {
						// 更新对象存储空间和索引
						db = evt.target.result;
						db.onerror = function (evt) {
							this.msg = 'Error upgradent database';
						}
					}.bind(this)

				}

			},
			displayData: function () {
				console.log('displayData start');
			}

		},
		mounted() {
			this.$nextTick(function () {
				console.log("init start");
				this.init();
			})
		}
	}
</script>

<style>
</style>