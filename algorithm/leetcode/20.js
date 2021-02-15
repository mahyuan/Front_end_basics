/*
20.有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
 

示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
示例 4：

输入：s = "([)]"
输出：false
示例 5：

输入：s = "{[]}"
输出：true
 

提示：

1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if(s.length % 2 === 1) {
      return false
  }
  let stack = []
  for(let i = 0; i < s.length; i++) {
      let item = s[i]
      if(item === '(' || item ==='{' || item === '[') {
          stack.push(item)
      } else {
          let top = stack[stack.length - 1]
          if(
              (top === '(' && item === ')') ||
              (top === '{' && item === '}') ||
              (top === '[' && item === ']')
          ) {
              stack.pop()
          } else {
              return false
          }
      }
  }
  return stack.length === 0
};

isValid('()') === true
isValid('()[]') === true
isValid('({})')
isValid('((]')
