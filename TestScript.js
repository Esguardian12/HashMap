// 1. Create a new instance
const test = new HashMap();

// 2. Populate the hash map (12 items. 12 / 16 = 0.75. We are exactly at the load factor limit)
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(`Current length: ${test.length()} / Capacity: ${test.capacity}`); 
// Should be 12 / 16

// 3. Overwrite existing nodes
test.set('apple', 'GREEN');
test.set('dog', 'BLACK');

console.log(`After overwrite length: ${test.length()} / Capacity: ${test.capacity}`); 
// Should STILL be 12 / 16
console.log(`Apple color is now: ${test.get('apple')}`); // GREEN

// 4. Exceed the load factor, triggering expansion
test.set('moon', 'silver');

console.log(`Triggered expansion length: ${test.length()} / Capacity: ${test.capacity}`); 
// Capacity should double to 32

// 5. Test other methods after expansion
console.log("Has 'moon':", test.has('moon')); // true
console.log("Has 'sun':", test.has('sun')); // false
console.log("Remove 'carrot':", test.remove('carrot')); // true
console.log("Length after removal:", test.length()); // 12
console.log("All Keys:", test.keys());
console.log("All Values:", test.values());
console.log("Entries Array:", test.entries());

// 6. Test clear
test.clear();
console.log("Length after clear:", test.length()); // 0