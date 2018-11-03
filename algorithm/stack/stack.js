/**
 * 栈
 */

class Stack {
	consctructor() {
		this.dataStore = [];
		this.add = add;
		this.remove = remove;
		this.clear = clear;
		this.isEmpty = isEmpty;
		this.size = this.dataStore.length;
	}

 	add(item) {
		return this.dataStore.unshift(item);
	}

	remvoe() {
		return this.dataStore.shift();
	}

	clear() {
		this.dataStore.length = [];
	}

	isEmpty() {
		return this.dataStore.length > 0;
	}
}

