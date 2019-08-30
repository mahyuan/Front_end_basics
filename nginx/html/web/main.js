!(function(argument) {
	
	var time = 1
	window.setInterval(() =>  {
		time += 1
		// console.info(time)
		// let node = document.createElement('div')
		//  node.innerHTML = `<span>time is  ${time}</span>`
		//  node.setAttribute('style', 'color: green')
		//  document.getElementById('app').appendChild(node)
		const app = document.getElementById('app')
		app.innerText = `time is ${time}`
		let randomInt = (range) => parseInt(Math.random() * range)
		let ranmomColor = `hsl(${randomInt(100)},${randomInt(100)}%, ${randomInt(100)}%)`
		console.log(ranmomColor)
		app.setAttribute('style', `color: ${ranmomColor}`)
	}, 2000)
})()