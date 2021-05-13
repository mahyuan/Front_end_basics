/**
 * 比较方法
 */
export default class Comparator {
  /**
   * @param {function(a: *, b: *)} [compareFunction] It may be custom compare function that, let's
   * say may compare custom objects together
   *
   */
  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * Default comparison function, It just assumes that "a" and "b"
   *  are string or numbers
   * @param {(string|number)} a
   * @param {(string|number)} n
   * @returns {number}
   */
  static defaultCompareFunction(a, b) {
    if(a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  /**
   * checks if two variables are equal.
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  equal(a, b) {
    return this.compare(a, b) === 0
  }

  /**
   * Checks if variable "a" is less than "b"
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0
  }

  /**
   * Checks if variable "a" is greater than "b"
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0
  }

  /**
   * Checks if variable "a" is less or equal than "b"
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) ||  this.equal(a, b)
  }
  /**
   * Checks if variable "a" is greater or equal than "b"
   * @param {*} a
   * @param {*} b
   * @returns {boolean}
   */
   greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) ||  this.equal(a, b)
  }

  /**
   * Reverse the comparison order
   */
  reverse() {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}
