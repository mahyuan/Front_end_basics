/* hashTable 哈希表 （散列表）
 */
import LinkedList from '../linkedList/LinkedList'

const defaultHashTableSize = 32

export default class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())

      // just to keep track of all actual keys in a fast way
      this.keys = {}
  }
  /**
   * Converts key string to hash number
   */
  hash(key) {
    const hash = Array.from(key)
    .reduce((hashAccumulator, keySymbol) => {
      return hashAccumulator + keySymbol.charCodeAt(0)
    }, 0)

    return hash % this.buckets.length
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key)
    this.keys[key] = keyHash
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key})

    if(!node) {
      bucketLinkedList.append({key, value})
    } else {
      node.value.value = value
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key)
    delete this.keys[key]

    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key})

    if(node) {
      return bucketLinkedList.delete(node.value)
    }

    return null
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const keyHash = this.hash(key)
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key })

    return node ? node.value.value : undefined
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys)
  }

  /**
   * @return {*[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray()
        .map(linkedListNode => linkedListNode.value.value)
      return values.concat(bucketValues)
    }, [])
  }
}
