/**
 * 接口
 */
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquire(config: SquareConfig): {color: string, area: number} {
  let newSquare = {color: 'red', area: 100}
  if(config.color) {
    newSquare.color = config.color
  }
  if(config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let SquireItem = createSquire({color: 'green', width: 12})

/**
 * 接口只读属性
 */
interface Point {
  readonly x: number
}

/**
 * 额外的属性检查
 * 最佳的方法是添加一个字符串索引签名
 */
interface SquireConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

/**
 * 函数类型
 * 接口能够描述对象用有的各种各样的属性，也可以描述函数类型
 * 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
 * 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
 *
 * 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
 * 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的
 */
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mysSearch: SearchFunc
mysSearch = function(source: string, subString: string) {
  let reuslt = source.search(subString)
  return reuslt > -1
}

/**
 * 继承接口
 */
