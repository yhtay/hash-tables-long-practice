class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null)
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    const newPair = new KeyValuePair(key, value);
    const index = this.hashMod(key);

    if (!this.data[index]) {
      this.data[index] = newPair;
      this.count++;
    }
    let current = this.data[index];
    while (current) {
      if (current.key === key) {
        current.value = value;
        return;
      }

      current = current.next;
    }
    newPair.next = this.data[index]
    this.data[index] = newPair;
    this.count++
  }


  read(key) {
    // Your code here
    const index = this.hashMod(key);
    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        return current.value
      }
      current = current.next;
    }
    return undefined;

  }


  resize() {
    // Your code here
    const storedData = {}
    for (let i = 0; i < this.data.length; i++) {
      let current = this.data[i];
      // console.log(current);

      while (current) {
        storedData[current.key] = current.value;
        current = current.next;
        // console.log(storedData)
      }
    }
    this.capacity = this.capacity * 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
    // console.log(storedData)
    for (let pair in storedData) {
      // console.log(pair)
      // console.log(storedData[pair])
      this.insert(pair, storedData[pair])
      // console.log(this.data)

    }
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
