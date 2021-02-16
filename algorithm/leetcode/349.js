/*
349 两个数组的交集
给定两个数组，编写一个函数来计算它们的交集。

示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]

示例 2：
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
 
说明：
输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。
*/

// 方法1： 使用集合
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  // const set1 = new Set(nums1)
  // const set2 = new Set(nums2)
  // return [...set1].filter(item => set2.has(item))

  return [...new Set(nums1)].filter(n => nums2.includes(n))
};
/**
 * 时间复杂度： O(m*n)
 * 空间复杂度： O(m) , m 为去重后nums长度
 */


/**
 * 方法2： 使用字典
 */
var intersection = function(nums1, nums2) {
  const map = new Map()
  nums1.forEach(n => {
    map.set(n, true)
  })

  const res = []
  nums2.forEach(m => {
    if(map.get(m)) {
      res.push(m)
      map.delete(m)
    }
  })

  return res
};
/**
 * 时间复杂度： O(m+n):  n, m分别为num1和num2的长度
 * 空间复杂度： O(m+n):
 */
