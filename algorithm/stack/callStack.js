const f1 = () => {
  console.log('1')
  f2()
}
const f2 = () => {
  console.log('2')
  f3()
}
const f3 = () => {
  console.log('3')
}


f1()
