const m = new Map()

m.set('a', 'aa')
m.get('a')

m.set('a', 'aaa')
m.set('b', 'bb')
m.set('c', 'cc')
m.set('d', 'dd')
m.set('obj', { a: 'a1', b: 'b2'})

m.delete('b')
// m.clear()

m.size

m.has('a')
m.keys()
m.entries()
m.forEach()
