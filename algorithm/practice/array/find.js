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
/* function replaceSpace(str)
{
    // write code here
   return str.split(' ').join('%20')
} */

function replaceSpace(str) {
  str = str.split('')
  for(let i=str.length - 1; i>= 0; i--) {
    if(str[i] === ' ') {
      str[i] = '%20'
    }
  }
  return str.join('')
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


/*
输入一个链表，按链表从尾到头的顺序返回一个ArrayList。
*/
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head) {
  // write code here
  let arr = []
  let current = head
  while(current) {
    arr.push(current.val)
    current = current.next
  }
  return arr.reserve()
}
/*
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
 */

const stak1 = []
const stak2 = []
function push(node)
{
  // write code here
  stak1.push(node)
}
function pop() {
  // write code here
  if(stak2.length === 0) {
    while(stak1.length > 0) {
      stak2.push(stak1.pop())
    }

  }
  return stak2.pop()
}

/*
输入一个链表，输出该链表中倒数第k个结点。
*/

 /*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k) {
  let arr = []
  let current = head
  while(current) {
    arr.push(current)
    current = current.next
  }
  return arr[arr.length - k]
}

/* 输入一个链表，反转链表后，输出新链表的表头。*/
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead) {
  let next = null
  let pre = null
  let current = pHead
  while(current !== null) {
    // current.pre = pre
    // current = current.next
    next = current.next
    pre = current
    head = next
  }
  return current
}
