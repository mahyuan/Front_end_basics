let obj = {
    name: 'mhy',
    age: 23,
    detail: {
        city: 'beijing',
        school: 'csu'
    }
}
let evt = new Event('haha')
function handler(e) {
    let o = e.eventBody
    console.log('addevt', o)
    console.log('evt', evt)
}
document.addEventListener('haha', handler, false)
function disPatchEvt(obj) {
	evt.eventBody = obj
	document.dispatchEvent(evt, obj)	
}
disPatchEvt(obj)
