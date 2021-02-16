/*
2.两数相加

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807

输入：l1 = [0], l2 = [0]
输出：[0]

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]

提示：

每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  var l3 = new ListNode(0)

  let p1 = l1
  let p2 = l2
  let p3 = l3
  let carry = 0
  while (p1 || p2) {
    var v1 = p1 ? p1.val : 0
    var v2 = p2 ? p2.val : 0
    var v3 = v1 + v2 + carry
    carry = Math.floor(v3 / 10)
    p3.next = new ListNode(v3 % 10)
    if (p1) {
      p1 = p1.next
    }
    if (p2) {
      p2 = p2.next
    }
    p3 = p3.next
    if (carry) {
      p3.next = new ListNode(carry)
    }
  }
  return l3.next
};

/**
 * 时间复杂度：O(\max(m,n))O(max(m,n))，其中 m,nm,n 为两个链表的长度。我们要遍历两个链表的全部位置，
 * 而处理每个位置只需要 O(1)O(1) 的时间。
 * 空间复杂度：O(\max(m,n))O(max(m,n))。答案链表的长度最多为较长链表的长度 +1+1。
 */

/**
 * 官方
 */
var addTwoNumbers = function (l1, l2) {
  let head = null;
  let tail = null;
  let carry = 0;
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    const sum = n1 + n2 + carry;
    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry);
  }
  return head;
};
