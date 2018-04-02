let _ = require('lodash')

let obj = {
    name: 'lily',
    age: 23,
    others: {
        city: 'beijing',
        cuntry: 'China'
    }
}

let cObj = _.cloneDeep(obj)

if(obj == cObj) console.log(111)
obj.sex = 'mail'
console.log(obj)
console.log(cObj)
