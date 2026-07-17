class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0; // Tracks the number of keys
        // Create an array of empty arrays (our buckets)
        this.bucket = Arrays.from({length: this.capacity }, () => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for(let i = 0; i < key.length; i++) {
            // Modulo inside the loop prevents huge numbers and maps directly to a bucket index
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // 1. Check if the key already exists. If so, overwrite its value.
        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket[i][1] = value;
                return;  // Exit early since we just updated
            }
        }

        // 2. If we reach here, it's a new key. Push a [key, value] array into the bucket.
        bucket.push([key, value]);
        this.size++;

        // 3. Check if we need to grow the capacity
        if(this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) return bucket[i][1];
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket.splice(i , 1); // Remove the element
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.size = 0;
        this.buckets = Array.from ({length: this.capacity }, () => []);
    }

    keys() {
        const allKeys = [];
        for(const bucket of this.bucket) {
            for(const pair of bucket) {
                allKeys.push(pair[0]);
            }
        }
        return allKeys;
    }

    values() {
        const allValues = [];
        for(const bucket of this.buckets) {
            for(const pair of buckets) {
                allValues.push(pair[1]);
            }
        }
        return allValues;
    }

    entries() {
        const allEntries = [];
        for(const buckets of this.buckets) {
            for(const pair of buckets) {
                allEntries.push([pair[0], pair[1]]);
            }
        }

        return allEntries;
    }

    // Internal method to handle growing the buckets
    resize() {
        const oldBuckets = this.buckets;

        this.capacity *= 2; // Double the capacity
        this.size = 0; // Reset size, it will be recalculated as we re-insert
        this.buckets = Array.from({length: this.capacity }, () => []);

        // Re-hash and re-insert all old key/value pairs into the new expanded buckets
        for(const bucket of oldBuckets) {
            for(const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
}