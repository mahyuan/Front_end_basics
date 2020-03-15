/*
在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 */
// let arr = [
//   [1,2,3,4],
//   [2,3,4,5],
//   [3,4,5,6]
// ]
// let arr =  [[]]

function Find(target, array)
{
  // write code here
  var lenX = array.length
  var lenY = array[0].length
  for(var i = lenX - 1, j=0; i>=0 && j<lenY; ) {
    if(target > array[i][j]) {
      j++
    } else if(target < array[i][j]) {
      i--
    } else {
      return true
    }
  }
  return false
}

/*
请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 */
function replaceSpace(str)
{
    // write code here
   return str.split(' ').join('%20')
}

// let res = replaceSpace(' helllo world ')
// console.log('res', [res]);

/*
输入一个链表，按链表从尾到头的顺序返回一个ArrayList。
 */
function printListFromTailToHead(head)
{
    // write code here
}
