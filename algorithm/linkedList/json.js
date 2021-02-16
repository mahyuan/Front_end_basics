var json = {
  a: {
    b: {
      c: 1
    }
  },
  d: {
    e: 2
  }
}

const path = ['d', 'e']
// const path = ['a', 'b', 'c']

let p = json
path.forEach(k => {
  p = p[k]
  console.log(p)
})
