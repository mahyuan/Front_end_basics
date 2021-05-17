// 25 K个一组翻转链表

function name(head, size) {
  let n = size
  let prev = null
  let curr = head
  let next = curr.next

  while(curr && n-- > 0) {
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
}
