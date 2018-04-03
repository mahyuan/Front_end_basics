module.exports = function createArr(len) {
	let i = 0, arr = [], item=0

	while(len>=0 && i<len) {
		item = Math.floor( Math.random() * len)

		if ( arr.indexOf(item) == -1) {
			arr.push(item)
			i++
		}
	}
	// let a = new Set(arr)
	// return [...a]
	return arr
}

