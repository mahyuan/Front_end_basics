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
