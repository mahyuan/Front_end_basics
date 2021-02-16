
/*
206 反转链表
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/**
          1 -> 2 -> 3 -> 4 -> null
  null <- 1 <- 2 <- 3 <- 4
 */
var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
  }
  return prev;
};


/**
 * 时间复杂度 O(n)， n为链表长度
 * 空间复杂度 O(1)
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
var l = new ListNode(0)

reverseList()


/**
 *  递归
 */
var reverseList = function(head) {
  if (head == null || head.next == null) {
      return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};

/**
 * 时间复杂度：O(n)，其中 n 是链表的长度。需要对链表的每个节点进行反转操作。
 * 空间复杂度：O(n)，其中 n 是链表的长度。空间复杂度主要取决于递归调用的栈空间，最多为 n 层。
 */
