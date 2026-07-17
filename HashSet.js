class HashSet {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // If key exists, do nothing
    if (bucket.includes(key)) return;

    // Add new key
    bucket.push(key);
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }
  }

  has(key) {
    const index = this.hash(key);
    return this.buckets[index].includes(key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const itemIndex = bucket.indexOf(key);
    
    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1);
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
      for (const key of bucket) {
        allKeys.push(key);
      }
    }
    return allKeys;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);

    for (const bucket of oldBuckets) {
      for (const key of bucket) {
        this.set(key);
      }
    }
  }
}