/**
 * 739. 每日温度
 * 根据每日气温列表，请重新生成一个列表，对应位置的输入是你需要再等多久温度才会超过该日的天数
 * 如果之后都不会升高，请在该位置用0来代替
 *
 * 提示：气温列表temperatures长度的范围是[1, 30000]
 *
 * 示例：
 * temperatures = [23, 24, 25, 21 ,19, 22, 26, 23]
 * 输出： [1,1,4,2,1,1,0,0]
 */

//  temperatures = [23, 24, 25, 21, 19, 22, 26, 23]
//                 [1,  1,  4,  2,  1,  1,  0,  0 ]
class Stack {
  constructor() {
    this.list = []
  }
  peek() {
    return this.list[0]
  }
  append(item){
    this.list.shift(item)
  }
  pop() {
    return this.list.pop()
  }
  isEmpty() {
    return this.list.length === 0
  }
}

function name(temp) {
  const stack = new Stack()
  let i = 0
  let list = []
  while(i < temp.length) {
    stack.append({ value: [i], index: i })
    const isEmpyt = stack.isEmpty()
    if(i > 0 && !isEmpyt) {
      const prev = stack.peek()
      if(prev.value < list[i]) {
        list.push(prev.index)
        stack.pop()
      }
    }
    i++
  }
}
