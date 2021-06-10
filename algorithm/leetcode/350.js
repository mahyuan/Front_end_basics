/*
给定两个数组，编写一个函数来计算它们的交集。

 

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
示例 2:

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
 
说明：

输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
我们可以不考虑输出结果的顺序。
进阶：

如果给定的数组已经排好序呢？你将如何优化你的算法？
如果 nums1 的大小比 nums2 小很多，哪种方法更优？
如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 哈希表法，使用长度较少的数组进行hash设置，可以减少内存使用，时间复杂度O(m+n) 空间复杂度 O(min(m,n))
 var intersect = function(nums1, nums2) {
  let arr = []
  let map = new Map()
  for(let i=0; i<nums1.length; i++) {
      let key = nums1[i]
      let count = map.get(key) || 0
      map.set(key, count + 1)
  }

  for(let j=0; j<nums2.length; j++) {
      let key = nums2[j]
      let count = map.get(key)
      if(typeof count === 'number' && count > 0) {
          arr.push(key)
          map.set(key, count - 1)
      }
  }
 return arr
};

let a1 = [4,5,7,4]; let a2 = [6,7,4, 4]
getSet(a1, a2)


/**
 * 排序后的数组, 双指针法 时间复杂度 O(mlogm+nlogn)，空间复杂度 O(min(m,n))
 */
var intersect = function(nums1, nums2) {
  nums1 = nums1.sort((a, b) => a - b)
  nums2 = nums2.sort((a, b) => a - b)
  let arr = []
  let i=0, j=0
  while(i<nums1.length && j<nums2.length) {
    if(nums1[i] === nums2[j]) {
      arr.push(nums1[i])
    } else if(nums1[i] > nums2[j]) {
      j++
    } else {
      i++
    }
  }
  return arr
}
