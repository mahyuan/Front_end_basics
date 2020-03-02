export function getFactorial(n) {
  const factorial = (num) => {

    if(typeof num !== 'number') {
      throw TypeError(num)
    }
    if(num <= 1) {
      return 1
    }
    if(num > 1) {
      return num * factorial(num - 1)
    }
  }
  return factorial(n)
}
